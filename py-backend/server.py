#!/usr/bin/python

from flask import Flask, request, json, Response
from flask.ext.cors import CORS
import deptCalculator
from mongoengine import *
from datetime import datetime, timedelta
import copy

'''
Define some mongo stuff, very rudimentary storing of posted data.
'''

connect('localhost:27017')
#connect('depts', host='mongo', port=27017)
class Post(Document):
    date_modified = DateTimeField(default=datetime.now)
    meta = {'allow_inheritance': True}

class ExpensePost(Post):
    name = StringField()
    amount = IntField()



'''
Simple Flask-API for serving post requests. API offers stuff like calculating depts among people or storing data.
'''


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

def getJsonDataFromPostIfValid(request):
    print(request.headers)
    if request.headers['Content-Type'] == ('application/json; charset=UTF-8'):
        postedJson = json.dumps(request.json)
        print(postedJson)
        return json.loads(postedJson)

def getExpensePostsAsJson():
    ''' Returns all expensepost-objects in a json list '''
    result, data = list(), {}
    for post in ExpensePost.objects:
        data['name'] = post.name
        data['amount'] = post.amount
        data['date'] = normalizeDate(post.date_modified)
        result.append(copy.deepcopy(data))
    return result

def normalizeDate(date):
    return (date - datetime(1970,1,1)).total_seconds()

def deNormalizeDate(number):
    return datetime(1970,1,1) + timedelta(seconds=number)

@app.route('/calcDepts', methods=['POST'])
def depts():
    ''' Calculates the "mean" of all depts '''
    jsonAsDict = getJsonDataFromPostIfValid(request)
    expensesList = deptCalculator.calcDepts(jsonAsDict)
    return json.dumps(expensesList)

@app.route('/storeExpense', methods=['POST'])
def store():
    ''' Stores the posted data to the mongo '''
    jsonAsDict = getJsonDataFromPostIfValid(request)
    expensePost = ExpensePost(name=jsonAsDict.get('name'), amount=jsonAsDict.get('amount'))
    expensePost.save()
    return json.dumps(getExpensePostsAsJson())

@app.route('/deleteExpense', methods=['DELETE'])
def delete():
    ''' Deletes the posted data by looking up the posted timestamp '''
    jsonAsDict = getJsonDataFromPostIfValid(request)
    date = deNormalizeDate(jsonAsDict['date'])
    for expensePost in ExpensePost.objects:
        if expensePost.date_modified == date:
            expensePost.delete()
            return Response("OK", 200)
    return Response("Not found", 404)

@app.route('/expensesList')
def getExpensesList():
    ''' Returns a json list of depts ''' 
    return Response(json.dumps(getExpensePostsAsJson()))

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)