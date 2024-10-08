import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import "../../chunks/client.js";
import { C as ContentHolder } from "../../chunks/ContentHolder.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="m-4 flex flex-col gap-4">${validate_component(ContentHolder, "ContentHolder").$$render(
    $$result,
    {
      items: data.posts,
      title: "Recent Posts",
      link: "/posts/recent",
      user: data.user,
      jwt: data.jwt
    },
    {},
    {}
  )}</div>`;
});
export {
  Page as default
};
