var keyMirror = require('keymirror');

let Constants = keyMirror({
  ADD_EXPENSE_POST: 'addExpense',
  DELETE_EXPENSE_POST: 'deleteExpense',
  FETCH_EXPENSE_POSTS: 'fetchExpenses',
  EXPENSE_POSTS_CHANGED: 'expenses',
  ADD_EXPENSES_LIST: 'addExpensesList',
  DELETE_EXPENSES_LIST: 'deleteExpensesList',
  FETCH_EXPENSES_LISTS: 'fetchLists',
  EXPENSES_LISTS_CHANGED: 'expensesLists',
  ACTIVE_LIST: 'activeList',
  FETCH_DEPTS: 'depts',
  FETCH_WGS: 'wgs'
});

module.exports = Constants;