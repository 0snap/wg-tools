from mongoengine import *
from datetime import datetime, timedelta
from collections import defaultdict
import random 



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
    if not includeDeleted:
        posts = ExpensesList.objects(id=listId, expensePosts__tsDeleted=None)
    else: posts = ExpensesList.objects(id=listId)
    #print(posts)
    return [normalizeExpensePost(post) for post in posts]

def getExpensesPerPerson(listId):
    ''' Returns a list in the form [{name: 'foo' amount: 'sum-amounts-for-foo', color: '#fff'}] 
        of all unsettled expenses inside the ExpensesList with the given listId '''
    people = list() 
    names = ExpensesList.objects(id=listId, expensePosts__tsDeleted=None).distinct('name')
    for name in names:
        person = dict()
        entries = ExpensesList.objects(id=listId, expensePosts__tsDeleted=None, expensePosts__name=name)
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

def getColorForName(listId, name):
    connectedPosts = ExpensesList.objects(id=listId, expensePosts__name=name)
    if (len(connectedPosts) > 0):
        return connectedPosts[0].color
    return getRandomColor()

def store(listId, name, amount):
    color = getColorForName(name)
    expensePost = ExpensePost(listId=listId, name=name, amount=amount, color=color)
    stored = ExpensesList.objects.update_one(push__expensePosts=expensePost)
    if not stored:
        return None
    return normalizeExpensePost(expensePost)

def delete(listId, postId):
    post = ExpensesList.objects(id=listId, expensePost__id=postId)
    if(post != None):
        post.tsDeleted = datetime.now
        post.update_one(set__expensePosts__S=post)
        return True
    return False

def createExpensesList(name, wgId):
    ''' Creates and stores new ExpensesList object with the given name. Returns its id '''
    # TODO: check if exists
    if(len(WG.objects(id=wgId)) == 1):
        wg = WG.objects.get(id=wgId)
        print('create explist ', name, wgId, wg)
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
    print('created wg')
    return wg.id

def getWGs():
    return [{'id': str(wg.id), 'name': wg.name} for wg in WG.objects]

def getExpensesLists():
    return [{'id': str(expensesList.id), 'name': expensesList.name} for expensesList in ExpensesList.objects]