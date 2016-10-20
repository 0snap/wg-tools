import Constants from '../constants/ExpenseConstants.jsx';
import concat from 'lodash/concat';

const initialState = {
	expensesLists: [],
	activeList: undefined,
	storeError: false,
	deleteError: false,
	lockError: false,
	fetchError: false,
	setDispensesError: false,
	setActiveListError: false
};

function removeFrom(expensesLists, toRemoveName) {
	let listsClone = expensesLists.copyWithin();
	return listsClone.filter(list => { return list != toRemoveName; });
}

export default function expensesLists(state = initialState, action) {
	switch(action.type) {
	case Constants.ADD_EXPENSES_LIST_SUCCESS: {
		let expLists = concat(action.storedList.name, state.expensesLists.slice(0));
			// remove duplicate entries
		expLists = expLists.filter((name, idx) => { return expLists.indexOf(name) == idx; });
		return Object.assign({}, state, {
			expensesLists: expLists,
			activeList: action.storedList,
			storeError: false
		});
	}
	case Constants.ADD_EXPENSES_LIST_ERROR:
		return Object.assign({}, state, {
			storeError: true
		});
	case Constants.DELETE_EXPENSES_LIST_SUCCESS:
		return Object.assign({}, state, {
			expensesLists: removeFrom(state.expensesLists, action.deletedName),
			activeList: initialState.activeList,
			deleteError: false
		});
	case Constants.DELETE_EXPENSES_LIST_ERROR:
		return Object.assign({}, state, {
			deleteError: true
		});
	case Constants.LOCK_EXPENSES_LIST_SUCCESS: {
		let lockedList = Object.assign({}, state.activeList);
		lockedList.editable = false;
		return Object.assign({}, state, {
			activeList: lockedList,
			lockError: false
		});
	}
	case Constants.LOCK_EXPENSES_LIST_ERROR:
		return Object.assign({}, state, {
			lockError: true
		});
	case Constants.FETCH_EXPENSES_LISTS_SUCCESS:
		return Object.assign({}, state, {
			expensesLists: action.expensesLists.reverse(),
			fetchError: false
		});
	case Constants.FETCH_EXPENSES_LISTS_ERROR:
		return Object.assign({}, state, {
			fetchError: true
		});
	case Constants.SET_DISPENSES_SUCCESS: {
		let editedList = Object.assign({}, state.activeList);
		editedList.dispenses = action.dispenseAmount;
		return Object.assign({}, state, {
			activeList: editedList,
			setDispensesError: false
		});
	}
	case Constants.SET_DISPENSES_ERROR:
		return Object.assign({}, state, {
			setDispensesError: true
		});
	case Constants.ACTIVE_LIST_SUCCESS:
		return Object.assign({}, state, {
			activeList: action.activeList,
			setActiveListError: false
		});
	case Constants.ACTIVE_LIST_ERROR:
		return Object.assign({}, state, {
			activeList: initialState.activeList,
			setActiveListError: true
		});
	default:
		return state;
	}
}