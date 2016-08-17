#!/usr/bin/python

import os
from flask import Flask, request, json, Response

from flask_jwt import JWT, jwt_required, current_identity
import hashlib
from datetime import timedelta

import deptCalculator
import storage

from decimal import *


'''
Simple Flask-API for serving requests. API offers stuff like calculating depts among people or storing data.
'''

########## JWT authentication, custom hashing ##########


def hashPw(password):
    salt = open('./secrets/salt', 'r', encoding='utf-8').read()
    return hashlib.sha512(str(password + salt).encode('utf-8')).hexdigest()


def authenticate(wgName, password):
    return storage.getWGWrapper(wgName, hashPw(password))

    
def identity(payload):
    wgId = payload.get('identity')
    return wgId


########## Initialize app ##########

app = Flask(__name__)

app.config['SECRET_KEY'] = open('./secrets/secret', 'r', encoding='utf-8').read()
app.config.setdefault('JWT_EXPIRATION_DELTA', timedelta(days=30))

jwt = JWT(app, authenticate, identity)

storage.connectMongo(str(os.environ['MONGO_ENDPOINT']))


########## helper methods ###########


def getDictFromPost(request):
    if 'application/json' in request.headers.get('Content-Type'):
        postedJson = json.dumps(request.json)
        #print(postedJson)
        return json.loads(postedJson)


########## dept calculation ##########


@app.route('/meanDepts', methods=['POST'])
@jwt_required()
def depts():
    ''' Calculates the "mean" of all depts inside the database'''
    listName = getDictFromPost(request).get('listName')
    if listName != None and listName != 'undefined':
        persons = storage.getExpensesPerPerson(listName, current_identity)
        dispenses = storage.getDispenses(listName, current_identity)
        if len(persons) > 0:
            meanDepts = deptCalculator.calcDepts(persons, dispenses)
            return json.dumps(meanDepts)
        return json.dumps([])
    return Response('Need a list id', 400)


########## expense post operations ############


@app.route('/storeExpense', methods=['POST'])
@jwt_required()
def store():
    ''' Stores the posted data to the mongo '''
    jsonAsDict = getDictFromPost(request)
    listName = jsonAsDict.get('listName')
    name = jsonAsDict.get('name')
    amount = Decimal(jsonAsDict.get('amount')) * Decimal('100')
    comment = jsonAsDict.get('comment')
    if listName != None and listName != '' and listName != 'undefined' and name != None and name != '' and name != 'undefined' and amount != None and amount >= 0:
        storedObjectDict = storage.store(listName, current_identity, name, int(amount), comment)
        if storedObjectDict:
            storedObjectDict['listName'] = listName
            return json.dumps(storedObjectDict)
        return Response('List is locked, cannot store', 409)
    return Response('Wrong format, will not store.', 400)

@app.route('/deleteExpense', methods=['DELETE'])
@jwt_required()
def delete():
    ''' Deletes the posted data by looking up the posted timestamp '''
    jsonAsDict = getDictFromPost(request)
    listName = jsonAsDict.get('listName')
    postId = jsonAsDict.get('id')
    print(postId, listName)
    if listName != None and listName != '' and listName != 'undefined' and postId != None and postId != '' and postId != 'undefined':
        if storage.delete(listName, current_identity, postId):
            return Response('OK', 200)
        return Response('List is locked, cannot delete', 409)
    return Response('Not found', 404)


########## expense list operations ###########


@app.route('/createExpensesList', methods=['POST'])
@jwt_required()
def createExpensesList():
    ''' Stores the posted data to the mongo '''
    jsonAsDict = getDictFromPost(request)
    name = jsonAsDict.get('name')
    if name != None and name != '' and name != 'undefined':
        storedObjectDict = storage.createExpensesList(name, current_identity)
        return json.dumps(storedObjectDict)
    return Response('Wrong format, will not store.', 400)

@app.route('/deleteExpensesList', methods=['DELETE'])
@jwt_required()
def deleteExpensesList():
    ''' Deletes the posted listName from DB '''
    listName = getDictFromPost(request).get('listName')
    if listName != None and listName != '' and listName != 'undefined':
        storage.deleteExpensesList(listName, current_identity)
        return Response('OK', 200)
    return Response('Wrong format, cannot delete list.', 400)


@app.route('/lockExpensesList', methods=['POST'])
@jwt_required()
def lockExpensesList():
    ''' Locks the posted listName from DB '''
    listName = getDictFromPost(request).get('listName')
    if listName != None and listName != '' and listName != 'undefined':
        storage.lockExpensesList(listName, current_identity)
        return Response('OK', 200)
    return Response('Wrong format, cannot lock list.', 400)


@app.route('/expensePosts', methods=['GET'])
@jwt_required()
def getExpensePosts():
    ''' Returns a json list of depts for a given listName'''
    listName = request.args.get('listName')
    if listName != None and listName != '' and listName != 'undefined':
        return Response(json.dumps(storage.getNormalizedExpensePosts(listName, current_identity)))
    return Response('List not found', 404)



@app.route('/setDispenses', methods=['POST'])
@jwt_required()
def setDispenses():
    ''' Returns a json list of depts for a given listName'''
    postedJson = getDictFromPost(request)
    listName = postedJson.get('listName')
    dispenses = Decimal(postedJson.get('dispenses')) * Decimal('100')
    if listName != None and listName != '' and listName != 'undefined' and dispenses != None and dispenses >= 0:
        return Response(json.dumps(storage.setDispenses(listName, current_identity, dispenses)))
    return Response('List not found', 404)


########## wg operations ##########


@app.route('/expensesList', methods=['GET'])
@jwt_required()
def getExpensesList():
    ''' Returns a json list of all expensesLists for a given wg'''
    result = storage.getExpensesList(request.args.get('listName'), current_identity)
    if not result:
        return Response('List not found', 404)
    return Response(json.dumps(result))

@app.route('/expensesListNames', methods=['GET'])
@jwt_required()
def getExpensesListNames():
    ''' Returns a json list of all expensesLists for a given wg'''
    return Response(json.dumps(storage.getExpensesListNames(current_identity)))

@app.route('/register', methods=['POST'])
def registerNewWg():
    ''' Registers a new wg with the posted name, returns 409 (conflict) on existing wg '''
    #print(request.json)
    jsonAsDict = getDictFromPost(request)
    wgName, hashed = jsonAsDict.get('wgName'), hashPw(jsonAsDict.get('password'))
    if (wgName and hashed):
        created = storage.createWG(wgName, hashed)
        if created:
            return Response('OK', 200)
        return Response('Conflict', 409)
    return Response('Cannot create wg, need name and password.', 400)


########## dev server start ##########

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
