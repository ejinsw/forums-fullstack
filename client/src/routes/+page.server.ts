import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async (event) => {
	// const res = await event.fetch(`${env?.PUBLIC_API_HOST}/api/posts`);

	// if (!res.ok) {
	// 	throw error(500, 'Something went wrong');
	// }

    // const posts = await res.json();

	// return {
	// 	posts
	// };
};
