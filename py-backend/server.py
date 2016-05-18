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


@app.route('/calcDeptsFromPostData', methods=['POST'])
@jwt_required()
def calcDepts():
    ''' Calculates the "mean" of all depts contained in the post-data'''
    jsonAsDict = getDictFromPost(request)
    expensesList = deptCalculator.calcDepts(jsonAsDict)
    return json.dumps(expensesList)

@app.route('/meanDepts', methods=['POST'])
@jwt_required()
def depts():
    ''' Calculates the "mean" of all depts inside the database'''
    listId = getDictFromPost(request).get('listId')
    if listId != None and listId != 'undefined':
        persons = storage.getExpensesPerPerson(listId, current_identity)
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
    listId = jsonAsDict.get('listId')
    name = jsonAsDict.get('name')
    amount = Decimal(jsonAsDict.get('amount')) * Decimal('100')
    comment = jsonAsDict.get('comment')
    if listId != None and listId != '' and listId != 'undefined' and name != None and name != '' and name != 'undefined' and amount != None and amount >= 0:
        storedObjectDict = storage.store(listId, current_identity, name, int(amount), comment)
        if storedObjectDict:
            storedObjectDict['listId'] = listId
            return json.dumps(storedObjectDict)
        return Response('List is locked, cannot store', 409)
    return Response('Wrong format, will not store.', 400)

@app.route('/deleteExpense', methods=['DELETE'])
@jwt_required()
def delete():
    ''' Deletes the posted data by looking up the posted timestamp '''
    jsonAsDict = getDictFromPost(request)
    listId = jsonAsDict.get('listId')
    oid = jsonAsDict.get('id')
    if listId != None and listId != '' and listId != 'undefined' and oid != None and oid != '' and oid != 'undefined':
        if storage.delete(listId, current_identity, oid):
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
    ''' Deletes the posted listId from DB '''
    listId = getDictFromPost(request).get('listId')
    if listId != None and listId != '' and listId != 'undefined':
        storage.deleteExpensesList(listId, current_identity)
        return Response('OK', 200)
    return Response('Wrong format, cannot delete list.', 400)


@app.route('/lockExpensesList', methods=['POST'])
@jwt_required()
def lockExpensesList():
    ''' Locks the posted listId from DB '''
    listId = getDictFromPost(request).get('listId')
    if listId != None and listId != '' and listId != 'undefined':
        storage.lockExpensesList(listId, current_identity)
        return Response('OK', 200)
    return Response('Wrong format, cannot lock list.', 400)


@app.route('/expensesList', methods=['POST'])
@jwt_required()
def getExpensesList():
    ''' Returns a json list of depts for a given listId'''
    listId = getDictFromPost(request).get('listId')
    if listId != None and listId != '' and listId != 'undefined':
        return Response(json.dumps(storage.getNormalizedExpensePosts(listId, current_identity)))
    return Response('List not found', 404)


########## wg operations ##########


@app.route('/expensesLists', methods=['GET'])
@jwt_required()
def getExpensesLists():
    ''' Returns a json list of all expensesLists for a given wg'''
    return Response(json.dumps(storage.getExpensesLists(current_identity)))

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


@app.route('/wgs')
@jwt_required()
def getWGs():
    ''' Returns a json list of all wgs '''
    return Response(json.dumps(storage.getWGs()))


########## dev server start ##########

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
