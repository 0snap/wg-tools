#!/usr/bin/python

from decimal import *

def sortDictOfDicts(toSort, value, reverse=False):
    return sorted(toSort.items(), key=lambda entry: entry[1][value], reverse=reverse)

def calcBorrowersSponsors(expensePersons):
    mean = Decimal(sum([person['amount'] for person in expensePersons])/Decimal(len(expensePersons)))
    borrowerMap, sponsorMap = dict(), dict()
    for person in expensePersons:
        person['amount'] = person['amount'] - mean
        if person['amount'] > 0:
            sponsorMap[person['name']] = person
        elif person['amount'] < 0:
            borrowerMap[person['name']] = person
    return sortDictOfDicts(borrowerMap, 'amount'), sortDictOfDicts(sponsorMap, 'amount', True)

def makeEven(borrowers, sponsors):
    ''' Iterates through the given maps and makes them even. Returns list of tuples like (borrower, amount, sponsor) '''
    sums = sum([person['amount'] for (name, person) in borrowers]) + sum([person['amount'] for (name, person) in sponsors])
    if sums > 0.01 or sums < -0.01:
        print(sum([person['amount'] for (name, person) in sponsors]))
        print(sum([person['amount'] for (name, person) in borrowers]))
        raise ValueError('Cannot make even given sponsors and borrowers, they do not sum up to zero.')
    result = list()
    # print(borrowers, sponsors)
    while(bool(borrowers) and bool(sponsors)):
        nameB, borrower = borrowers.pop()
        nameS, sponsor = sponsors.pop()
        minus, plus = borrower['amount'], sponsor['amount']
        total = Decimal(minus + plus).quantize(Decimal('0.01'))
        if total < 0:
            del(sponsor['amount'])
            result.append({"borrower": borrower, "amount": round(float(plus), 2), "sponsor": sponsor})
            borrower['amount'] = minus + plus 
            borrowers.append((nameB, borrower))
        elif total == 0:
            del(borrower['amount'])
            del(sponsor['amount'])
            result.append({"borrower": borrower, "amount": round(float(plus), 2), "sponsor": sponsor})
        elif total > 0:
            del(borrower['amount'])
            result.append({"borrower": borrower, "amount": round(float(minus) * -1, 2), "sponsor": sponsor})
            sponsor['amount'] = minus + plus 
            sponsors.append((nameS, sponsor))
        # print(borrowers, sponsors)
    print(result)
    return result

def calcDepts(expensePersons):
    ''' expensePersons should be at list in the format  
        [{"name": name, "amount": totalAmount, "other": attributes...}, ...] 
        Calculates how much money has to be traded, returns a list of dicts 
        with all properties that were passed into this function in the format
        [{"sponsor": {"name": nameOfSponsor, "other": attributes...}, "amount": exchangeAmount, 
            "borrower": {"name": nameOfBorrower, "other": attributes...}}, ...] '''
    for person in expensePersons:
        person['amount'] = Decimal(person['amount'])/Decimal('100')
    borrowers, sponsors = calcBorrowersSponsors(expensePersons)
    return makeEven(borrowers, sponsors)
