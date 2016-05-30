import Constants from '../constants/ExpenseConstants.jsx';
import concat from 'lodash/concat';

const initialState = {
	expensesLists: [],
	activeList: {},
	storeError: false,
	deleteError: false,
	lockError: false,
	fetchError: false,
	setDispensesError: false,
	setActiveListError: false
}

function getListForName(listName, expensesLists) {
    return expensesLists.filter(list => {
        return list.name == listName
    })[0];
}

function getListForId(listId, expensesLists) {
    return expensesLists.filter(list => {
        return list.id == listId
    })[0];
}

export default function expensesLists(state = initialState, action) {
	switch(action.type) {
		case Constants.ADD_EXPENSES_LIST_SUCCESS:
			return Object.assign({}, state, {
				expensesLists: concat(state.expensesLists, action.storedList),
				storeError: false
			});
		case Constants.ADD_EXPENSES_LIST_ERROR:
			return Object.assign({}, state, {
				storeError: true
			});
		case Constants.DELETE_EXPENSES_LIST_SUCCESS:
			let removed = state.expensesLists.filter(list => {return list.id != action.deletedId})
			return Object.assign({}, state, {
				expensesLists: removed,
				activeList: removed[0],
				deleteError: false
			});
		case Constants.DELETE_EXPENSES_LIST_ERROR:
			return Object.assign({}, state, {
				deleteError: true
			});
		case Constants.LOCK_EXPENSES_LIST_SUCCESS:
			let lockedList = getListForId(action.lockedId, state.expensesLists);
			lockedList.editable = false;
			let listsWithoutLocked = state.expensesLists.filter(list => {return list.id != action.lockedId});
			listsWithoutLocked.push(lockedList);
			return Object.assign({}, state, {
				expensesLists: listsWithoutLocked,
				lockError: false
			});
		case Constants.LOCK_EXPENSES_LIST_ERROR:
			return Object.assign({}, state, {
				lockError: true
			});
		case Constants.FETCH_EXPENSES_LISTS_SUCCESS:
			return Object.assign({}, state, {
				expensesLists: action.expensesLists,
				fetchError: false
			});
		case Constants.FETCH_EXPENSES_LISTS_ERROR:
			return Object.assign({}, state, {
				fetchError: true
			});
		case Constants.SET_DISPENSES_SUCCESS:
			activeList.dispenses = action.dispenseAmount;
	        getListForId(activeList.id, state.expensesLists).dispenses = action.dispenseAmount;
			return Object.assign({}, state, {
				expensesLists: expensesLists,
				activeList: activeList,
				setDispensesError: false
			});
		case Constants.SET_DISPENSES_ERROR:
			return Object.assign({}, state, {
				setDispensesError: true
			});
		case Constants.ACTIVE_LIST_ID:
			return Object.assign({}, state, {
				activeList: getListForId(action.listId, state.expensesLists)
			});
		case Constants.ACTIVE_LIST_NAME:
			return Object.assign({}, state, {
				activeList: getListForName(action.listName, state.expensesLists)
			});
		default:
			return state
	}
}