export const InitialState = {
	dialog: false,
	isLoading: false,
	query: {
		search: '',
		from: 0,
		size: 6,
	},
	searchResults: [],
	totalResults: 0,
};

/**
 * Reducer function for handling search state changes.
 *
 * @param {Object} state The current state.
 * @param {Object} action Action data.
 * @param {string} action.type The action name.
 * @param {Object} action.payload New state data from the action.
 * @return {Object} Updated state.
 */
export const SearchReducer = (state, action) => {
	switch (action.type) {
		case 'NEW_SEARCH_TERM':
			return {
				...state,
				dialog: !state.dialog,
				query: {
					...state.query,
					from: 0,
					search: action.payload,
				},
			};
		case 'NEW_SEARCH_RESULTS':
			return {
				...state,
				searchResults: action.payload.hits.hits,
				totalResults: action.payload.hits.total,
			};
		case 'NEXT_PAGE':
			return {
				...state,
				query: {
					...state.query,
					from: state.query.from + state.query.size,
				},
			};
		case 'PREVIOUS_PAGE':
			return {
				...state,
				query: {
					...state.query,
					from: Math.max(state.query.from - state.query.size, 0),
				},
			};
		case 'START_LOADING':
			return {
				...state,
				isLoading: true,
			};
		case 'FINISH_LOADING':
			return {
				...state,
				isLoading: false,
			};
		default:
			return state;
	}
};
