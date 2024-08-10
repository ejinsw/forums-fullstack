import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const res = await event.fetch('http://localhost:3000/api/posts');

	if (!res.ok) {
		return new Error('Something went wrong');
	}

    const posts = await res.json();

	return {
		posts
	};
};
