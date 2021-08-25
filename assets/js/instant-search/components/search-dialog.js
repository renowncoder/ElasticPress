import React, { useContext, useEffect, useRef } from 'react';
import { A11yDialog } from 'react-a11y-dialog';

import SearchContext from '../contexts/search';
import SearchPage from './search-page';

/**
 * Search dialog.
 *
 * @return {React.ReactElement} A React element.
 */
export default () => {
	const { state } = useContext(SearchContext);
	const dialogRef = useRef();

	/**
	 * Set dialogRef to the ref passed from A11yDialog.
	 *
	 * @param {Object} dialog Dialog ref.
	 */
	const setDialogRef = (dialog) => {
		dialogRef.current = dialog;
	};

	/**
	 * Open the model when the search term changes.
	 */
	const handleDialog = () => {
		if (dialogRef.current) {
			dialogRef.current.show();
		}
	};

	/**
	 * Effects.
	 */
	useEffect(handleDialog, [state.dialog]);

	return (
		<A11yDialog
			id="ep-search-modal"
			title="Search"
			dialogRef={setDialogRef}
			classNames={{
				container: 'dialog-container',
				overlay: 'dialog-overlay',
				dialog: 'dialog-content',
				title: 'dialog-title',
				closeButton: 'dialog-close',
			}}
		>
			<SearchPage />
		</A11yDialog>
	);
};
