import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { goto } from '$app/navigation';
import { PUBLIC_API_HOST } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch, params, url }) => {
	const route = url.searchParams.get('redirect');

	const res = await fetch(`${PUBLIC_API_HOST}/api/posts/${params.id}`);

	if (!res.ok) {
		throw error(500, "Couldn't fetch post");
	}

	const post = await res.json();

	if (!post.published) {
		throw goto('/');
	}

	return { post, previous_route: route || '/' };
};

export const actions: Actions = {
	default: async (event) => {
		// Extract the form data from the request
		const formData = await event.request.formData();
		const formType = formData.get('formType') as string;
		const comment = formData.get('comment') as string;

		if (!comment) {
			return fail(400, {
				comment,
				error: 'Missing comment content'
			});
		}

		try {
			if (formType == 'comment') {
				const response = await fetch(
					`${PUBLIC_API_HOST}/api/posts/${event.params.id}/comments`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${event.cookies.get('jwt')}`
						},
						body: JSON.stringify({ content: comment })
					}
				);

				if (!response.ok) {
					const errorText = await response.json();
					console.error('Error:', errorText);
					return { comment, status: response.status, error: errorText.message };
				}
			} else if (formType == 'reply') {
				const parentId = formData.get('parentId') as string;

				const response = await fetch(`${PUBLIC_API_HOST}/api/comments/${parentId}`, {
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
			}
		} catch (err) {
			console.error(err);
			return fail(500, { comment, error: 'Failed to post comment. Please try again.' });
		}
	}
};
