#!/usr/bin/python

from flask import Flask, request, json, make_response
import deptCalculator
from mongoengine import *
import datetime

'''
Define some mongo stuff, very rudimentary storing of posted data.
'''

connect('localhost:27017')

class Post(Document):
    date_modified = DateTimeField(default=datetime.datetime.now)
    meta = {'allow_inheritance': True}

class DeptPost(Post):
    name = StringField()
    amount = IntField()




'''
Simple Flask-API for serving post requests. API offers stuff like calculating depts among people or storing data.
'''


app = Flask(__name__)

def getDeptPostsAsJson():
    ''' Returns all deptpost-objects in a json deptList '''
    result, data = list(), {}
    for post in DeptPost.objects:
        data['name'] = post.name
        data['amount'] = post.amount
        data['date'] = post.date_modified
        result.append(data)
    return result


@app.route('/calcDepts', methods=['POST'])
def depts():
    ''' Calculates the "mean" of all depts '''
    if request.method == 'POST' and request.headers['Content-Type'] == ('application/json; charset=UTF-8'):
        postedJson = json.dumps(request.json)
        jsonAsDict = json.loads(postedJson)
        deptList = deptCalculator.calcDepts(jsonAsDict)
        return json.dumps(deptList)
    else:
        return "Invalid request", 400

@app.route('/storeDept', methods=['POST'])
def store():
    ''' Stores the posted data to the mongo '''
    if request.method == 'POST' and request.headers['Content-Type'] == ('application/json; charset=UTF-8'):
        postedJson = json.dumps(request.json)
        jsonAsDict = json.loads(postedJson)
        deptPost = DeptPost(name=jsonAsDict.get('name'), amount=jsonAsDict.get('amount'))
        deptPost.save()
        return json.dumps(getDeptPostsAsJson())

@app.route('/deptList')
def getDeptList():
    ''' Returns a json list of depts ''' 
    return json.dumps(getDeptPostsAsJson())

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)