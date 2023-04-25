from flask import Flask, jsonify, flash, Response, request, render_template, redirect, url_for
from datetime import datetime
import flask_login


app = Flask(__name__, static_folder="../fitness/public", static_url_path="/")
# this is backend for handling databases n stuff 
# if you run python3 (or python) main.py, localhost 5000 or 127.0.0.1 should start --> this is backend view 
# if you ran 127.0.0.1:5000/account, you should be able to see the message 

@app.route('/food', methods=['POST'])
def add_food():
    data = request.get_json()
    user_id = data.get('user_id')
    food_items = data.get('food_items')
    
    # do something with user_id and food_items, such as store them in a database
    
    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(debug=True)
