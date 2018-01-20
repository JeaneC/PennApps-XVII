const apiKey = 'ytEtvRpH9_92it2PoN35';
import { LOGIN_APP, CHOOSE_THEME } from '../actions/types';
import { BLUEPURPLE, GREENBLUE, PINKORANGE } from '../common/constants';

const SessionDefaultState = {
	token: null,
	code: null,
	name: null,
	room: null,
	theme: BLUEPURPLE
};

export default (state = SessionDefaultState, action) => {
	switch (action.type) {
		case LOGIN_APP:
			return {
				...state,
				token: action.payload.token,
				code: action.payload.code,
				name: action.payload.name,
				room: action.payload.room
			};
		case CHOOSE_THEME:
			let theme = BLUEPURPLE;
			if (action.payload == 2) {
				theme = PINKORANGE;
			} else if (action.payload == 3) {
				theme = GREENBLUE;
			}

			return { ...state, theme };
		default:
			return state;
	}
};
