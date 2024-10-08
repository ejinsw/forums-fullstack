import { p as public_env } from "../../../chunks/shared-server.js";
import { f as fail } from "../../../chunks/index.js";
const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const response = await fetch(`${public_env.PUBLIC_API_HOST}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, username, password, isAuthor: true })
      });
      if (!response.ok) {
        const error = await response.json();
        return fail(400, { error: error.message });
      }
      const data = await response.json();
      console.log(data.token);
      return { success: true, token: data.token };
    } catch (error) {
      console.error(error);
      return fail(500, { error: "Failed to register. Please try again." });
    }
  }
};
export {
  actions
};
