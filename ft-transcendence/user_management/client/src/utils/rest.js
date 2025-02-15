import ky from 'https://esm.sh/ky@1';

const rest = ky.extend({
	mode: 'same-origin',
	timeout: 30_000,
	hooks: {
		afterResponse: [
			async (request, options, response) => {
				if (response.status === 401) {
					location.assign(
						'/login?next=' + encodeURIComponent(location.pathname)
					);
				}
			},
		],
	},
});

const getMe = (options = {}) => {
	return rest.get('/user/me', options).json();
};

const postProfilePicture = (picture, options = {}) => {
	return rest.post('/api/upload-profile-picture/', {
		body: picture,
		headers: {
			'X-CSRFToken': options.csrftoken, // Add CSRF token if needed
		},
	});
};

export { rest, getMe, postProfilePicture };
