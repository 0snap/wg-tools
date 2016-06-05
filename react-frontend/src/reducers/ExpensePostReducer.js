import Constants from '../constants/ExpenseConstants.jsx';

const initialState = {
	expensePosts: {},
	storeError: false,
	deleteError: false,
	fetchError: false
}

export default function expensePosts(state = initialState, action) {
	switch(action.type) {
		case Constants.ADD_EXPENSE_POST_SUCCESS:
			state.expensePosts[action.expensePost.id] = action.expensePost
			return Object.assign({}, state, {
				expensePosts: state.expensePosts,
				storeError: false
			});
		case Constants.ADD_EXPENSE_POST_ERROR:
			return Object.assign({}, state, {
				storeError: true
			});
		case Constants.DELETE_EXPENSE_POST_SUCCESS:
			delete state.expensePosts[action.postId]
			return Object.assign({}, state, {
				expensePosts: state.expensePosts,
				deleteError: false
			});
		case Constants.DELETE_EXPENSE_POST_ERROR:
			return Object.assign({}, state, {
				deleteError: true
			});
		case Constants.FETCH_EXPENSE_POSTS_SUCCESS:
			let posts = {};
			action.expensePosts.forEach(exp => {
				posts[exp.id] = exp;
			});
			return Object.assign({}, state, {
				expensePosts: posts,
				fetchError: false
			});
		case Constants.FETCH_EXPENSE_POSTS_ERROR:
			return Object.assign({}, state, {
				fetchError: true
			});
		default:
			return state
	}
}