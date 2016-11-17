import * as actionTypes from './constants';

export const initialState = {
	isHydrated: false,
};


export function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.UPDATE:
			return action.payload;
		default:
			return state;
	}
}
