import { auth } from "@/auth/authSetup";
import { NextAuthRequest } from "next-auth/lib";

export default auth((req: NextAuthRequest) => {
  const pathname = req.nextUrl.pathname;

  // if pathname starts with "/appointment"
  if (pathname.startsWith("/appointment") && !req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }

  // if pathname equal "/login" or "/register"
  if ((pathname === "/login" || pathname === "register") && req.auth) {
    const homeUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(homeUrl);
  }
});

export const config = {
  matcher: ["/appointment/:path*", "/login", "/register"],
};
