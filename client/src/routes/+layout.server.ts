// src/routes/+layout.server.ts

import type { User } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const user: User | null = locals.user as User;
	const jwt: string | undefined = cookies.get('jwt') || cookies.get('_vercel_jwt');

	return {
		user,
		jwt
	};
};
