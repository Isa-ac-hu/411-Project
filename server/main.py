from flask import Flask, jsonify, flash, Response, request, render_template, redirect, url_for
from datetime import datetime
import flask_login


app = Flask(__name__, static_folder="../fitness/public", static_url_path="/")
# this is backend for handling databases n stuff 
# if you run python3 (or python) main.py, localhost 5000 or 127.0.0.1 should start --> this is backend view 
# if you ran 127.0.0.1:5000/account, you should be able to see the message 

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route('/signin')
def signin():
    message = {'message': 'Hello, cheese buns'}
    return jsonify(message)

@app.route('/account')
def account(): 
    message = {'message': 'If you see this thats good'}
    return jsonify(message)

if __name__ == '__main__':
    app.run(debug=True)
