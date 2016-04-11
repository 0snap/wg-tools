import Dispatcher from '../dispatcher/Dispatcher.jsx';
import EventEmitter from 'events';
import assign from 'object-assign';
import { browserHistory } from 'react-router';

import Constants from '../constants/ExpenseConstants.jsx';

var _expenses = {};
var _depts = [];
var _wg;
var _expensesLists = [];
var _activeList;

function addExpense(id, name, amount, date, color) {
    //console.log("shall add ", id, name, amount, date);
    _expenses[id] = {
        name: name,
        amount: amount,
        date: date,
        id: id,
        color: color
    }
    //console.log(_expenses);
}


function deleteExpense(id) {
    delete _expenses[id];
}

function setExpenses(expenses) {
    // backend returns expenses as list. transform into a dict with keys:
    _expenses = {};
    expenses.forEach(exp => {
        _expenses[exp.id] = exp;
    });
}

function addExpensesList(id, name) {
    //console.log(id, name);
    _expensesLists.push({id: id, name: name});
    setActiveList(id);
}

function deleteExpensesList(id) {
    // console.log("delete", id);
    var removed = _expensesLists.filter(list => {
        return list.id != id
    });
    setExpensesLists(removed);
}

function setExpensesLists(expensesLists, listName) {
    _expensesLists = expensesLists;
    //console.log(expensesLists)
    if (listName) {
        setActiveList(getIdForListName(listName), listName);
    }
    else if (_expensesLists[0]) {
        setActiveList(_expensesLists[0].id);
    }

}


function setDepts(depts) {
    //console.log("storing" + depts);
    _depts = depts;
}

function setWg(wg) {
    _wg = wg;
}

function setActiveList(activeList, listName) {
    // console.log('set active ' + activeList)
    var name = listName? listName : getNameForListId(activeList);

    browserHistory.push('/app/' + name);
    _activeList = activeList;
}

function getIdForListName(listName) {
    var list = _expensesLists.filter(list => {
        return list.name == listName
    });
    return list[0]? list[0].id : undefined;
}

function getNameForListId(listId) {
    var list = _expensesLists.filter(list => {
        return list.id == listId
    });
    return list[0]? list[0].name : undefined
}

let ExpensesStore = assign({ }, EventEmitter.prototype, {

    emitChange(event) {
        this.emit(event);
    },

    toList(expenses) {
        let result = []
        for (var key in expenses) {
            result.push(expenses[key]);
        }
        return result;
    },

    getAllExpenses() {
        return this.toList(_expenses);
    },

    addEventListener(event, callback) {
        this.on(event, callback);
    },

    removeEventListener(event, callback) {
        this.removeListener(event, callback);
    },

    getDepts() {
        return _depts;
    },

    getWg() {
        return _wg;
    },

    getExpensesLists() {
        return _expensesLists;
    },

    getActiveList() {
        return _activeList;
    }
})

Dispatcher.register(function(action) {

    switch(action.actionType) {
        case(Constants.ADD_EXPENSE_POST):
            //console.log('shall add ', action.name, action.amount, action.date, action.id);
            addExpense(action.id, action.name, action.amount, action.date, action.color);
            ExpensesStore.emitChange(Constants.EXPENSE_POSTS_CHANGED);
            break;
        case(Constants.DELETE_EXPENSE_POST):
            //console.log('store delete');
            deleteExpense(action.id);
            ExpensesStore.emitChange(Constants.EXPENSE_POSTS_CHANGED);
            break;
        case(Constants.FETCH_EXPENSE_POSTS):
            //console.log('store all');
            setExpenses(action.expenses);
            ExpensesStore.emitChange(Constants.EXPENSE_POSTS_CHANGED);
            break;
        case(Constants.FETCH_DEPTS):
            //console.log('depts');
            setDepts(action.depts);
            ExpensesStore.emitChange(Constants.FETCH_DEPTS);
            break;
        case(Constants.FETCH_WGS):
            setWg(action.wg);
            ExpensesStore.emitChange(Constants.FETCH_WGS);
            break;
        case(Constants.ADD_EXPENSES_LIST):
            addExpensesList(action.id, action.name);
            ExpensesStore.emitChange(Constants.EXPENSES_LISTS_CHANGED);
            break;
        case(Constants.DELETE_EXPENSES_LIST):
            deleteExpensesList(action.id);
            ExpensesStore.emitChange(Constants.EXPENSES_LISTS_CHANGED);
            ExpensesStore.emitChange(Constants.ACTIVE_LIST_CHANGED);
            break;
        case(Constants.FETCH_EXPENSES_LISTS):
            setExpensesLists(action.expensesLists, action.listName);
            ExpensesStore.emitChange(Constants.EXPENSES_LISTS_CHANGED);
            ExpensesStore.emitChange(Constants.ACTIVE_LIST_CHANGED);
            break;
        case(Constants.ACTIVE_LIST):
            setActiveList(action.listId);
            ExpensesStore.emitChange(Constants.ACTIVE_LIST_CHANGED);
            break;
    }

})

module.exports = ExpensesStore
