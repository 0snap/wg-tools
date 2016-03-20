#!/usr/bin/python

from flask import Flask, request, json, Response
from flask.ext.cors import CORS

from flask_jwt import JWT, jwt_required, current_identity
import hashlib

import deptCalculator
import storage


'''
Simple Flask-API for serving requests. API offers stuff like calculating depts among people or storing data.
'''

########## JWT authentication, custom hashing ##########


def hashPw(password):
    salt = open('./salt', 'r', encoding='utf-8').read()
    return hashlib.sha512(str(password + salt).encode('utf-8')).hexdigest()


def authenticate(wgName, password):
    return storage.getWG(wgName, hashPw(password))

    
def identity(payload):
    wgId = payload['identity']
    return wgId

app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret'

jwt = JWT(app, authenticate, identity)


cors = CORS(app, resources={r"/*": {"origins": "*"}})


########## helper methods ###########


def getDictFromPost(request):
    if request.headers['Content-Type'] == ('application/json; charset=UTF-8'):
        postedJson = json.dumps(request.json)
        print(postedJson)
        return json.loads(postedJson)


########## dept calculation ##########


@app.route('/calcDeptsFromPostData', methods=['POST'])
@jwt_required()
def calcDepts():
    ''' Calculates the "mean" of all depts contained in the post-data'''
    jsonAsDict = getDictFromPost(request)
    expensesList = deptCalculator.calcDepts(jsonAsDict)
    return json.dumps(expensesList)

@app.route('/meanDepts', methods=['GET'])
@jwt_required()
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


########## expense post operations ############


@app.route('/storeExpense', methods=['POST'])
@jwt_required()
def store():
    ''' Stores the posted data to the mongo '''
    jsonAsDict = getDictFromPost(request)
    listId = jsonAsDict['listId']
    name = jsonAsDict['name']
    amount = float(jsonAsDict['amount'])
    if listId != None and listId != '' and name != None and name != '' and amount != None and amount >= 0:
        storedObjectDict = storage.store(listId, name, int(amount * 100))
        storedObjectDict['listId'] = listId
        return json.dumps(storedObjectDict)
    return Response('Wrong format, will not store.', 400)

@app.route('/deleteExpense', methods=['DELETE'])
@jwt_required()
def delete():
    ''' Deletes the posted data by looking up the posted timestamp '''
    jsonAsDict = getDictFromPost(request)
    listId = jsonAsDict.get('listId')
    oid = jsonAsDict.get('id')
    if listId != None and listId != '' and oid != None and oid != '':
        if storage.delete(listId, oid):
            return Response('OK', 200)
    return Response('Not found', 404)


########## expense list operations ###########


@app.route('/createExpensesList', methods=['POST'])
@jwt_required()
def createExpensesList():
    ''' Stores the posted data to the mongo '''
    jsonAsDict = getDictFromPost(request)
    name = jsonAsDict['name']
    wgName = jsonAsDict['wgName']
    if name != None and name != '' and wgName != None and wgName != '':
        storedObjectDict = storage.createExpensesList(name, wgName)
        return json.dumps(storedObjectDict)
    return Response('Wrong format, will not store.', 400)

@app.route('/expensesList')
@jwt_required()
def getExpensesList():
    ''' Returns a json list of depts for a given listId'''
    listId = request.args.get('listId')
    if listId != None and listId != '':
        return Response(json.dumps(storage.getNormalizedExpensePosts(listId)))
    return Response('List not found', 404)


########## wg operations ##########


@app.route('/expensesLists')
@jwt_required()
def getExpensesLists():
    ''' Returns a json list of all expensesLists for a given wg'''
    wgName = request.args.get('wgName')
    if wgName != None and wgName != '':
        return Response(json.dumps(storage.getExpensesLists(wgName)))
    return Response('WG not found', 404)


@app.route('/wgs')
@jwt_required()
def getWGs():
    ''' Returns a json list of all wgs '''
    return Response(json.dumps(storage.getWGs()))


########## server start ##########

if __name__ == '__main__':
    wgId = storage.createWG('mett', hashPw('vollesMett'))
    if wgId != None:
        storage.createExpensesList('Test', wgId)
    print(storage.getWGs())
    print(storage.getExpensesLists('mett'))
    app.run(host='0.0.0.0', debug=True)
