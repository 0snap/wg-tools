#!/usr/bin/python

import pytest # for exception testing
from decimal import *

import deptCalculator

###########################################

def getExpensePersons():
    # the mean of all expenses for this set of test items is 500 cents // 5 euro

    foo = {'name': 'foo', 'amount': Decimal('1000'), 'some': 'attr', 'another': 'attr'}
    bar = {'name': 'bar', 'amount': Decimal('500'), 'some': 'attr', 'another': 'attr', 'yet': 'anotherattr'}
    baz = {'name': 'baz', 'amount': Decimal('750'), 'another': 'attr', 'yet': 'anotherattr'}
    ping = {'name': 'ping', 'amount': Decimal('0'), 'some': 'attr', 'another': 'attr', 'yet': 'anotherattr'}
    pong = {'name': 'pong', 'amount': Decimal('250'), 'some': 'attr', 'another': 'attr', 'yet': 'anotherattr'}

    return foo, bar, baz, ping, pong

expectedMeanCents = 500

###########################################


def test_calculator_sanity():
    foo, bar, baz, ping, pong = getExpensePersons()

    # mean of foo and bar is 7.5
    expensePersons = [foo, bar]

    returnList = deptCalculator.calcDepts(expensePersons, Decimal('0'))
    paybackInstruction = returnList[0]

    expectedFoo = {'name': 'foo', 'some': 'attr', 'another': 'attr'}
    expectedBar = {'name': 'bar', 'some': 'attr', 'another': 'attr', 'yet': 'anotherattr'}


    assert paybackInstruction
    assert paybackInstruction['borrower'] == expectedBar
    assert paybackInstruction['sponsor'] == expectedFoo
    assert paybackInstruction['amount'] == 2.5


def test_calculator_sanity_with_dispenses():
    foo, bar, baz, ping, pong = getExpensePersons()

    # mean of foo(10) and bar(5) with 10€ dispense is (15-10)/2 = 2.5
    expensePersons = [foo, bar]

    returnList = deptCalculator.calcDepts(expensePersons, Decimal('1000'))
    paybackInstructions = returnList

    expectedDispense = {'name': 'Spende'}
    expectedFoo = {'name': 'foo', 'some': 'attr', 'another': 'attr'}
    expectedBar = {'name': 'bar', 'some': 'attr', 'another': 'attr', 'yet': 'anotherattr'}


    assert paybackInstructions
    assert paybackInstructions[0]['borrower'] == expectedDispense
    assert paybackInstructions[0]['sponsor'] == expectedFoo
    assert paybackInstructions[0]['amount'] == 7.5
    assert paybackInstructions[1]['borrower'] == expectedDispense
    assert paybackInstructions[1]['sponsor'] == expectedBar
    assert paybackInstructions[1]['amount'] == 2.5


def test_sponsors_borrowers_calculation_sanity():
    foo, bar, baz, ping, pong = getExpensePersons()
    expensePersons = [foo, bar, baz, ping, pong]

    borrowers, sponsors = deptCalculator.calcBorrowersSponsors(expensePersons, Decimal('0'))

    borrowerNames = [b[0] for b in borrowers]
    sponsorNames = [s[0] for s in sponsors]

    assert 'foo' in sponsorNames 
    assert 'baz' in sponsorNames
    assert 'ping' in borrowerNames
    assert 'pong' in borrowerNames
    assert 'bar' not in borrowerNames
    assert 'bar' not in sponsorNames


def test_sponsors_borrowers_calculation_sanity_with_dispenses():
    foo, bar, baz, ping, pong = getExpensePersons()
    expensePersons = [foo, bar, baz, ping, pong]

    borrowers, sponsors = deptCalculator.calcBorrowersSponsors(expensePersons, 1000)

    borrowerNames = [b[0] for b in borrowers]
    sponsorNames = [s[0] for s in sponsors]

    assert 'foo' in sponsorNames 
    assert 'bar' in sponsorNames
    assert 'baz' in sponsorNames
    assert 'ping' in borrowerNames
    assert 'pong' in borrowerNames


