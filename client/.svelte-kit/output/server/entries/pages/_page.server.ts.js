import { e as error } from "../../chunks/index.js";
import { p as public_env } from "../../chunks/shared-server.js";
const load = async (event) => {
  const res = await event.fetch(`${public_PUBLIC_API_HOST}/api/posts`);
  if (!res.ok) {
    throw error(500, "Something went wrong");
  }
  const posts = await res.json();
  return {
    posts
  };
};
export {
  load
};
