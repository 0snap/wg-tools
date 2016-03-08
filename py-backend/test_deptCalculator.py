#!/usr/bin/python

import pytest # for exception testing

import deptCalculator

###########################################

def getExpensePersons():
    # the mean of all expenses for this set of test items is 5

    foo = {'name': 'foo', 'amount': 10, 'some': 'attr', 'another': 'attr'}
    bar = {'name': 'bar', 'amount': 5, 'some': 'attr', 'another': 'attr', 'yet': 'anotherattr'}
    baz = {'name': 'baz', 'amount': 7.5, 'another': 'attr', 'yet': 'anotherattr'}
    ping = {'name': 'ping', 'amount': 0, 'some': 'attr', 'another': 'attr', 'yet': 'anotherattr'}
    pong = {'name': 'pong', 'amount': 2.5, 'some': 'attr', 'another': 'attr', 'yet': 'anotherattr'}

    return foo, bar, baz, ping, pong

expectedMean = 5

###########################################


def test_calculator_sanity():
    foo, bar, baz, ping, pong = getExpensePersons()

    # mean of foo and bar is 7.5
    expensePersons = [foo, bar]

    returnList = deptCalculator.calcDepts(expensePersons)
    paybackInstruction = returnList[0]

    expectedFoo = {'name': 'foo', 'some': 'attr', 'another': 'attr'}
    expectedBar = {'name': 'bar', 'some': 'attr', 'another': 'attr', 'yet': 'anotherattr'}


    assert paybackInstruction
    assert paybackInstruction['borrower'] == expectedBar
    assert paybackInstruction['sponsor'] == expectedFoo
    assert paybackInstruction['amount'] == 2.5


def test_sponsors_borrowers_calculation_sanity():
    foo, bar, baz, ping, pong = getExpensePersons()
    expensePersons = [foo, bar, baz, ping, pong]

    borrowers, sponsors = deptCalculator.calcBorrowersSponsors(expensePersons)
    expectedNames = ['foo', 'baz', 'ping', 'pong']

    borrowerNames = [b[0] for b in borrowers]
    sponsorNames = [s[0] for s in sponsors]

    assert 'foo' in sponsorNames 
    assert 'baz' in sponsorNames
    assert 'ping' in borrowerNames
    assert 'pong' in borrowerNames
    assert 'bar' not in borrowerNames
    assert 'bar' not in sponsorNames

def test_make_even_sanity():
    b1 = ('b1', {'name':'b1', 'amount':-5})
    b2 = ('b2', {'name':'b2', 'amount':-7})
    b3 = ('b3', {'name':'b3', 'amount':-9})
    
    s1 = ('s1', {'name':'s1', 'amount':1.5})
    s2 = ('s2', {'name':'s2', 'amount':3})
    s3 = ('s3', {'name':'s3', 'amount':16.5})

    expectedResult = [{'borrower':{'name':'b1'},'amount': 1.5,'sponsor':{'name':'s1'}},
                {'borrower':{'name':'b1'},'amount': 3,'sponsor':{'name':'s2'}},
                {'borrower':{'name':'b1'},'amount': 0.5,'sponsor':{'name':'s3'}},
                {'borrower':{'name':'b2'},'amount': 7,'sponsor':{'name':'s3'}},
                {'borrower':{'name':'b3'},'amount': 9,'sponsor':{'name':'s3'}}]

    orderedBorrowers = [b3, b2, b1]
    orderedSponsors = [s3, s2, s1]

    result = deptCalculator.makeEven(orderedBorrowers, orderedSponsors)
    #print(result)
    assert result == expectedResult

    b1 = ('b1', {'name':'b1', 'amount':-5})
    s1 = ('s1', {'name':'s1', 'amount':1.5})

    invalidBorrowers = [b1]
    invalidSponsors = [s1]

    with pytest.raises(ValueError):
        deptCalculator.makeEven(invalidBorrowers, invalidSponsors)

def test_sponsors_calculation():
    foo, bar, baz, ping, pong = getExpensePersons()
    expensePersons = [foo, bar, baz, ping, pong]

    # results are ordered
    borrowers, sponsors = deptCalculator.calcBorrowersSponsors(expensePersons)

    fooSponsor = sponsors[0] # has to be ordered this way
    assert fooSponsor[1]['name'] == 'foo'
    assert fooSponsor[1]['amount'] == 10 - expectedMean
    assert fooSponsor[1]['some'] == 'attr'
    assert fooSponsor[1]['another'] == 'attr'

    bazSponsor = sponsors[1]
    assert bazSponsor[1]['name'] == 'baz'
    assert bazSponsor[1]['amount'] == 7.5 - expectedMean
    assert bazSponsor[1]['another'] == 'attr'
    assert bazSponsor[1]['yet'] == 'anotherattr'



def test_borrowers_calculation():
    foo, bar, baz, ping, pong = getExpensePersons()
    expensePersons = [foo, bar, baz, ping, pong]

    borrowers, sponsors = deptCalculator.calcBorrowersSponsors(expensePersons)
    
    pingBorrower = borrowers[0] # has to be ordered this way
    assert pingBorrower[1]['name'] == 'ping'
    assert pingBorrower[1]['amount'] == 0 - expectedMean
    assert pingBorrower[1]['some'] == 'attr'
    assert pingBorrower[1]['another'] == 'attr'
    assert pingBorrower[1]['yet'] == 'anotherattr'


    pongBorrower = borrowers[1]
    assert pongBorrower[1]['name'] == 'pong'
    assert pongBorrower[1]['amount'] == 2.5 - expectedMean
    assert pongBorrower[1]['some'] == 'attr'
    assert pongBorrower[1]['another'] == 'attr'
    assert pongBorrower[1]['yet'] == 'anotherattr'
