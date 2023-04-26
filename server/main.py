from flask import Flask, jsonify, request
from firebase_admin import credentials, firestore, initialize_app

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
    uid = data.get('user_id')
    food_items = data.get('food_items')
    
    # Extract relevant nutrition info
    food_info = {
        'user_id': uid,
        'name': food_items[0]['name'],
        'calories': food_items[0]['nutrition_info']['calories'],
        'protein': food_items[0]['nutrition_info']['protein'],
        'fat': food_items[0]['nutrition_info']['fat'],
        'carbohydrates': food_items[0]['nutrition_info']['carbohydrates'],
        'quantity': food_items[0]['quantity']
    }

    # Inserting into firebase 
    doc_ref = db.collection('foods').document()
    doc_ref.set({
        'food_info': food_info
    })

    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
