import { c as create_ssr_component, d as add_attribute, h as escape } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let title = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  data.user;
  data.jwt;
  return `<div class="flex items-center justify-center w-full h-full text-sm p-6"><div class="flex flex-col gap-6 w-full max-w-lg bg-base-100 shadow-lg p-6 rounded-lg"><h2 class="text-xl font-semibold" data-svelte-h="svelte-ml0c39">Create a New Post</h2> <input type="text" placeholder="Title" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"${add_attribute("value", title, 0)}> <textarea rows="5" placeholder="Write something..." class="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500">${escape("")}</textarea> <div class="flex justify-end w-full"><button class="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" data-svelte-h="svelte-w8643">Post</button></div></div></div>`;
});
export {
  Page as default
};
