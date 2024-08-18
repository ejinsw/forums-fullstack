// src/routes/register/+page.server.ts
import { env } from '$env/dynamic/public';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		// Extract the form data from the request
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		try {
			const response = await fetch(`${env.PUBLIC_API_HOST}/api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, username, password, isAuthor: true })
			});

			if (!response.ok) {
				const error = await response.json();
				return fail(400, { error: error.message });
			}

			const data = await response.json();

            console.log(data.token)

			return { success: true, token: data.token };
		} catch (error) {
			console.error(error);
			return fail(500, { error: 'Failed to register. Please try again.' });
		}
	}
};
