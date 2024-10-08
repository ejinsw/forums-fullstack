import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch, params, url, locals }) => {
	if (locals.user && parseInt(params.id, 10) === locals.user.id) {
		throw redirect(302, '/profile');
	}
	const route = url.searchParams.get('redirect');

	const res = await fetch(`${PUBLIC_API_HOST}/api/users/${params.id}`);

	if (!res.ok) {
		throw error(500, "Couldn't fetch user");
	}

	const user = await res.json();

	return { profile: user, previous_route: route || '/' };
};
