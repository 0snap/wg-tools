import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import session from './LoginReducer.js';
import expensePosts from './ExpensePostReducer.js';
import expensesLists from './ExpensesListReducer.js';
import depts from './DeptsReducer.js';

const rootReducer = combineReducers({
	session,
	expensePosts,
	expensesLists,
	depts,
	routing
});

export default rootReducer;