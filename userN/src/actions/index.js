import { LOGIN_APP, CHOOSE_THEME } from './types';

export const signIn = (token, code, name, room) => {
	return {
		type: LOGIN_APP,
		payload: { token, code, name, room }
	};
};

export const chooseTheme = num => {
	return {
		type: CHOOSE_THEME,
		payload: num
	};
};
