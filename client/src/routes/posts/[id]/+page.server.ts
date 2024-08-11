import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { goto } from '$app/navigation';

export const load: PageServerLoad = async ({ fetch, params, request, url }) => {
	const referer = request.headers.get('referer'); // Get the previous route
	let refererPath = null;

	if (referer) {
		const refererUrl = new URL(referer);
		refererPath = refererUrl.pathname + refererUrl.search + refererUrl.hash;
	}

	let route = refererPath;

	if (refererPath === url.pathname || !refererPath) {
		route = '/';
	}

	console.log('Previous route:', refererPath);

	const res = await fetch(`http://localhost:3000/api/posts/${params.id}`);

	if (!res.ok) {
		throw error(500, "Couldn't fetch post");
	}

	const post = await res.json();

	if (!post.published) {
		throw goto('/');
	}

	return { post, previous_route: route };
};

export const actions: Actions = {
	default: async (event) => {
		// Extract the form data from the request
		const formData = await event.request.formData();
		const comment = formData.get('comment') as string;

		if (!comment) {
			return fail(400, {
				comment,
				error: 'Missing comment content'
			});
		}

		try {
			const response = await fetch(`http://localhost:3000/api/posts/${event.params.id}/comments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${event.cookies.get('jwt')}`
				},
				body: JSON.stringify({ content: comment })
			});

			if (!response.ok) {
				const errorText = await response.json();
				console.error('Error:', errorText);
				return { comment, status: response.status, error: errorText.message };
			}
		} catch (err) {
			console.error(err);
			return fail(500, { comment, error: 'Failed to post comment. Please try again.' });
		}
	}
};
