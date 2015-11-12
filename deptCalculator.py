#!/usr/bin/python

def calcMinusPlus(expensionsMap):
    ''' Expensions map is in the format of {"personName": moneyAmount, ...}'''
    average = sum(expensionsMap.values())/float(len(expensionsMap))
    minusMap = {}
    plusMap = {}
    for person, expension in expensionsMap.items():
        dept = float(expension) - float(average)
        if dept != 0:
            if dept > 0:
                plusMap[person] = dept
            elif dept < 0:
                minusMap[person] = dept
    return minusMap, plusMap

def makeEven(minusMap, plusMap):
    ''' Iterates through the given maps and makes them even. Returns list of tuples like (obligor, amount, obligee) '''
    result = list()
    #print(minusMap, plusMap)
    while(bool(minusMap) and bool(plusMap)): # avoid floating point errors
        reducedMinusMap = dict()
        for minusPerson, minus in minusMap.items():
            plusPerson, plus = plusMap.popitem()
            if minus + plus < 0:
                result.append((minusPerson, plus, plusPerson))
                reducedMinusMap[minusPerson] = minus+plus
            if minus + plus == 0:
                result.append((minusPerson, plus, plusPerson))
            if minus + plus > 0:
                result.append((minusPerson, minus*-1, plusPerson))
                plusMap[plusPerson] = minus+plus
        minusMap = reducedMinusMap
        #print(minusMap, plusMap)
    return result

def calcDepts(expensionsMap):
    ''' Expansionsmap should be in the format like {"person1": amountMoneySpent, ...} 
        Returns a list of tuples in the form ((person1, amount, person2), (...) ), where
        'person1' has to give 'amount' to 'person2' ''' 
    minusMap, plusMap = calcMinusPlus(expensionsMap)
    return makeEven(minusMap, plusMap)

if __name__ == '__main__':
    foo = dict()
    foo["Felix"] = 135
    foo["Shorty"] = 430
    foo["Frieder"] = 340
    foo["F2"] = 389
    foo["F3"] = 33
    foo["F4"] = 1001
    foo["F5"] = 356
    foo["F6"] = 3
    foo["F7"] = 323
    print(calcDepts(foo))