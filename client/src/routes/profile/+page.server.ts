import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ url,locals }) => {
    if (!locals.user) {
        throw redirect(302, '/login')
    }

	const route = url.searchParams.get('redirect');


	return { previous_route: route || '/' };
};