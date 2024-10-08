import { p as public_env } from "../../../../../chunks/shared-server.js";
import { r as redirect } from "../../../../../chunks/index.js";
const GET = async ({ cookies, params, url, fetch }) => {
  const commentId = params.id;
  const content = url.searchParams.get("content");
  const redirectTo = url.searchParams.get("redirect");
  if (!content) {
    return new Response(JSON.stringify({ error: "Content is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const response = await fetch(`${public_PUBLIC_API_HOST}/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("jwt")}`
      },
      body: JSON.stringify({ content })
    });
    if (!response.ok) {
      const errorText = await response.json();
      return new Response(JSON.stringify({ error: errorText.message }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (err) {
    console.error("Failed to update comment:", err);
    return new Response(JSON.stringify({ error: "Failed to update comment. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  throw redirect(303, redirectTo || "/");
};
export {
  GET
};