def test_make_even_sanity():
    b1 = ('b1', {'name':'b1', 'amount': Decimal(-5)})
    b2 = ('b2', {'name':'b2', 'amount': Decimal(-7)})
    b3 = ('b3', {'name':'b3', 'amount': Decimal(-9)})
    
    s1 = ('s1', {'name':'s1', 'amount': Decimal(1.5)})
    s2 = ('s2', {'name':'s2', 'amount': Decimal(3)})
    s3 = ('s3', {'name':'s3', 'amount': Decimal(16.5)})

    expectedResult = [{'borrower':{'name':'b3'},'amount': 9,'sponsor':{'name':'s3'}},
                {'borrower':{'name':'b2'},'amount': 3,'sponsor':{'name':'s2'}},
                {'borrower':{'name':'b1'},'amount': 1.5,'sponsor':{'name':'s1'}},
                {'borrower':{'name':'b2'},'amount': 4,'sponsor':{'name':'s3'}},
                {'borrower':{'name':'b1'},'amount': 3.5,'sponsor':{'name':'s3'}}]

    orderedBorrowers = [b3, b2, b1]
    orderedSponsors = [s3, s2, s1]

    result = deptCalculator.makeEven(orderedBorrowers, orderedSponsors, Decimal(0))
    #print(result)
    assert result == expectedResult

def test_make_even_sanity_with_failure():
    b1 = ('b1', {'name':'b1', 'amount': Decimal(-5)})
    s1 = ('s1', {'name':'s1', 'amount': Decimal(1.5)})

    invalidBorrowers = [b1]
    invalidSponsors = [s1]

    with pytest.raises(ValueError):
        deptCalculator.makeEven(invalidBorrowers, invalidSponsors, Decimal(0))

def test_make_even_sanity_with_dispenses():
    b1 = ('b1', {'name':'b1', 'amount': Decimal(-4)})
    b2 = ('b2', {'name':'b2', 'amount': Decimal(-6)})
    b3 = ('b3', {'name':'b3', 'amount': Decimal(-8)})
    
    s1 = ('s1', {'name':'s1', 'amount': Decimal(2.5)})
    s2 = ('s2', {'name':'s2', 'amount': Decimal(5)})
    s3 = ('s3', {'name':'s3', 'amount': Decimal(16.5)})

    expectedResult = [{'borrower':{'name':'Spende'},'amount': 6,'sponsor':{'name':'s3'}},
                {'borrower':{'name':'b3'},'amount': 5,'sponsor':{'name':'s2'}},
                {'borrower':{'name':'b2'},'amount': 2.5,'sponsor':{'name':'s1'}},
                {'borrower':{'name':'b1'},'amount': 4,'sponsor':{'name':'s3'}},
                {'borrower':{'name':'b3'},'amount': 3,'sponsor':{'name':'s3'}},
                {'borrower':{'name':'b2'},'amount': 3.5,'sponsor':{'name':'s3'}}]

    orderedBorrowers = [b3, b2, b1]
    orderedSponsors = [s3, s2, s1]

    result = deptCalculator.makeEven(orderedBorrowers, orderedSponsors, Decimal('6'))
    #print(result)
    assert result == expectedResult


def test_sponsors_calculation():
    foo, bar, baz, ping, pong = getExpensePersons()
    expensePersons = [foo, bar, baz, ping, pong]

    # results are ordered
    borrowers, sponsors = deptCalculator.calcBorrowersSponsors(expensePersons, Decimal('0'))

    fooSponsor = sponsors[0] # has to be ordered this way
    assert fooSponsor[1]['name'] == 'foo'
    assert fooSponsor[1]['amount'] == 1000 - expectedMeanCents
    assert fooSponsor[1]['some'] == 'attr'
    assert fooSponsor[1]['another'] == 'attr'

    bazSponsor = sponsors[1]
    assert bazSponsor[1]['name'] == 'baz'
    assert bazSponsor[1]['amount'] == 750 - expectedMeanCents
    assert bazSponsor[1]['another'] == 'attr'
    assert bazSponsor[1]['yet'] == 'anotherattr'



def test_borrowers_calculation():
    foo, bar, baz, ping, pong = getExpensePersons()
    expensePersons = [foo, bar, baz, ping, pong]

    borrowers, sponsors = deptCalculator.calcBorrowersSponsors(expensePersons, Decimal('0'))
    
    pingBorrower = borrowers[0] # has to be ordered this way
    assert pingBorrower[1]['name'] == 'ping'
    assert pingBorrower[1]['amount'] == 0 - expectedMeanCents
    assert pingBorrower[1]['some'] == 'attr'
    assert pingBorrower[1]['another'] == 'attr'
    assert pingBorrower[1]['yet'] == 'anotherattr'


    pongBorrower = borrowers[1]
    assert pongBorrower[1]['name'] == 'pong'
    assert pongBorrower[1]['amount'] == 250 - expectedMeanCents
    assert pongBorrower[1]['some'] == 'attr'
    assert pongBorrower[1]['another'] == 'attr'
    assert pongBorrower[1]['yet'] == 'anotherattr'
