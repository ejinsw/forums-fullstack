import { PUBLIC_API_HOST } from '$env/static/public';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, request, params, url, fetch }) => {
	const formData = await request.formData();
	const formType = formData.get('formType') as string;
	const comment = formData.get('comment') as string;
	const redirectTo = url.searchParams.get('redirect');

	if (!comment) {
		return new Response(JSON.stringify({ error: 'Content is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		let response;
		if (formType === 'comment') {
			response = await fetch(`${PUBLIC_API_HOST}/api/posts/${params.id}/comments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.get('jwt')}`
				},
				body: JSON.stringify({ content: comment })
			});
		} else if (formType === 'reply') {
			const parentId = formData.get('parentId') as string;
			response = await fetch(`${PUBLIC_API_HOST}/api/comments/${parentId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.get('jwt')}`
				},
				body: JSON.stringify({ content: comment })
			});
		}

		if (response && !response.ok) {
			const errorText = await response.json();
			console.error('API Error:', errorText);
			return new Response(JSON.stringify({ error: errorText.message }), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (err) {
		console.error('Fetch Error:', err);
		return new Response(JSON.stringify({ error: 'Failed to process the request' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Redirect to the specified path
	throw redirect(303, redirectTo || '/');
};
