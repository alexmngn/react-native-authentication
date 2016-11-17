import store from 'MobileApp/src/store';

import * as api from './api';
import * as selectors from './selectors';
import * as actionCreators from './actions';
import { initialState } from './reducer';

const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

const setSessionTimeout = (duration) => {
	clearTimeout(sessionTimeout);
	sessionTimeout = setTimeout(
		refreshToken, // eslint-disable-line no-use-before-define
		(duration - SESSION_TIMEOUT_THRESHOLD) * 1000
	);
};

const clearSession = () => {
	clearTimeout(sessionTimeout);
	store.dispatch(actionCreators.update(initialState));
};

const onRequestSuccess = (response) => {
	const tokens = response.tokens.reduce((prev, item) => ({
		...prev,
		[item.type]: item,
	}), {});
	store.dispatch(actionCreators.update({ tokens, user: response.user }));
	setSessionTimeout(tokens.access.expiresIn);
};

const onRequestFailed = (exception) => {
	clearSession();
	throw exception;
};

export const refreshToken = () => {
	const session = selectors.get();

	if (!session.tokens.refresh.value || !session.user.id) {
		return Promise.reject();
	}

	return api.refresh(session.tokens.refresh, session.user)
	.then(onRequestSuccess)
	.catch(onRequestFailed);
};

export const authenticate = (email, password) =>
	api.authenticate(email, password)
	.then(onRequestSuccess)
	.catch(onRequestFailed);

export const revoke = () => {
	const session = selectors.get();
	return api.revoke(Object.keys(session.tokens).map(tokenKey => ({
		type: session.tokens[tokenKey].type,
		value: session.tokens[tokenKey].value,
	})))
	.then(clearSession())
	.catch(() => {});
};
