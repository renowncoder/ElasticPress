import React from 'react';

/**
 * Pagination button component.
 *
 * @param {Object} props Component props.
 * @return {React.ReactElement} A React element.
 */
export default (props) => {
	const { children, direction, disabled, onClick } = props;

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={`ep-navigation-button ep-navigation-button--${direction}`}
		>
			{children}
		</button>
	);
};
