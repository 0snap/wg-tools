#!/usr/bin/python

def calcSponsorsBorrowers(expensePersons):
    # for key, value in expensePersons.items():
    #     expensePersons[key] = float(value)
    average = sum([person['amount'] for person in expensePersons])/float(len(expensePersons))
    borrowerMap = dict()
    sponsorMap = dict()
    for person in expensePersons:
        person['amount'] = float(person['amount']) - float(average)
        if person['amount'] > 0:
            sponsorMap[person['name']] = person
        elif person['amount'] < 0:
            borrowerMap[person['name']] = person
    return borrowerMap, sponsorMap

def makeEven(borrowerMap, sponsorMap):
    ''' Iterates through the given maps and makes them even. Returns list of tuples like (obligor, amount, obligee) '''
    result = list()
    # print("in")
    # print(borrowerMap, sponsorMap)
    while(bool(borrowerMap) and bool(sponsorMap)): # avoid floating point errors
        reducedborrowerMap = dict()
        for nameB, borrower in borrowerMap.items():
            nameS, sponsor = sponsorMap.popitem()
            minus, plus = borrower['amount'], sponsor['amount']
            if minus + plus < 0:
                result.append({"borrower": borrower, "amount": plus, "sponsor": sponsor})
                borrower['amount'] = minus + plus 
                reducedborrowerMap[nameB] = borrower
            if minus + plus == 0:
                result.append({"borrower": borrower, "amount": plus, "sponsor": sponsor})
            if minus + plus > 0:
                result.append({"borrower": borrower, "amount": minus * -1, "sponsor": sponsor})
                sponsor['amount'] = minus + plus 
                sponsorMap[nameS] = sponsor
        borrowerMap = reducedborrowerMap
        # print(borrowerMap, sponsorMap)
    # print("out")
    # print(result)
    return result

def calcDepts(expensePersons):
    ''' expensePersons should be at list in the format  
        [{"name": name, "amount": totalAmount, "other": attributes...}] 
        Calculates how money has to be traded, returns a list of dicts 
        with all properties that were passed into this function in the format
        [{"sponsor": {"name": nameOfSponsor, "other": attributes...}, "amount": exchangeAmount, 
            "borrower": {"name": nameOfBorrower, "other": attributes...}, ...] '''

    borrowerMap, sponsorMap = calcSponsorsBorrowers(expensePersons)
    return makeEven(borrowerMap, sponsorMap)
