const SessionReducerDefaultState = {
	userName: null,
	uid: null,
	code: null
};
export default (state = SessionReducerDefaultState, action) => {
	switch (action.type) {
		case 'login_app':
			return {
				...state,
				userName: action.payload.userName,
				uid: action.payload.uid,
				code: action.payload.code
			};
		default:
			return state;
	}
};
