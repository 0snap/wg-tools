var keyMirror = require('keymirror');

let Constants = keyMirror({
  ADD_EXPENSE_POST: null,
  DELETE_EXPENSE_POST: null,
  FETCH_EXPENSE_POSTS: null,
  EXPENSE_POSTS_CHANGED: null,
  ADD_EXPENSES_LIST: null,
  DELETE_EXPENSES_LIST: null,
  LOCK_EXPENSES_LIST: null,
  FETCH_EXPENSES_LISTS: null,
  EXPENSES_LISTS_CHANGED: null,
  ACTIVE_LIST_ID: null,
  ACTIVE_LIST_CHANGED: null,
  FETCH_DEPTS: null,
  FETCH_WGS: null
});

module.exports = Constants;