#!/usr/bin/python

from flask import Flask, request, json, Response
from flask.ext.cors import CORS
import deptCalculator
from mongoengine import *
from datetime import datetime, timedelta
from collections import defaultdict
import random 

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
    color = StringField()
    tsDeleted = DateTimeField(default=None)



'''
Simple Flask-API for serving post requests. API offers stuff like calculating depts among people or storing data.
'''


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

def getDictFromPost(request):
    if request.headers['Content-Type'] == ('application/json; charset=UTF-8'):
        postedJson = json.dumps(request.json)
        return json.loads(postedJson)

def getExpensePosts(includeDeleted = False):
    ''' Returns all expensepost-objects in a json list '''
    result = list()
    if not includeDeleted:
        posts = ExpensePost.objects(tsDeleted=None)
    else: posts = ExpensePost.objects
    return [normalizeExpensePost(post) for post in posts]

def getExpensesPerPerson():
    ''' Returns a list in the form [{name: "foo" amount: "sum-amounts-for-foo", color: "#fff"}] of all unsettled expenses inside the database '''
    people = list() 
    names = ExpensePost.objects(tsDeleted=None).distinct('name')
    for name in names:
        person = dict()
        entries = ExpensePost.objects(tsDeleted=None, name=name)
        person['amount'] = entries.sum('amount')
        person['name'] = name
        person['color'] = entries.first().color
        people.append(person)
    # print(people)
    return people

def normalizeExpensePost(post):
    normalized = {}
    normalized['name'] = post.name
    normalized['amount'] = post.amount
    normalized['date'] = post.date_modified
    normalized['id'] = str(post.id)
    normalized['color'] = post.color
    #print(normalized)
    return normalized

def getRandomColor():
    randomRGB = lambda: random.randint(64,192) # nicely visible
    randomHex = '#%02X%02X%02X' % (randomRGB(),randomRGB(),randomRGB())
    return randomHex

def getColorForName(name):
    connectedPosts = ExpensePost.objects(name=name)
    if (len(connectedPosts) > 0):
        return connectedPosts[0].color
    return getRandomColor()

@app.route('/calcDeptsFromPostData', methods=['POST'])
def calcDepts():
    ''' Calculates the "mean" of all depts contained in the post-data'''
    jsonAsDict = getDictFromPost(request)
    expensesList = deptCalculator.calcDepts(jsonAsDict)
    return json.dumps(expensesList)

@app.route('/meanDepts', methods=['GET'])
def depts():
    ''' Calculates the "mean" of all depts inside the database'''
    persons = getExpensesPerPerson()
    if(len(persons) > 0):
        meanDepts = deptCalculator.calcDepts(persons)
        return json.dumps(meanDepts)
    return Response('Nothing found', 404)

@app.route('/storeExpense', methods=['POST'])
def store():
    ''' Stores the posted data to the mongo '''
    jsonAsDict = getDictFromPost(request)
    name = jsonAsDict['name']
    amount = jsonAsDict['amount']
    if name != None and name != '' and float(amount) >= 0:
        color = getColorForName(name)
        expensePost = ExpensePost(name=name, amount=amount, color=color)
        expensePost.save()
        return json.dumps(normalizeExpensePost(expensePost))
    return Response('Wrong format, will not store.', 400)

@app.route('/deleteExpense', methods=['DELETE'])
def delete():
    ''' Deletes the posted data by looking up the posted timestamp '''
    jsonAsDict = getDictFromPost(request)
    oid = jsonAsDict.get('id')
    if oid != None and oid != '':
        post = ExpensePost.objects.get(id=oid)
        if(post != None):
            post.tsDeleted = datetime.now
            post.save()
            return Response('OK', 200)
    return Response('Not found', 404)

@app.route('/expensesList')
def getExpensesList():
    ''' Returns a json list of depts ''' 
    return Response(json.dumps(getExpensePosts()))

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)