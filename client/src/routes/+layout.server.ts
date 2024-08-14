// src/routes/+layout.server.ts

import type { User } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const user: User | null = locals.user as User;
	const jwt = cookies.get('jwt');

	return {
		user,
		jwt
	};
};
