// @ts-nocheck
// src/routes/+layout.server.ts

import type { User } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = async ({ cookies, locals }: Parameters<LayoutServerLoad>[0]) => {
	const user: User | null = locals.user as User;
	const jwt: string | undefined = cookies.get('jwt');

	return {
		user,
		jwt
	};
};
