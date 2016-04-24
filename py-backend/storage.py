from mongoengine import *
from datetime import datetime, timedelta
from collections import defaultdict
import random 
import bson



'''
WGs are top level elements, they contain a set of ExpensesLists, 
each ExpensesList contains a list of expensePosts.
'''


#connect(host='mongodb://mongo:27017/depts3')

def connectMongo(mongoEndpoint):
    connect(host='mongodb://' + mongoEndpoint + '/depts3')


class WGWrapper(object):
    ''' Wrapper with explicit id field '''
    def __init__(self, id, name, hash):
        self.id = id
        self.name = name
        self.hash = hash

    def __str__(self):
        return "WG(name='%s')" % self.id

class WG(Document):
    name = StringField()
    pwHash = StringField()

class Post(EmbeddedDocument):
    date_modified = DateTimeField(default=datetime.now)
    meta = {'allow_inheritance': True}

class ExpensePost(Post):
    id = ObjectIdField(default=lambda: bson.ObjectId(), primary_key=True)
    name = StringField()
    amount = IntField(min_value=0)
    color = StringField()
    comment = StringField()
    tsDeleted = DateTimeField(default=None)

class ExpensesList(Document):
    name = StringField()
    wg = ReferenceField(WG, reverse_delete_rule=CASCADE)
    editable = BooleanField()
    expensePosts = ListField(EmbeddedDocumentField(ExpensePost))
    tsDeleted = DateTimeField(default=None)




###############################
## internal helper functions ##
###############################


def __getExpensePosts(listId, wgId, includeDeleted = False):
    ''' Returns all expensepost-objects in a json list '''
    posts = ExpensesList.objects.get(id=listId, wg=__getWgById(wgId)).expensePosts
    if not includeDeleted:
        posts = list(filter(lambda entry: entry.tsDeleted == None, posts))
    return posts



def __getWgById(wgId):
    if len(WG.objects(id=wgId)) == 1:
        return WG.objects.get(id=wgId)



def __normalizeExpensePost(post):
    normalized = {}
    normalized['name'] = post.name
    normalized['amount'] = round(float(post.amount/100), 2)
    normalized['comment'] = post.comment
    normalized['date'] = post.date_modified
    normalized['id'] = str(post.id)
    normalized['color'] = post.color
    #normalized['deleted'] = post.tsDeleted
    #print(normalized)
    return normalized

def __getRandomColor():
    ''' Returns a random color as hex string. The color is strong, and not dark. especially not dark blue. '''
    RGBLowHigh = [lambda: random.randint(0,63), lambda: random.randint(191,255)]
    RGBLowHigh.append(random.choice(RGBLowHigh))
    random.shuffle(RGBLowHigh)
    # avoid dark blues
    if RGBLowHigh[2]() > 190 and RGBLowHigh[0]() < 64 and RGBLowHigh[1]() < 64:
        randomLow = random.randint(0,1)
        RGBLowHigh[randomLow], RGBLowHigh[2] = RGBLowHigh[2], RGBLowHigh[randomLow]
    randomHex = '#%02X%02X%02X' % (RGBLowHigh[0](),RGBLowHigh[1](),RGBLowHigh[2]())
    #print(randomHex)
    return randomHex

def getColorForName(listId, name):
    connectedPosts = ExpensesList.objects(id=listId, expensePosts__name=name)
    if len(connectedPosts) > 0:
        return list(filter(lambda post: post.name == name, connectedPosts[0].expensePosts))[0].color
    return __getRandomColor()


###############################

#########################
## top level functions ##
#########################

## expense post operations


def getNormalizedExpensePosts(listId, wgId, includeDeleted = False):
    ''' Returns all expensepost-objects in a json list '''
    return [__normalizeExpensePost(post) for post in __getExpensePosts(listId, wgId)]


def store(listId, wgId, name, amount, comment):
    # print("storing ", listId, name, amount)
    color = getColorForName(listId, name)
    expensePost = ExpensePost(name=name, amount=amount, color=color, comment=comment)
    stored = ExpensesList.objects(id=listId, wg=__getWgById(wgId)).update(push__expensePosts=expensePost)
    if not stored:
        return None
    return __normalizeExpensePost(expensePost)


def delete(listId, wgId, postId):
    #print("shall delete ", listId, postId)
    ExpensesList.objects(id=listId, wg=__getWgById(wgId), expensePosts__id=postId).update(set__expensePosts__S__tsDeleted=datetime.now)
    return True


## expenses list operations

def getExpensesLists(wgId, name=None, includeDeleted=False):
    wg = __getWgById(wgId)
    allLists = ExpensesList.objects(wg=wg) if name == None else ExpensesList.objects(wg=wg, name=name)
    lists = [{'id': str(expensesList.id), 'name': expensesList.name, 'tsDeleted': expensesList.tsDeleted} for expensesList in allLists]
    if not includeDeleted:
        lists = list(filter(lambda entry: entry['tsDeleted'] == None, lists))
    return lists


def createExpensesList(name, wgId):
    ''' Creates and stores new ExpensesList object with the given name. Returns its id. '''
    print('create explist ', name, wgId)
    lists = getExpensesLists(wgId, name)
    print(lists)
    if len(lists) == 0:
        # print('create new one')
        wg = __getWgById(wgId)
        expensesList = ExpensesList(name=name, wg=wg, editable=True)
        expensesList.save()
        return str(expensesList.id)
    elif len(lists) == 1:
        # print('found old one')
        return lists[0]['id']
    return None


def deleteExpensesList(listId, wgId):
    ''' Deletes expenses list object with the given id. '''
    ExpensesList.objects(id=listId, wg=__getWgById(wgId)).update(tsDeleted=datetime.now)
    return True


def getExpensesPerPerson(listId, wgId):
    ''' Returns a list in the form [{name: 'foo' amount: 'sum-amounts-for-foo', color: '#fff'}] 
        of all unsettled expenses inside the ExpensesList with the given listId '''
    people = list() 
    posts = __getExpensePosts(listId, wgId)
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

## WG operations

def getWGs():
    return [{'id': str(wg.id), 'name': wg.name } for wg in WG.objects]


## wrapper around a wg document 
def getWGWrapper(name, pwHash):
    if len(WG.objects(name=name, pwHash=pwHash)) == 1:
        wg = WG.objects.get(name=name, pwHash=pwHash)
        return WGWrapper(str(wg.id), name, pwHash)
    return None


def createWG(name, pwHash):
    ''' Creates and stores new wg object with the given name. Returns its id '''
    # TODO: check if exists
    if len(WG.objects(name=name)) > 0:
        return None
    wg = WG(name=name, pwHash = pwHash)
    wg.save()
    #print('created wg')
    return wg.id




