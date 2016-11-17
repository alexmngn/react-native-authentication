import * as actionTypes from './actionTypes';

const initialState = {
	items: {},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {
				items: {
					...state.items,
					...action.items.reduce((prev, curr) => ({
						...prev,
						[curr.id]: curr,
					}), {}),
				},
			};
		case actionTypes.EMPTY:
			return {
				items: {},
			};
		default:
			return state;
	}
};
