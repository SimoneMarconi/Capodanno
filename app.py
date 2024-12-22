from flask import Flask, jsonify, render_template, request, Response
import json

app = Flask(__name__)

budget = {}


@app.route("/")
def Root():
    global budget
    with open("./data/store.json", "r") as f:
        budget = json.load(f)
        f.close()
    return render_template("index.html", budget=budget)


@app.route("/Antipasto", methods=["POST"])
def Antipasto():
    global budget
    if request.method == "POST":
        data = request.get_json()
        amount = data["amount"]
        budget["AntipastoUsed"] += amount
        with open("./data/store.json", "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


@app.route("/Primo", methods=["POST"])
def Primo():
    global budget
    if request.method == "POST":
        data = request.get_json()
        amount = data["amount"]
        budget["PrimoUsed"] += amount
        with open("./data/store.json", "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


@app.route("/Secondo", methods=["POST"])
def Secondo():
    global budget
    if request.method == "POST":
        data = request.get_json()
        amount = data["amount"]
        budget["SecondoUsed"] += amount
        with open("./data/store.json", "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


@app.route("/Dolce", methods=["POST"])
def Dolce():
    global budget
    if request.method == "POST":
        data = request.get_json()
        amount = data["amount"]
        budget["DolceUsed"] += amount
        with open("./data/store.json", "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


if __name__ == "__main__":
    app.run(debug=True)
