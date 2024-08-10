import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	event.locals.user = null;

	event.cookies.delete('jwt', { path: '/' });

	throw redirect(302, '/login');
}
