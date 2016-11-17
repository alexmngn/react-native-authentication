import * as actionTypes from './actionTypes';

export const push = route => ({
	type: actionTypes.PUSH,
	route,
});
