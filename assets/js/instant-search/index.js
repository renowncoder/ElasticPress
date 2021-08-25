import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';

import { InitialState, SearchReducer } from './reducers/search';
import { getResults } from './services/search';
import SearchContext from './contexts/search';
import SearchDialog from './components/search-dialog';

/**
 * Instant Search.
 *
 * @return {React.ReactElement} A React element.
 */
const App = () => {
	const [state, dispatch] = useReducer(SearchReducer, InitialState);
	const abortRequestRef = useRef(new AbortController());
	const searchRequestRef = useRef();
	const inputRef = useRef();

	/**
	 * Handle submitting the search form.
	 *
	 * @param {*} event Input event.
	 */
	const onSubmit = (event) => {
		event.preventDefault();

		inputRef.current = event.target.s;

		dispatch({ type: 'NEW_SEARCH_TERM', payload: event.target.s.value });
	};

	/**
	 * Bind input events to search fields.
	 *
	 * @return {Function} A cleanup function that unbinds the events.
	 */
	const bindInputEvents = () => {
		const inputs = document.querySelectorAll('input[type="search"');

		inputs.forEach((input) => {
			input.form.addEventListener('submit', onSubmit);
		});

		return () => {
			inputs.forEach((input) => {
				input.form.removeEventListener('submit', onSubmit);
			});
		};
	};

	/**
	 * Query new search results.
	 */
	const doSearch = useCallback(() => {
		/**
		 * Abort any requests in progress.
		 */
		abortRequestRef.current.abort();
		abortRequestRef.current = new AbortController();

		/**
		 * Start new search request.
		 */
		dispatch({ type: 'START_LOADING' });

		searchRequestRef.current = getResults(state.query, abortRequestRef.current.signal)
			.then(
				/**
				 * Update search results and stop loading.
				 *
				 * @param {Object} response Search results.
				 */
				(response) => {
					dispatch({ type: 'NEW_SEARCH_RESULTS', payload: response });
					dispatch({ type: 'FINISH_LOADING' });
				},
			)
			.catch(
				/**
				 * Handle errors.
				 *
				 * @param {Object} error Error object.
				 */
				(error) => {
					/**
					 * Stop loading, but only if the error is an not abort error returned after a
					 * new request has been started.
					 */
					if (error?.name !== 'AbortError' && !searchRequestRef.current) {
						dispatch({ type: 'FINISH_LOADING' });
					}
				},
			)
			.finally(
				/**
				 * Update ref to false when no request is in progress.
				 */
				() => {
					searchRequestRef.current = false;
				},
			);
	}, [state.query]);

	/**
	 * Handle a change to the search term.
	 */
	const handleSearch = () => {
		/**
		 * Keep the triggering input in sync with what's happening.
		 */
		if (inputRef.current) {
			inputRef.current.value = state.query.search;
		}

		doSearch();
	};

	/**
	 * Handle a change to the pagination.
	 */
	const handlePagination = () => {
		doSearch();
	};

	/**
	 * Effects.
	 */
	useEffect(bindInputEvents, []);
	useEffect(handleSearch, [state.query.search, doSearch]);
	useEffect(handlePagination, [state.query.from, doSearch]);

	return (
		<SearchContext.Provider value={{ state, dispatch }}>
			<SearchDialog />
		</SearchContext.Provider>
	);
};

ReactDOM.render(<App />, document.getElementById('ep-search-modal-root'));
