from flask import Flask, render_template, request
import json
from flask_socketio import SocketIO
from database import addPersona, clearCoppie, getPersone
from shuffle import shuffle

app = Flask(__name__)

socket = SocketIO(app)

sid = None

dataFile = "./data/store.json"

budget = {}


@app.route("/")
def Root():
    global budget
    global dataFile
    with open(dataFile, "r") as f:
        budget = json.load(f)
        f.close()
    return render_template("index.html", budget=budget)


@app.route("/Antipasto", methods=["POST"])
def Antipasto():
    global budget
    if request.method == "POST":
        data = request.get_json()
        if data["action"] == "reset":
            budget["AntipastoUsed"] = 0
        else:
            amount = data["amount"]
            budget["AntipastoUsed"] += amount
        with open(dataFile, "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


@app.route("/Primo", methods=["POST"])
def Primo():
    global budget
    if request.method == "POST":
        data = request.get_json()
        if data["action"] == "reset":
            budget["PrimoUsed"] = 0
        else:
            amount = data["amount"]
            budget["PrimoUsed"] += amount
        with open(dataFile, "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


@app.route("/Secondo", methods=["POST"])
def Secondo():
    global budget
    if request.method == "POST":
        data = request.get_json()
        if data["action"] == "reset":
            budget["SecondoUsed"] = 0
        else:
            amount = data["amount"]
            budget["SecondoUsed"] += amount
        with open(dataFile, "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


@app.route("/Dolce", methods=["POST"])
def Dolce():
    global budget
    if request.method == "POST":
        data = request.get_json()
        if data["action"] == "reset":
            budget["DolceUsed"] = 0
        else:
            amount = data["amount"]
            budget["DolceUsed"] += amount
        with open(dataFile, "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


@app.route("/Bere", methods=["POST"])
def Bere():
    global budget
    if request.method == "POST":
        data = request.get_json()
        if data["action"] == "reset":
            budget["BereUsed"] = 0
        else:
            amount = data["amount"]
            budget["BereUsed"] += amount
        with open(dataFile, "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


@app.route("/Botti", methods=["POST"])
def Botti():
    global budget
    if request.method == "POST":
        data = request.get_json()
        if data["action"] == "reset":
            budget["BottiUsed"] = 0
        else:
            amount = data["amount"]
            budget["BottiUsed"] += amount
        with open(dataFile, "w") as f:
            f.write(json.dumps(budget))
            f.close()
        return "ok"
    return ""


@app.route("/total_reset")
def reset():
    global budget
    budget["AntipastoUsed"] = 0
    budget["PrimoUsed"] = 0
    budget["SecondoUsed"] = 0
    budget["DolceUsed"] = 0
    with open(dataFile, "w") as f:
        f.write(json.dumps(budget))
        f.close()
    return "Done"


@app.route("/random")
def random():
    return render_template("random.html")


@socket.event
def addUser(data):
    addPersona(data["name"])
    socket.emit("updateUsers", data)


@socket.event
def client_connected(data):
    sid = data["sid"]
    res = getPersone()
    ret = [ele[0] for ele in res]
    socket.emit("firstUpdate", {"names": ret}, to=sid)


@socket.event
def getPairs(data):
    clearCoppie()
    res = shuffle()
    socket.emit("pairsRes", res)


if __name__ == "__main__":
    app.run(debug=True)
