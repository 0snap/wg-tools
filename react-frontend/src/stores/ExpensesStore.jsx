import Dispatcher from '../dispatcher/Dispatcher.jsx';
import EventEmitter from 'events';
import assign from 'object-assign';

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

function overwriteAllExpenses(expenses) {
    // backend returns expenses as list. transform into a dict with keys:
    _expenses = {};
    expenses.forEach(exp => {
        _expenses[exp.id] = exp;
    });
}

function setDepts(depts) {
    //console.log("storing" + depts);
    _depts = depts;

}

function setWg(wg) {
    _wg = wg;
}

function setExpensesLists(expensesLists) {
    _expensesLists = expensesLists;
}

function setActiveList(activeList) {
    _activeList = activeList;
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
        case('add'):
            //console.log('shall add ', action.name, action.amount, action.date, action.id);
            addExpense(action.id, action.name, action.amount, action.date, action.color);
            ExpensesStore.emitChange('expense');
            break;

        case('delete'):
            //console.log('store delete');
            deleteExpense(action.id);
            ExpensesStore.emitChange('expense');
            break;

        case('overwriteAllExpenses'):
            //console.log('store all');
            overwriteAllExpenses(action.expenses);
            ExpensesStore.emitChange('expense');
            break;
        case('depts'):
            //console.log('depts');
            setDepts(action.depts);
            ExpensesStore.emitChange('depts');
            break;
        case('wgs'):
            setWg(action.wg);
            ExpensesStore.emitChange('wgs');
            break;
        case('expensesLists'):
            setExpensesLists(action.expensesLists);
            ExpensesStore.emitChange('expensesLists');
            break;
        case('activeList'):
            setActiveList(action.listId);
            ExpensesStore.emitChange('activeList');
            break;

    }

})

module.exports = ExpensesStore
