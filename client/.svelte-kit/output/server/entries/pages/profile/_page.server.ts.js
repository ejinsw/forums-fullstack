import { r as redirect } from "../../../chunks/index.js";
const load = async ({ url, locals }) => {
  if (!locals.user) {
    throw redirect(302, "/login");
  }
  const route = url.searchParams.get("redirect");
  return { previous_route: route || "/" };
};
export {
  load
};
