// src/routes/+layout.server.ts

import type { User } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user : User | null = locals.user as User;

	return {
		user // Pass the user data to the layout
	};
};
