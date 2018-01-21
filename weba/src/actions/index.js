// These are all action generators
export const login = (userName, uid, code) => ({
	type: 'login_app',
	payload: { userName, uid, code }
});
