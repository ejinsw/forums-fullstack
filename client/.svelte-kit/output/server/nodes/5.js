

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/create/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.DvNymoOR.js","_app/immutable/chunks/scheduler.Cy9pk9AM.js","_app/immutable/chunks/index.x6j4SjtJ.js","_app/immutable/chunks/entry.B3rq6gI2.js","_app/immutable/chunks/public.CpIIhdHb.js"];
export const stylesheets = [];
export const fonts = [];
