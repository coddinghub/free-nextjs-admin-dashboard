// middleware.js
import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

export default withAuth(
  // function middleware(request) {
  //   if (request.nextUrl.pathname.startsWith("/admin")) {
  //     const token = request.nextauth.token;
  //     if (!token?.isAdmin) {
  //       return NextResponse.redirect(new URL("/denied", request.url));
  //     }
  //   }
  // },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // 默认要求登录
    },
  }
);

// export const config = {
//   matcher: ["/((?!signin).*)"], // 匹配所有路径，除了 /signin
// };