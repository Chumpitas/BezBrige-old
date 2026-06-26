import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-cookie";

// Lagana zaštita: preusmeri na login ako kolačić ne postoji.
// Pravu HMAC proveru radi admin layout (Node runtime).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const ima = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!ima) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("od", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
