from mongoengine import *
from datetime import datetime, timedelta
from collections import defaultdict
import random 
import bson
import uuid



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
    uuid = StringField(default=lambda: str(uuid.uuid4()))
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
    dispenses = IntField(min_value=0, default=0)
    tsDeleted = DateTimeField(default=None)




###############################
## internal helper functions ##
###############################


def __getExpensePosts(listName, wgId, includeDeleted = False):
    ''' Returns all expensepost-objects in a json list '''
    posts = ExpensesList.objects.get(name=listName, wg=__getWgById(wgId), tsDeleted=None).expensePosts
    if not includeDeleted:
        posts = list(filter(lambda entry: entry.tsDeleted == None, posts))
    return posts


def __getExpensesList(listName, wgId):
    ''' Returns the expense list with the given name, correlated with wgId '''
    activeLists = ExpensesList.objects(name=listName, wg=__getWgById(wgId), tsDeleted=None)
    if activeLists and len(activeLists) == 1:
        return activeLists[0]
    return None



def __getWgById(wgId):
    if len(WG.objects(id=wgId)) == 1:
        return WG.objects.get(id=wgId)



def __normalizeExpensePost(post):
    normalized = {}
    normalized['name'] = post.name
    normalized['amount'] = round(float(post.amount/100), 2)
    normalized['comment'] = post.comment
    normalized['date'] = post.date_modified
    normalized['color'] = post.color
    normalized['id'] = post.uuid
    #normalized['deleted'] = post.tsDeleted
    #print(normalized)
    return normalized


def __normalizeExpenseList(expList):
    normalized = {}
    normalized['name'] = expList.name
    normalized['tsDeleted'] = expList.tsDeleted
    normalized['editable'] = expList.editable
    normalized['dispenses'] = round(float(expList.dispenses/100), 2)
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

def getColorForName(listName, wgId, name):
    connectedPosts = ExpensesList.objects(name=listName, wg=__getWgById(wgId), expensePosts__name=name)
    if len(connectedPosts) > 0:
        return list(filter(lambda post: post.name == name, connectedPosts[0].expensePosts))[0].color
    return __getRandomColor()


###############################

#########################
## top level functions ##
#########################

## expense post operations


def getNormalizedExpensePosts(listName, wgId, includeDeleted = False):
    ''' Returns all expensepost-objects in a json list '''
    return [__normalizeExpensePost(post) for post in __getExpensePosts(listName, wgId)]


def store(listName, wgId, name, amount, comment):
    # print("storing ", listName, name, amount)
    expList = __getExpensesList(listName, wgId)
    if expList and expList.editable:
        color = getColorForName(listName, wgId, name)
        expensePost = ExpensePost(name=name, amount=amount, color=color, comment=comment)
        stored = ExpensesList.objects.get(name=listName, wg=__getWgById(wgId), tsDeleted=None).update(push__expensePosts=expensePost)
        if not stored:
            return None
        return __normalizeExpensePost(expensePost)
    return None


def delete(listName, wgId, postId):
    #print("shall delete ", listName, postId)
    expList = __getExpensesList(listName, wgId)
    if expList and expList.editable:
        ExpensesList.objects(name=listName, wg=__getWgById(wgId), expensePosts__uuid=postId).update(set__expensePosts__S__tsDeleted=datetime.now)
        return True
    return False


## expenses list operations

def getExpensesListNames(wgId, includeDeleted=False):
    allLists = ExpensesList.objects(wg=__getWgById(wgId), tsDeleted=None) if not includeDeleted else ExpensesList.objects(wg=__getWgById(wgId))
    names = [ x.name for x in allLists ]
    return names

def getExpensesList(listName, wgId):
    expList = __getExpensesList(listName, wgId)
    return __normalizeExpenseList(expList) if expList != None else None


def createExpensesList(listName, wgId):
    ''' Creates and stores new ExpensesList object with the given name. Returns its id. '''
    #print('create explist ', listName, wgId)
    exstingList = __getExpensesList(listName, wgId)
    if not exstingList:
        expensesList = ExpensesList(name=listName, wg=__getWgById(wgId), editable=True)
        expensesList.save()
        return __normalizeExpenseList(expensesList)
    else: return __normalizeExpenseList(exstingList)


def deleteExpensesList(listName, wgId):
    ''' Deletes expenses list object with the given id. '''
    ExpensesList.objects(name=listName, wg=__getWgById(wgId), tsDeleted=None).update(tsDeleted=datetime.now)
    return True


def lockExpensesList(listName, wgId):
    ''' Locks expenses list object with the given id. '''
    #print('locked list', listName)
    ExpensesList.objects(name=listName, wg=__getWgById(wgId), tsDeleted=None).update(editable=False)
    return True


def setDispenses(listName, wgId, dispenses):
    ExpensesList.objects(name=listName, wg=__getWgById(wgId), tsDeleted=None).update(dispenses=dispenses)
    return True


def getDispenses(listName, wgId):
    activeList = __getExpensesList(listName, wgId)
    if activeList:
        return activeList.dispenses
    return None

def getExpensesPerPerson(listName, wgId):
    ''' Returns a list in the form [{name: 'foo' amount: 'sum-amounts-for-foo', color: '#fff'}] 
        of all unsettled expenses inside the ExpensesList with the given listName '''
    people = list() 
    posts = __getExpensePosts(listName, wgId)
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


## wrapper around a wg document 
def getWGWrapper(name, pwHash):
    if len(WG.objects(name=name, pwHash=pwHash)) == 1:
        wg = WG.objects.get(name=name, pwHash=pwHash)
        return WGWrapper(str(wg.id), name, pwHash)
    return None


def createWG(name, pwHash):
    ''' Creates and stores new wg object with the given name. Returns its id '''
    if len(WG.objects(name=name)) > 0:
        return None
    wg = WG(name=name, pwHash = pwHash)
    wg.save()
    return wg.id




