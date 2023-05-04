from flask import Flask, jsonify, request
from firebase_admin import credentials, firestore, initialize_app
from api import NUTR_APP_ID, NUTR_KEY, WEATHER_KEY 
import requests 

app = Flask(__name__, static_folder="../fitness/public", static_url_path="/")
cred = credentials.Certificate("./serviceAccountKey.json")
initialize_app(cred)

nutr_app_id = NUTR_APP_ID
nutr_key = NUTR_KEY
weather_key = WEATHER_KEY

db = firestore.client()

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route('/weather', methods=['GET'])
def get_weather():
    location = request.args.get('location')
    if len(location) == 0:
        return jsonify({'error': 'Location parameter is required'}), 400
    
    url = f'https://api.weatherapi.com/v1/current.json?key={weather_key}&q={location}'
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({'error': 'Could not fetch weather information'}), 500
    
    data = response.json()
    if 'error' in data:
        if data['error']['code'] == 1006:  # Code for "No matching location found."
            return jsonify({'error': 'Invalid location parameter. Please enter a valid location.'}), 400
        else:
            return jsonify({'error': data['error']['message']}), 400
    
    return jsonify(data)

def total_calories(uid, data):
        # Get a reference to the user's document in the "total_calories" collection
        user_ref = db.collection("total_calories").document(uid)

        # Check if the document already exists, if not, create for user
        if user_ref.get().exists != True:
            user_ref.set({
                'uid': uid,
                'total_calories': 0
            })
        # get current value of total calories
        user_doc = user_ref.get()
        current_calories = user_doc.get("total_calories")

        # get current calories and add new to get total
        new_calories = data['calories']
        total_calories = current_calories + new_calories

        # Add to total calories of our user
        ref = db.collection('total_calories').document(uid)
        ref.update({
            'total_calories': total_calories
        })

@app.route('/nutrition', methods=['POST'])
def get_nutrition_data():
    # Get the food amount and input from the request
    food_amount = request.json.get('foodAmount')
    food_input = request.json.get('foodInput')
    food_unit = request.json.get('foodUnit')
    uid = request.json.get('userId')

    # Validate user input
    if not food_amount or not food_input:
        return jsonify({'error': 'Please enter a valid food item, amount, and unit.'}), 400

    try:
        # Make a request to the Nutrition API
        url = f'https://api.edamam.com/api/nutrition-data?app_id={nutr_app_id}&app_key={nutr_key}&ingr={food_amount}%20{food_unit}%20{food_input}'
        response = requests.get(url)

        # Check the response status code
        if response.status_code != 200:
            return jsonify({'error': 'An error occurred while fetching the nutrition information.'}), 400

        data = response.json()

        # Check if the data contains the "error" key
        if 'error' in data:
            return jsonify({'error': 'Food does not exist.'}), 400

        nutrition_info = {
            'food_name': food_input,
            'food_qty': food_amount,
            'food_unit': food_unit,
            'calories': data['calories'],
            'protein': data['totalNutrients']['PROCNT']['quantity'],
            'fat': data['totalNutrients']['FAT']['quantity'],
            'carbohydrates': data['totalNutrients']['CHOCDF']['quantity']
        }

        # Inserting into firebase 
        doc_ref = db.collection('foods').document()
        doc_ref.set({
            'uid': uid, 
            'food_info': nutrition_info
        })

        total_calories(uid, data)

        return jsonify({'nutrition_info': nutrition_info}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': e + 'An error occurred while fetching the nutrition information.'}), 500


if __name__ == '__main__':
    app.run(debug=True)

