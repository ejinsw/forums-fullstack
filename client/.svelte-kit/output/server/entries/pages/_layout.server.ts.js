const load = async ({ cookies, locals }) => {
  const user = locals.user;
  const jwt = cookies.get("jwt") || cookies.get("_vercel_jwt");
  return {
    user,
    jwt
  };
};
export {
  load
};
