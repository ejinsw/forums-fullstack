import * as server from '../entries/pages/profile/_id_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/profile/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.rj80PrMA.js","_app/immutable/chunks/scheduler.Cy9pk9AM.js","_app/immutable/chunks/index.x6j4SjtJ.js","_app/immutable/chunks/arrow-back-ios-new.B1jJleYy.js","_app/immutable/chunks/spread.4dapbekP.js","_app/immutable/chunks/entry.B3rq6gI2.js","_app/immutable/chunks/ContentHolder.DLIXFx65.js","_app/immutable/chunks/bxs-downvote.Be72qWU0.js","_app/immutable/chunks/public.CpIIhdHb.js","_app/immutable/chunks/CommentsHolder.BB6Lc1bG.js","_app/immutable/chunks/Popup.DfimPbFN.js"];
export const stylesheets = [];
export const fonts = [];
