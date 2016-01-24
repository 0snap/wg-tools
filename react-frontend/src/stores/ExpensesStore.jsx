import Dispatcher from '../dispatcher/Dispatcher.jsx';
import EventEmitter from 'events';
import assign from 'object-assign';

var _expenses = {};
var _depts = [];

function addExpense(id, name, amount, date) {
    //console.log("shall add ", id, name, amount, date);
    _expenses[id] = {
        name: name,
        amount: amount,
        date: date,
        id: id
    }
    //console.log(_expenses);
}


function deleteExpense(id) {
    delete _expenses[id];
}

function overwriteAll(expenses) {
    // backend returns expenses as list. transform into a dict with keys:
    _expenses = {};
    expenses.forEach(exp => {
        _expenses[exp.id] = exp;
    });
    //console.log(_expenses);
}

function storeDepts(depts) {
    //console.log("storing" + depts);
    _depts = depts;

}

let ExpensesStore = assign({ }, EventEmitter.prototype, {

    emitChange() {
        this.emit('change');
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

    addChangeListener(callback) {
        this.on('change', callback);
    },

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    },

    getDepts() {
        return _depts;
    }
})

Dispatcher.register(function(action) {

    switch(action.actionType) {
        case('add'):
            //console.log('shall add ', action.name, action.amount, action.date, action.id);
            addExpense(action.id, action.name, action.amount, action.date);
            ExpensesStore.emitChange();
            break;

        case('delete'):
            //console.log('store delete');
            deleteExpense(action.id);
            ExpensesStore.emitChange();
            break;

        case('overwriteAll'):
            //console.log('store all');
            overwriteAll(action.expenses);
            ExpensesStore.emitChange();
            break;
        case('depts'):
            //console.log('depts');
            storeDepts(action.depts);
            ExpensesStore.emitChange();
            break;
    }

})

module.exports = ExpensesStore
