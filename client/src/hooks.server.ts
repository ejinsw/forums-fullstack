import type { Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/public';
import { JWT_SECRET } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	const { headers } = event.request;
	const cookies = parse(headers.get('cookie') ?? '');

	if (cookies.jwt) {
		// Remove Bearer prefix
		const token = cookies.jwt;

		try {
			const jwtUser = jwt.verify(token, JWT_SECRET);
			if (typeof jwtUser === 'string') {
				throw new Error('Something went wrong');
			}

			if (!jwtUser.sub) {
				throw new Error("Sub doesn't exist");
			}

			const res = await fetch(`${env?.PUBLIC_API_HOST}/api/users/${jwtUser.sub}`);

			if (!res.ok) {
				event.locals.user = null;
				throw new Error('User not found');
			}

			const user = await res.json();

			event.locals.user = user;
		} catch (error) {
			console.error(error);
		}
	}

	return await resolve(event);
};
