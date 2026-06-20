import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;

  // Guest User
  if (!session) {
    if (pathname.startsWith("/tenant") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // Logged-in user cannot access login/register
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/tenant") && session.user.role !== "tenant") {
    return NextResponse.redirect(
      new URL(`/${session.user.role}/dashboard`, request.url),
    );
  }

  if (pathname.startsWith("/admin") && session.user.role !== "admin") {
    return NextResponse.redirect(
      new URL(`/${session.user.role}/dashboard`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/tenant/:path*", "/admin/:path*"],
};
