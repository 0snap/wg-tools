#!/usr/bin/python

from flask import Flask, request, json, render_template
import deptCalculator

app = Flask(__name__)

@app.route('/calcDepts', methods=['POST'])
def depts():
    if request.method == 'POST' and request.headers['Content-Type'] == ('application/json; charset=UTF-8'):
        postedJson = json.dumps(request.json)
        print(request.get_json())
        jsonAsDict = json.loads(postedJson)
        deptList = deptCalculator.calcDepts(jsonAsDict)
        print(deptList)
        return "FOOBAR: " + json.dumps(deptList)
    else:
        return render_template('index.html')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)


