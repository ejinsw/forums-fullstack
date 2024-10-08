import { r as redirect, e as error } from "../../../../chunks/index.js";
import { p as public_env } from "../../../../chunks/shared-server.js";
const load = async ({ fetch, params, url, locals }) => {
  if (locals.user && parseInt(params.id, 10) === locals.user.id) {
    throw redirect(302, "/profile");
  }
  const route = url.searchParams.get("redirect");
  const res = await fetch(`${public_PUBLIC_API_HOST}/api/users/${params.id}`);
  if (!res.ok) {
    throw error(500, "Couldn't fetch user");
  }
  const user = await res.json();
  return { profile: user, previous_route: route || "/" };
};
export {
  load
};
