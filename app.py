import os
from flask import Flask, render_template
import json

app = Flask(__name__)

budget = {}


@app.route("/")
def hello_world():
    global budget
    with open("./data/store.json", "r") as f:
        budget = json.load(f)
        f.close()
    return render_template("index.html", budget=budget)


@app.route("/ls")
def ls():
    pwd = f"pwd: {os.getcwd()}"
    ls = f"ls: {os.listdir()}"
    return pwd + "\n" + ls


@app.route("/Antipasto")
def AntipastoPayed():
    global budget
    budget["Antipasto"] -= 1
    with open(".mysite/data/store.json", "w") as f:
        f.write(json.dumps(budget))
        f.close()
    return "ok"


@app.route("/Primo")
def PrimoPayed():
    global budget
    budget["Primo"] -= 1
    with open("./data/store.json", "w") as f:
        f.write(json.dumps(budget))
        f.close()
    return "ok"


@app.route("/Secondo")
def SecondoPayed():
    global budget
    budget["Secondo"] -= 1
    with open("./data/store.json", "w") as f:
        f.write(json.dumps(budget))
        f.close()
    return "ok"


@app.route("/Dolce")
def DolcePayed():
    global budget
    budget["Dolce"] -= 1
    with open("./data/store.json", "w") as f:
        f.write(json.dumps(budget))
        f.close()
    return "ok"


if __name__ == "__main__":
    app.run(debug=True)
