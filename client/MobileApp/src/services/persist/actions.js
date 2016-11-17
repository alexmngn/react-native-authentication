import * as actionTypes from './constants';

export const update = payload => ({
	type: actionTypes.UPDATE,
	payload,
});
