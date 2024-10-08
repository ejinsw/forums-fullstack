import * as server from '../entries/pages/posts/_id_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/posts/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.BJLCnMaJ.js","_app/immutable/chunks/scheduler.Cy9pk9AM.js","_app/immutable/chunks/index.x6j4SjtJ.js","_app/immutable/chunks/spread.4dapbekP.js","_app/immutable/chunks/arrow-back-ios-new.B1jJleYy.js","_app/immutable/chunks/bxs-downvote.Be72qWU0.js","_app/immutable/chunks/Popup.DfimPbFN.js","_app/immutable/chunks/entry.B3rq6gI2.js","_app/immutable/chunks/stores.C4fxic5v.js","_app/immutable/chunks/public.CpIIhdHb.js"];
export const stylesheets = [];
export const fonts = [];
