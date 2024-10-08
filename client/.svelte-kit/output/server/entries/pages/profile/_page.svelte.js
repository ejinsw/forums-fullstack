import { c as create_ssr_component, d as add_attribute, v as validate_component, h as escape } from "../../../chunks/ssr.js";
import { A as Arrow_back_ios_new } from "../../../chunks/arrow-back-ios-new.js";
import "../../../chunks/client.js";
import { C as ContentHolder } from "../../../chunks/ContentHolder.js";
import { C as CommentsHolder } from "../../../chunks/CommentsHolder.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let jwt;
  var Tab = /* @__PURE__ */ ((Tab2) => {
    Tab2[Tab2["posts"] = 0] = "posts";
    Tab2[Tab2["comments"] = 1] = "comments";
    return Tab2;
  })(Tab || {});
  let { data } = $$props;
  let selected = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  user = data.user;
  jwt = data.jwt;
  return `<div class="prose bg-base-100 min-h-screen m-4 border"><a class="flex min-w-fit min-h-fit m-8"${add_attribute("href", data.previous_route, 0)}>${validate_component(Arrow_back_ios_new, "MaterialSymbolsArrowBackIosNew").$$render($$result, {}, {}, {})}</a> <div class="flex flex-col mx-12 mb-12"><h1 class="text-3xl">${escape(user.name)}</h1> <h1 class="text-xl">@${escape(user.username)}</h1></div> <div role="tablist" class="tabs tabs-lifted"><button role="tab" class="${"tab " + escape(selected === Tab.posts && "tab-active", true)}">Posts</button> <button role="tab" class="${"tab " + escape(selected === Tab.comments && "tab-active", true)}">Comments</button></div> <div class="flex flex-col mx-12 my-12">${selected === Tab.posts ? `${validate_component(ContentHolder, "ContentHolder").$$render($$result, { items: user.posts, user, jwt }, {}, {})}` : `${validate_component(CommentsHolder, "CommentsHolder").$$render($$result, { items: user.comments, user, jwt }, {}, {})}`}</div></div>`;
});
export {
  Page as default
};
