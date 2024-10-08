import { e as error, f as fail } from "../../../../chunks/index.js";
import { g as goto } from "../../../../chunks/client.js";
import { p as public_env } from "../../../../chunks/shared-server.js";
const load = async ({ fetch: fetch2, params, url }) => {
  const route = url.searchParams.get("redirect");
  const res = await fetch2(`${public_env.PUBLIC_API_HOST}/api/posts/${params.id}`);
  if (!res.ok) {
    throw error(500, "Couldn't fetch post");
  }
  const post = await res.json();
  if (!post.published) {
    throw goto();
  }
  return { post, previous_route: route || "/" };
};
const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const formType = formData.get("formType");
    const comment = formData.get("comment");
    if (!comment) {
      return fail(400, {
        comment,
        error: "Missing comment content"
      });
    }
    try {
      if (formType == "comment") {
        const response = await fetch(
          `${public_env.PUBLIC_API_HOST}/api/posts/${event.params.id}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${event.cookies.get("jwt")}`
            },
            body: JSON.stringify({ content: comment })
          }
        );
        if (!response.ok) {
          const errorText = await response.json();
          console.error("Error:", errorText);
          return { comment, status: response.status, error: errorText.message };
        }
      } else if (formType == "reply") {
        const parentId = formData.get("parentId");
        const response = await fetch(`${public_env.PUBLIC_API_HOST}/api/comments/${parentId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${event.cookies.get("jwt")}`
          },
          body: JSON.stringify({ content: comment })
        });
        if (!response.ok) {
          const errorText = await response.json();
          console.error("Error:", errorText);
          return { comment, status: response.status, error: errorText.message };
        }
      }
    } catch (err) {
      console.error(err);
      return fail(500, { comment, error: "Failed to post comment. Please try again." });
    }
  }
};
export {
  actions,
  load
};
