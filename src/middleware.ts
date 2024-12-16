import { auth } from "@/auth/authSetup";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

export default auth(async (req: NextAuthRequest) => {
  const pathname = req.nextUrl.pathname;

  // if pathname starts with "/appointment"
  if (pathname.startsWith("/appointment") && !req.auth) {
    const href = req.nextUrl.href;
    const loginUrl = new URL(
      `/login?redirectTo=${encodeURIComponent(href)}`,
      req.nextUrl.origin
    );
    return NextResponse.redirect(loginUrl);
  }

  // if pathname starts with "/admin"
  if (pathname.startsWith("/admin")) {
    const href = req.nextUrl.href;
    const loginUrl = new URL(
      `/login?redirectTo=${encodeURIComponent(href)}`,
      req.nextUrl.origin
    );

    if (!req.auth) return NextResponse.redirect(loginUrl);

    const authUser = req.auth.user;
    if (!authUser.isAdmin) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  // if pathname equal "/login" or "/register"
  if ((pathname === "/login" || pathname === "register") && req.auth) {
    const homeUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/appointment/:path*", "/login", "/register", "/admin/:path*"],
};
