import { c as create_ssr_component, b as spread, e as escape_object } from "./ssr.js";
const Arrow_back_ios_new = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/>`}<!-- HTML_TAG_END --></svg>`;
});
export {
  Arrow_back_ios_new as A
};
