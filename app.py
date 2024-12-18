from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

budget = {
    "Antipasto": 50,
    "Primo": 50,
    "Secondo": 50,
    "Dolce": 50,
}


@app.route("/")
def hello_world():
    return render_template("index.html", budget=budget)


@app.route("/Antipasto")
def AntipastoPayed():
    global budget
    budget["Antipasto"] -= 1
    return "ok"


if __name__ == "__main__":
    app.run(debug=True)
