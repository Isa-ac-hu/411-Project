from flask import Flask, jsonify, request
from firebase_admin import credentials, firestore, initialize_app
from flask import Flask, jsonify, request

app = Flask(__name__, static_folder="../fitness/public", static_url_path="/")
cred = credentials.Certificate("./serviceAccountKey.json")
initialize_app(cred)

db = firestore.client()

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route('/food', methods=['POST'])
def add_food():
    data = request.get_json()
    # Prints the data that was received 
    print(f"Received data: {data}")
    # user_id = data.get('user_id') --> not sure about user_id but some kind of primary key in database 
    food_items = data.get('food_items')
    
    # Extract relevant nutrition info
    nutrition_info = {
        'calories': food_items[0]['nutrition_info']['calories'],
        'protein': food_items[0]['nutrition_info']['protein'],
        'fat': food_items[0]['nutrition_info']['fat'],
        'carbohydrates': food_items[0]['nutrition_info']['carbohydrates']
    }

    # Inserting into firebase 
    # This should be database https://console.cloud.google.com/firestore/databases/-default-/data/panel/foods/8DaVsmgd6cZ6RArADRl2?project=project-9effe
    doc_ref = db.collection('foods').document()
    doc_ref.set({
        'food_items': food_items,
        'nutrition_info': nutrition_info
    })

    return jsonify({'success': True},)

if __name__ == '__main__':
    app.run(debug=True)
