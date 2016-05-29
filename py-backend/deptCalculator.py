#!/usr/bin/python

from decimal import *

def sortDictOfDicts(toSort, value, reverse=False):
    return sorted(toSort.items(), key=lambda entry: entry[1][value], reverse=reverse)


def cleanResult(result):
    ''' takes in a list of dicts, cleans the following:
        remove dict, iff amount is zero
        remove remaining amount entries from borrower and sponsor '''
    result = [pbI for pbI in result if pbI.get('amount')] # everything greater 0
    for paybackInstruction in result:
        if paybackInstruction['sponsor'].get('amount'): del(paybackInstruction['sponsor']['amount'])
        if paybackInstruction['borrower'].get('amount'): del(paybackInstruction['borrower']['amount'])
    return result


def calcBorrowersSponsors(expensePersons, dispenseAmount):
    mean = Decimal((sum([person['amount'] for person in expensePersons]) - dispenseAmount)/Decimal(len(expensePersons)))
    borrowerMap, sponsorMap = dict(), dict()
    for person in expensePersons:
        person['amount'] = person['amount'] - mean
        if person['amount'] > 0:
            sponsorMap[person['name']] = person
        elif person['amount'] < 0:
            borrowerMap[person['name']] = person
    return sortDictOfDicts(borrowerMap, 'amount'), sortDictOfDicts(sponsorMap, 'amount', True)

def makeEven(borrowers, sponsors, dispenseAmount):
    ''' Iterates through the given maps and makes them even. Returns list of tuples like (borrower, amount, sponsor) '''
    sums = sum([person['amount'] for (name, person) in borrowers]) + sum([person['amount'] for (name, person) in sponsors]) - dispenseAmount
    if sums > 0.01 or sums < -0.01:
        #print(sum([person['amount'] for (name, person) in sponsors]))
        #print(sum([person['amount'] for (name, person) in borrowers]))
        raise ValueError('Cannot make even given sponsors and borrowers, they do not sum up to zero.')

    #print(borrowers, sponsors)

    result = makeEvenDispenses(sponsors, dispenseAmount)
    result += makeEvenPersons(borrowers, sponsors)
    
    #print(result)
    return result

def makeEvenDispenses(sponsors, dispenseAmount):
    result = list()
    while dispenseAmount > Decimal('0.01'):
        name, sponsor = sponsors.pop(0)
        total = Decimal(dispenseAmount - sponsor['amount']).quantize(Decimal('0.01'))
        if total > 0:
            dispenseAmount = total
            result.append({'borrower': {'name':'Spende'}, 'amount': round(float(sponsor['amount']), 2), 'sponsor': sponsor})
            del(sponsor['amount'])
        elif total == 0:
            del(sponsor['amount'])
            result.append({'borrower': {'name':'Spende'}, 'amount': round(float(dispenseAmount), 2), 'sponsor': sponsor})
            dispenseAmount = 0
        else:
            sponsor['amount'] = Decimal(total * -1)
            result.append({'borrower': {'name':'Spende'}, 'amount': round(float(dispenseAmount), 2), 'sponsor': sponsor})
            sponsors.append((name, sponsor))
            dispenseAmount = 0
    return result

def makeEvenPersons(borrowers, sponsors):
    result = list()
    while(bool(borrowers) and bool(sponsors)):
        nameB, borrower = borrowers.pop(0)
        nameS, sponsor = sponsors.pop(0)
        minus, plus = borrower['amount'], sponsor['amount']
        total = Decimal(minus + plus).quantize(Decimal('0.01'))
        if total < 0:
            del(sponsor['amount'])
            result.append({'borrower': borrower, 'amount': round(float(plus), 2), 'sponsor': sponsor})
            borrower['amount'] = minus + plus 
            borrowers.append((nameB, borrower))
        elif total == 0:
            del(borrower['amount'])
            del(sponsor['amount'])
            result.append({'borrower': borrower, 'amount': round(float(plus), 2), 'sponsor': sponsor})
        elif total > 0:
            del(borrower['amount'])
            result.append({'borrower': borrower, 'amount': round(float(minus) * -1, 2), 'sponsor': sponsor})
            sponsor['amount'] = minus + plus 
            sponsors.append((nameS, sponsor))
        # print(borrowers, sponsors)
    return result

def calcDepts(expensePersons, dispenseAmount):
    ''' expensePersons should be at list in the format  
        [{'name': name, 'amount': totalAmount, 'other': attributes...}, ...] 
        Calculates how much money has to be traded, the dispenseAmount is subtracted from the total.
        Returns a list of dicts with all properties that were passed into this function in the format
        [{'sponsor': {'name': nameOfSponsor, 'other': attributes...}, 'amount': exchangeAmount, 
            'borrower': {'name': nameOfBorrower, 'other': attributes...}}, ...] '''
    for person in expensePersons:
        person['amount'] = Decimal(person['amount'])/Decimal('100')
    if dispenseAmount:
        dispenseAmount = Decimal(dispenseAmount)/Decimal('100')

    borrowers, sponsors = calcBorrowersSponsors(expensePersons, dispenseAmount)
    clean = cleanResult(makeEven(borrowers, sponsors, dispenseAmount))
    #print(clean)
    return clean
