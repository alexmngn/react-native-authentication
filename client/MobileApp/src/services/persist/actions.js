import * as actionTypes from './actionTypes';

export const update = payload => ({
	type: actionTypes.UPDATE,
	payload,
});
