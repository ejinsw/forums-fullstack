import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, url }) => {
	const route = url.searchParams.get('redirect');

	const res = await fetch(`http://localhost:3000/api/users/${params.id}`);

	if (!res.ok) {
		throw error(500, "Couldn't fetch user");
	}

	const user = await res.json();

	return { profile: user, previous_route: route || '/' };
};