import React, { useContext } from 'react';

import SearchContext from '../contexts/search';
import SearchResult from './search-result';

/**
 * Search results component.
 *
 * @return {React.ReactElement} A React element.
 */
export default () => {
	const { state } = useContext(SearchContext);

	return (
		<div>
			<h1>Searching for “{state.query.search}”</h1>

			{state.searchResults.length > 0 && <p>Found {state.totalResults} results.</p>}

			{state.searchResults.map((result) => (
				<SearchResult key={result._id} result={result} />
			))}
		</div>
	);
};
