// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async (event: Parameters<PageServerLoad>[0]) => {
	const res = await event.fetch('http://localhost:3000/api/posts');

	if (!res.ok) {
		throw error(500, 'Something went wrong');
	}

    const posts = await res.json();

	return {
		posts
	};
};
