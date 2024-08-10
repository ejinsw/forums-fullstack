// @ts-nocheck
// src/routes/+layout.server.ts

import type { User } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
	const user : User | null = locals.user as User;

	return {
		user // Pass the user data to the layout
	};
};
