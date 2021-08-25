import React, { useContext } from 'react';

import SearchContext from '../contexts/search';

/**
 * Search field component.
 *
 * @return {React.ReactElement} A React element.
 */
export default () => {
	const { state, dispatch } = useContext(SearchContext);

	/**
	 * Handle input changes.
	 *
	 * @param {Event} event Change event.
	 */
	const handleChange = (event) => {
		dispatch({ type: 'NEW_SEARCH_TERM', payload: event.target.value });
	};

	return (
		<input
			type="search"
			value={state.query.search}
			onChange={handleChange}
			/* eslint-disable react/no-unknown-property */
			autofocus="true"
		/>
	);
};
