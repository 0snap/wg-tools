#!/usr/bin/python

from flask import Flask, request, json, Response
from flask.ext.cors import CORS
import deptCalculator
from mongoengine import *
from datetime import datetime, timedelta
from collections import defaultdict

'''
Define some mongo stuff, very rudimentary storing of posted data.
'''

connect(host='mongodb://localhost:27017/depts')
#connect('depts', host='mongo', port=27017)
class Post(Document):
    date_modified = DateTimeField(default=datetime.now)
    meta = {'allow_inheritance': True}

class ExpensePost(Post):
    name = StringField()
    amount = FloatField(min_value=0)
    tsDeleted = DateTimeField(default=None)



'''
Simple Flask-API for serving post requests. API offers stuff like calculating depts among people or storing data.
'''


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

def getJsonDataFromPostIfValid(request):
    if request.headers['Content-Type'] == ('application/json; charset=UTF-8'):
        postedJson = json.dumps(request.json)
        #print(postedJson)
        return json.loads(postedJson)

def getExpensePosts(includeDeleted = False):
    ''' Returns all expensepost-objects in a json list '''
    result = list()
    for post in ExpensePost.objects:
        #print(post.id)
        if not includeDeleted and post.tsDeleted == None:
            result.append(normalizeExpensePost(post))
        elif includeDeleted:
            result.append(normalizeExpensePost(post))
    return result

def getUnsettledExpensesAsDict():
    ''' Returns a dict in the form "name: amount" of all unsettled expenses inside the database '''
    expenseList = getExpensePosts(False) # do explicitly no include deleted.
    expenses = defaultdict(float)
    for exp in expenseList:
        expenses[exp['name']] = expenses[exp['name']] + exp['amount']
    return expenses

def normalizeExpensePost(post):
    normalized = {}
    normalized['name'] = post.name
    normalized['amount'] = post.amount
    normalized['date'] = post.date_modified
    normalized['id'] = str(post.id)
    #print(normalized)
    return normalized

@app.route('/calcDeptsFromPostData', methods=['POST'])
def calcDepts():
    ''' Calculates the "mean" of all depts contained in the post-data'''
    jsonAsDict = getJsonDataFromPostIfValid(request)
    expensesList = deptCalculator.calcDepts(jsonAsDict)
    return json.dumps(expensesList)

@app.route('/meanDepts', methods=['GET'])
def depts():
    ''' Calculates the "mean" of all depts inside the database'''
    nameAmountDict = getUnsettledExpensesAsDict()
    meanDepts = deptCalculator.calcDepts(nameAmountDict)
    return json.dumps(meanDepts)

@app.route('/storeExpense', methods=['POST'])
def store():
    ''' Stores the posted data to the mongo '''
    jsonAsDict = getJsonDataFromPostIfValid(request)
    expensePost = ExpensePost(name=jsonAsDict.get('name'), amount=jsonAsDict.get('amount'))
    expensePost.save()
    return json.dumps(normalizeExpensePost(expensePost))

@app.route('/deleteExpense', methods=['DELETE'])
def delete():
    ''' Deletes the posted data by looking up the posted timestamp '''
    jsonAsDict = getJsonDataFromPostIfValid(request)
    oid = jsonAsDict['id']
    post = ExpensePost.objects.get(id=oid)
    if(post != None):
        post.tsDeleted = datetime.now
        post.save()
        return Response("OK", 200)
    return Response("Not found", 404)

@app.route('/expensesList')
def getExpensesList():
    ''' Returns a json list of depts ''' 
    return Response(json.dumps(getExpensePosts()))

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)