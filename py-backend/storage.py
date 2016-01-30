from mongoengine import *
from datetime import datetime, timedelta
from collections import defaultdict
import random 
import bson



'''
WGs are top level elements, they contain a set of ExpensesLists, 
each ExpensesList contains a list of expensePosts.
'''


connect(host='mongodb://localhost:27017/depts')
#connect('depts', host='mongo', port=27017)

class WG(Document):
    name = StringField()

class Post(EmbeddedDocument):
    date_modified = DateTimeField(default=datetime.now)
    meta = {'allow_inheritance': True}

class ExpensePost(Post):
    id = ObjectIdField(default=lambda: bson.ObjectId(), primary_key=True)
    name = StringField()
    amount = FloatField(min_value=0)
    color = StringField()
    tsDeleted = DateTimeField(default=None)

class ExpensesList(Document):
    name = StringField()
    wg = ReferenceField(WG, reverse_delete_rule=CASCADE)
    editable = BooleanField()
    expensePosts = ListField(EmbeddedDocumentField(ExpensePost))




'''
Plain function definitions for querying and manipulating data
'''

def getExpensePosts(listId, includeDeleted = False):
    ''' Returns all expensepost-objects in a json list '''
    posts = ExpensesList.objects.get(id=listId).expensePosts
    if not includeDeleted:
        posts = list(filter(lambda entry: entry.tsDeleted == None, posts))
    return posts

def getNormalizedExpensePosts(listId, includeDeleted = False):
    ''' Returns all expensepost-objects in a json list '''
    return [normalizeExpensePost(post) for post in getExpensePosts(listId)]


def getExpensesPerPerson(listId):
    ''' Returns a list in the form [{name: 'foo' amount: 'sum-amounts-for-foo', color: '#fff'}] 
        of all unsettled expenses inside the ExpensesList with the given listId '''
    people = list() 
    posts = getExpensePosts(listId)
    names = set([entry.name for entry in posts])
    #print(names)
    for name in names:
        person = dict()
        entries = list(filter(lambda post: post.name == name, posts))
        person['amount'] = sum([entry.amount for entry in entries])
        person['name'] = name
        person['color'] = entries[0].color
        #print(person)
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
    #normalized['deleted'] = post.tsDeleted
    #print(normalized)
    return normalized

def getRandomColor():
    randomRGB = lambda: random.randint(64,192) # nicely visible
    randomHex = '#%02X%02X%02X' % (randomRGB(),randomRGB(),randomRGB())
    return randomHex

def getColorForName(listId, name):
    connectedPosts = ExpensesList.objects(id=listId, expensePosts__name=name)
    if (len(connectedPosts) > 0):
        return list(filter(lambda post: post.name == name, connectedPosts[0].expensePosts))[0].color
    return getRandomColor()

def store(listId, name, amount):
    color = getColorForName(listId, name)
    expensePost = ExpensePost(name=name, amount=amount, color=color)
    stored = ExpensesList.objects.update_one(push__expensePosts=expensePost)
    if not stored:
        return None
    return normalizeExpensePost(expensePost)

def delete(listId, postId):
    #print("shall delete ", listId, postId)
    ExpensesList.objects(id=listId, expensePosts__id=postId).update(set__expensePosts__S__tsDeleted=datetime.now)
    return True

def createExpensesList(name, wgId):
    ''' Creates and stores new ExpensesList object with the given name. Returns its id '''
    # TODO: check if exists
    if(len(WG.objects(id=wgId)) == 1):
        wg = WG.objects.get(id=wgId)
        #print('create explist ', name, wgId, wg)
        if(len(ExpensesList.objects(name=name, wg=wg)) == 0):
            expensesList = ExpensesList(name=name, wg=wg, editable=True)
            expensesList.save()
            return expensesList.id
    return None

def createWG(name):
    ''' Creates and stores new wg object with the given name. Returns its id '''
    # TODO: check if exists
    if(len(WG.objects(name=name)) > 0):
        return None
    wg = WG(name=name)
    wg.save()
    #print('created wg')
    return wg.id

def getWGs():
    return [{'id': str(wg.id), 'name': wg.name} for wg in WG.objects]

def getExpensesLists():
    return [{'id': str(expensesList.id), 'name': expensesList.name} for expensesList in ExpensesList.objects]