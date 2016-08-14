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
	let listReference = expensesLists.filter(list => {
        return list.name == listName
    })[0];
	return Object.assign({}, listReference) || {};
}

function removeFrom(expensesLists, toRemoveName) {
	let listsClone = expensesLists.copyWithin();
	return listsClone.filter(list => { return list.name != toRemoveName });
}

export default function expensesLists(state = initialState, action) {
	switch(action.type) {
		case Constants.ADD_EXPENSES_LIST_SUCCESS:
			return Object.assign({}, state, {
				expensesLists: concat(action.storedList, state.expensesLists.slice(0)),
				storeError: false
			});
		case Constants.ADD_EXPENSES_LIST_ERROR:
			return Object.assign({}, state, {
				storeError: true
			});
		case Constants.DELETE_EXPENSES_LIST_SUCCESS:
			let removed = removeFrom(state.expensesLists, action.deletedName);
			return Object.assign({}, state, {
				expensesLists: removed,
				activeList: removed[0] || {},
				deleteError: false
			});
		case Constants.DELETE_EXPENSES_LIST_ERROR:
			return Object.assign({}, state, {
				deleteError: true
			});
		case Constants.LOCK_EXPENSES_LIST_SUCCESS:
			let lockedList = getListForName(action.lockedName, state.expensesLists);
			let listsWithoutLocked = removeFrom(state.expensesLists, action.lockedName);
			lockedList.editable = false;
			return Object.assign({}, state, {
				expensesLists: concat(listsWithoutLocked, lockedList),
				activeList: lockedList,
				lockError: false
			});
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
		case Constants.SET_DISPENSES_SUCCESS:
			let editedList = getListForName(state.activeList.name, state.expensesLists);
			let listsWithoutEdited = removeFrom(state.expensesLists, state.activeList.name);
			editedList.dispenses = action.dispenseAmount;
			return Object.assign({}, state, {
				expensesLists: concat(editedList, listsWithoutEdited),
				activeList: editedList,
				setDispensesError: false
			});
		case Constants.SET_DISPENSES_ERROR:
			return Object.assign({}, state, {
				setDispensesError: true
			});
		case Constants.ACTIVE_LIST_NAME:
			if (action.listName != '') {
				// if not explicitly wanted to unset..
				let newActiveList = getListForName(action.listName, state.expensesLists);
				let setActiveError = newActiveList.name? false : true;
				return Object.assign({}, state, {
					activeList: newActiveList,
					setActiveListError: setActiveError
				});
			}
			else {
				return Object.assign({}, state, {
					activeList: {},
					setActiveListError: false
				});
			}
		default:
			return state
	}
}