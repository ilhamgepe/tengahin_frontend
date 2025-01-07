import { NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/lib/constants";
import { GetSession } from "@/actions/session";

export async function middleware(req: NextRequest) {
  const currentUrl = req.nextUrl.pathname;
  const session = await GetSession();

  // jika dia akses halaman authentication
  if (AUTH_ROUTES.includes(currentUrl)) {
    // jika dia sudah login, redirect ke homepage
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // jika dia akses halaman protected
  if (PROTECTED_ROUTES.includes(currentUrl)) {
    // jika dia belum login, redirect ke login
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
