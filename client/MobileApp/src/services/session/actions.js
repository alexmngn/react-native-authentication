import * as actionTypes from './actionTypes';

export const update = session => ({
	type: actionTypes.UPDATE,
	session,
});
