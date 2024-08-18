// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load = async ({ fetch, params, url, locals }: Parameters<PageServerLoad>[0]) => {
	if (locals.user && parseInt(params.id, 10) === locals.user.id) {
		throw redirect(302, '/profile');
	}
	const route = url.searchParams.get('redirect');

	const res = await fetch(`${env.PUBLIC_API_HOST}/api/users/${params.id}`);

	if (!res.ok) {
		throw error(500, "Couldn't fetch user");
	}

	const user = await res.json();

	return { profile: user, previous_route: route || '/' };
};
