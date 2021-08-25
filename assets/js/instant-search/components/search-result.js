import React from 'react';
import DOMPurify from 'dompurify';

/**
 * Search result.
 *
 * @param {Object} props Component props.
 * @return {React.ReactElement} A React element.
 */
export default (props) => {
	const { result } = props;

	const postTitle = DOMPurify.sanitize(result.highlight?.post_title);
	const postContent = DOMPurify.sanitize(result.highlight?.post_content?.join(' … '));

	return (
		<article className="ep-search-result">
			<h2 className="ep-search-result__title">
				{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
				<a
					href={result._source.permalink}
					/* eslint-disable-next-line react/no-danger */
					dangerouslySetInnerHTML={{ __html: postTitle }}
				/>
			</h2>

			<p
				className="ep-search-result__description"
				/* eslint-disable-next-line react/no-danger */
				dangerouslySetInnerHTML={{ __html: postContent }}
			/>
		</article>
	);
};
