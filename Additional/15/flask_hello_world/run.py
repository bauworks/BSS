from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello Flask!"

@app.route("/hello/<name>")
def hello_someone(name):
    return "Hello " + name + " !"

