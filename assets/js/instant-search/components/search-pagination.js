import React, { useContext } from 'react';

import PaginationButton from './pagination-button';
import SearchContext from '../contexts/search';

/**
 * Search results component.
 *
 * @return {React.ReactElement} A React element.
 */
export default () => {
	const { state, dispatch } = useContext(SearchContext);

	const onNext = () => {
		dispatch({ type: 'NEXT_PAGE' });
	};

	const onPrevious = () => {
		dispatch({ type: 'PREVIOUS_PAGE' });
	};

	return (
		<nav className="ep-search-pagination">
			{state.totalResults > 0 && (
				<div role="region" aria-live="polite">
					<p>
						Viewing {state.query.from + 1} &mdash;{' '}
						{state.query.from + state.searchResults.length} of {state.totalResults}
					</p>
				</div>
			)}

			<PaginationButton
				direction="previous"
				onClick={onPrevious}
				disabled={state.query.from === 0}
			>
				Previous Page
			</PaginationButton>

			<PaginationButton
				direction="next"
				onClick={onNext}
				disabled={state.totalResults <= state.query.from + state.query.size}
			>
				Next Page
			</PaginationButton>
		</nav>
	);
};
