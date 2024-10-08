import { PUBLIC_API_HOST } from '$env/static/public';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, params, url, fetch }) => {
	const commentId = params.id;

	// Extract the content and redirectTo query parameters from the URL
	const content = url.searchParams.get('content');
	const redirectTo = url.searchParams.get('redirect');

	if (!content) {
		return new Response(JSON.stringify({ error: 'Content is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		// Make a PUT request to your REST API to update the comment
		const response = await fetch(`${PUBLIC_API_HOST}/api/comments/${commentId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies.get('jwt')}`
			},
			body: JSON.stringify({ content })
		});

		if (!response.ok) {
			const errorText = await response.json();
			return new Response(JSON.stringify({ error: errorText.message }), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (err) {
		console.error('Failed to update comment:', err);
		return new Response(JSON.stringify({ error: 'Failed to update comment. Please try again.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	// If the update is successful, redirect to the specified path
	throw redirect(303, redirectTo || '/');
};
