#!/usr/bin/python

from flask import Flask, request, json, Response
from flask.ext.cors import CORS

import deptCalculator
import storage

'''
Simple Flask-API for serving requests. API offers stuff like calculating depts among people or storing data.
'''


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

def getDictFromPost(request):
    if request.headers['Content-Type'] == ('application/json; charset=UTF-8'):
        postedJson = json.dumps(request.json)
        #print(postedJson)
        return json.loads(postedJson)

@app.route('/calcDeptsFromPostData', methods=['POST'])
def calcDepts():
    ''' Calculates the "mean" of all depts contained in the post-data'''
    jsonAsDict = getDictFromPost(request)
    expensesList = deptCalculator.calcDepts(jsonAsDict)
    return json.dumps(expensesList)

@app.route('/meanDepts', methods=['GET'])
def depts():
    ''' Calculates the "mean" of all depts inside the database'''
    listId = request.args.get('listId')
    if listId != None:
        persons = storage.getExpensesPerPerson(listId)
        if len(persons) > 0:
            meanDepts = deptCalculator.calcDepts(persons)
            return json.dumps(meanDepts)
        return json.dumps([])
    return Response('Need a list id', 400)

@app.route('/storeExpense', methods=['POST'])
def store():
    ''' Stores the posted data to the mongo '''
    jsonAsDict = getDictFromPost(request)
    listId = jsonAsDict['listId']
    name = jsonAsDict['name']
    amount = jsonAsDict['amount']
    if listId != None and listId != '' and name != None and name != '' and amount != None and float(amount) >= 0:
        storedObjectDict = storage.store(listId, name, amount)
        storedObjectDict['listId'] = listId
        return json.dumps(storedObjectDict)
    return Response('Wrong format, will not store.', 400)

@app.route('/deleteExpense', methods=['DELETE'])
def delete():
    ''' Deletes the posted data by looking up the posted timestamp '''
    jsonAsDict = getDictFromPost(request)
    listId = jsonAsDict.get('listId')
    oid = jsonAsDict.get('id')
    if listId != None and listId != '' and oid != None and oid != '':
        if storage.delete(listId, oid):
            return Response('OK', 200)
    return Response('Not found', 404)

@app.route('/createExpensesList', methods=['POST'])
def createExpensesList():
    ''' Stores the posted data to the mongo '''
    jsonAsDict = getDictFromPost(request)
    name = jsonAsDict['name']
    #wgId = jsonAsDict['wgId']
    if name != None and name != '':
        storedObjectDict = storage.createExpensesList(name, '56acce795a3c045a12cb98d6')
        return json.dumps(storedObjectDict)
    return Response('Wrong format, will not store.', 400)

@app.route('/expensesList')
def getExpensesList():
    ''' Returns a json list of depts '''
    listId = request.args.get('listId')
    if listId != None and listId != '':
        return Response(json.dumps(storage.getNormalizedExpensePosts(listId)))
    return Response('List not found', 404)


@app.route('/expensesLists')
def getExpensesLists():
    ''' Returns a json list of all expensesLists '''
    return Response(json.dumps(storage.getExpensesLists()))


@app.route('/wgs')
def getWGs():
    ''' Returns a json list of all wgs '''
    return Response(json.dumps(storage.getWGs()))

if __name__ == '__main__':
    wgId = storage.createWG('mett')
    if wgId != None:
        storage.createExpensesList('Test', wgId)
    print(storage.getWGs())
    print(storage.getExpensesLists())
    app.run(host='0.0.0.0', debug=True)
