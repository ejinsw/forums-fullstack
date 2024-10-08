// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

export const load = async (event: Parameters<PageServerLoad>[0]) => {
	const res = await event.fetch(`${PUBLIC_API_HOST}/api/posts`);

	if (!res.ok) {
		throw error(500, 'Something went wrong');
	}

    const posts = await res.json();

	return {
		posts
	};
};
