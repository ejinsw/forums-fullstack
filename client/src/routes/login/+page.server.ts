// src/routes/register/+page.server.ts
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

export const load: PageServerLoad = (event) => {
	const user = event.locals.user;

	if (user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async (event) => {
		// Extract the form data from the request
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!username || !password) {
			return fail(400, {
				username,
				password,
				error: 'Missing username or password'
			});
		}

		try {
			const response = await fetch(`${PUBLIC_API_HOST}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			if (!response.ok) {
				const errorText = await response.json();
				console.error('Error:', errorText);
				return { username, password, status: response.status, error: errorText.message };
			}

			const data = await response.json();

			event.cookies.set('jwt', data.token, {
				httpOnly: true,
				path: '/',
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 1 day
			});
		} catch (err) {
			console.error(err);
			return fail(500, { username, password, error: 'Failed to login. Please try again.' });
		}
		throw redirect(302, '/');
	}
};
