import { combineReducers } from 'redux';

import session from './LoginReducer.js';
import expensePosts from './ExpensePostReducer.js';
import expensesLists from './ExpensesListReducer.js';
import depts from './DeptsReducer.js';

const rootReducer = combineReducers({
	session,
	expensePosts,
	expensesLists,
	depts
});

export default rootReducer;