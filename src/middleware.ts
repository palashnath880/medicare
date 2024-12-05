import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin/dashboard") && !token) {
        return false;
      }

      if (req.nextUrl.pathname === "/admin/login") {
        return Promise.reject();
      }

      return true;
    },
    signIn: () => Promise.resolve({ pathname: "/admin/dashboard" }),
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};

// export default async function middleware(req) {

//     const url = req.url;
//     const { origin } = req.nextUrl;

//     const token = await getToken({ req });
//     const session = await getSession({ req });

//     console.log(`token`, session)

//     // if admin not logged in
//     if (!session && url?.includes('/admin/dashboard')) {
//         return NextResponse.redirect(`${origin}/admin/login`);
//     } else if (session && url?.includes('/admin/login')) {
//         return NextResponse.redirect(`${origin}/admin/dashboard`);
//     }

//     return NextResponse.next();

// }
