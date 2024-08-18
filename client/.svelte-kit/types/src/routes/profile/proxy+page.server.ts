// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load = async ({ url,locals }: Parameters<PageServerLoad>[0]) => {
    if (!locals.user) {
        throw redirect(302, '/login')
    }

	const route = url.searchParams.get('redirect');


	return { previous_route: route || '/' };
};