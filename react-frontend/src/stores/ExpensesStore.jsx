import Dispatcher from '../dispatcher/Dispatcher.jsx';
import EventEmitter from 'events';
import assign from 'object-assign';

var _expenses = {};

function addExpense(name, amount, date) {
    //console.log("shall add ", name, amount, date);
    _expenses[date] = {
        name: name,
        amount: amount,
        date: date
    }
    //console.log(_expenses);
}


function deleteExpense(date) {
    delete _expenses[date];
}

function overwriteAll(expenses) {
    // backend returns expenses as list. transform into a dict with keys:
    _expenses = {};
    expenses.forEach(exp => {
        _expenses[exp.date] = exp;
    });
    //console.log(_expenses);
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
    }
})

Dispatcher.register(function(action) {

    switch(action.actionType) {
        case('add'):
            //console.log('store add');
            //console.log('shall add ', action.name, action.amount, action.date);
            addExpense(action.name, action.amount, action.date);
            ExpensesStore.emitChange();
            break;

        case('delete'):
            //console.log('store delete');
            deleteExpense(action.date);
            ExpensesStore.emitChange();
            break;

        case('overwriteAll'):
            //console.log('store all');
            overwriteAll(action.expenses);
            ExpensesStore.emitChange();
            break;
    }

})

module.exports = ExpensesStore
