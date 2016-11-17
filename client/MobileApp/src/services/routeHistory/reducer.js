import * as actionTypes from './actionTypes';

const HISTORY_SIZE = 10;

export const initialState = {
	items: [],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PUSH:
			return {
				...state,
				items: [...state.items.slice(-HISTORY_SIZE), action.route],
			};
		default:
			return state;
	}
};
