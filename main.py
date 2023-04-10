from flask import Flask, jsonify, flash, Response, request, render_template, redirect, url_for
from datetime import datetime
import flask_login

app = Flask(__name__)

@app.route('/hello', methods=["POST"])
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=True)
