import { r as redirect } from "../../../chunks/index.js";
async function GET(event) {
  event.locals.user = null;
  event.cookies.delete("jwt", { path: "/" });
  throw redirect(302, "/login");
}
export {
  GET
};
