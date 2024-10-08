import * as server from '../entries/pages/register/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.D83j0EGA.js","_app/immutable/chunks/scheduler.Cy9pk9AM.js","_app/immutable/chunks/index.x6j4SjtJ.js","_app/immutable/chunks/forms.D6vUiypt.js","_app/immutable/chunks/entry.B3rq6gI2.js"];
export const stylesheets = [];
export const fonts = [];
