import React from 'react';

import SearchField from './search-field';
import SearchPagination from './search-pagination';
import SearchResults from './search-results';

/**
 * Search dialog.
 *
 * @return {React.ReactElement} A React element.
 */
export default () => {
	return (
		<section className="ep-search-page" tabIndex="-1">
			<aside className="ep-search-page__sidebar">
				<SearchField />
			</aside>

			<div className="ep-search-page__contents">
				<SearchResults />
			</div>

			<footer className="ep-search-page__footer">
				<SearchPagination />
			</footer>
		</section>
	);
};
