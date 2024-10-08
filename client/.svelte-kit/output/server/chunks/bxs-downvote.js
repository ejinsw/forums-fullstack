import { c as create_ssr_component, b as spread, e as escape_object } from "./ssr.js";
const Upvote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Bxs_upvote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z" fill="currentColor"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Downvote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M20.901 10.566A1 1 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059M12 19.399L6.081 12H10V4h4v8h3.919z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Bxs_downvote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z" fill="currentColor"/>`}<!-- HTML_TAG_END --></svg>`;
});
export {
  Bxs_upvote as B,
  Downvote as D,
  Upvote as U,
  Bxs_downvote as a
};
