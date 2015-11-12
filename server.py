#!/usr/bin/python

from flask import Flask, request, json, render_template
import deptCalculator

app = Flask(__name__)

@app.route('/calcDepts', methods=['POST'])
def depts():
    if request.method == 'POST' and request.headers['Content-Type'] == 'application/json':
        postedJson = json.dumps(request.json)
        jsonAsDict = json.loads(postedJson)
        deptList = deptCalculator.calcDepts(jsonAsDict)
        return json.dumps(deptList)

@app.route('/')
def index():
    return "Hello World!"

if __name__ == '__main__':
    app.run(host='0.0.0.0')


