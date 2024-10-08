import { c as create_ssr_component, d as add_attribute, h as escape } from "../../../chunks/ssr.js";
import "devalue";
import "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  return `<div class="w-full h-full flex justify-center items-center"><form method="post" class="flex flex-col justify-center items-center bg-base-100 border border-base-200 rounded-xl px-4 py-8 shadow-xl"><h1 class="text-center mb-8 text-xl font-bold" data-svelte-h="svelte-1mjwmd4">Login</h1> <div class="w-full mb-2 flex flex-col justify-center"><input type="text" placeholder="Enter username"${add_attribute("value", form && form.username ? form.username : "", 0)} name="username" id="username" class="w-full border px-2 py-1 rounded-lg" required></div> <div class="w-full mb-4 flex flex-col justify-center"><input type="password" placeholder="Password"${add_attribute("value", form && form.password ? form.password : "", 0)} name="password" id="password" class="w-full border px-2 py-1 rounded-lg" required></div> <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg" data-svelte-h="svelte-15sbyir">Login</button> ${form?.error ? `<div class="text-red-500 text-xs">${escape(form.error)}</div>` : ``} <div class="flex gap-1 items-center py-2" data-svelte-h="svelte-joxvzn"><small class="text-xs">Don&#39;t have an account?</small> <a href="/register" class="text-xs text-blue-400 hover:text-blue-500">Register</a></div></form></div>`;
});
export {
  Page as default
};
