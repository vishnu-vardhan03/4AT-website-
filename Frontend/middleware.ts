import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token }) =>
        token?.role === "admin" &&
        typeof token.accessToken === "string" &&
        typeof token.accessTokenExpires === "number" &&
        token.accessTokenExpires > Date.now(),
    },
    pages: { signIn: "/admin/login" },
  },
);

export const config = { matcher: ["/admin", "/admin/((?!login(?:/|$)).*)"] };
