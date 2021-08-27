const { endpointUrl } = window.epls;

/**
 * Get new search results from the API.
 *
 * @param {Object} args Query arguments.
 * @param {AbortSignal} signal An abort signal instance.
 * @return {Object} API response.
 */
export const getResults = async (args, signal) => {
	const query = new URLSearchParams(args);

	const data = await fetch(`${endpointUrl}?${query.toString()}`, {
		signal,
		headers: {
			Accept: 'application/json',
		},
	});

	const response = await data.json();

	return response;
};
