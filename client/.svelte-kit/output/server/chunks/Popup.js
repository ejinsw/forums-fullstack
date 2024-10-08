import { c as create_ssr_component, b as spread, e as escape_object, o as onDestroy, d as add_attribute, v as validate_component } from "./ssr.js";
const Dots_vertical = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Popup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [] } = $$props;
  let menuElement;
  function handleClickOutside(event) {
  }
  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("click", handleClickOutside);
    }
  });
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  return `<div class="relative inline-block"${add_attribute("this", menuElement, 0)}> <button class="text-gray-500 hover:text-gray-700 p-2 focus:outline-none">${validate_component(Dots_vertical, "MdiDotsVertical").$$render($$result, {}, {}, {})}</button>  ${``}</div>`;
});
export {
  Popup as P
};
