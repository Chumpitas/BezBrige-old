import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type CookieZaPostavljanje = { name: string; value: string; options?: CookieOptions };

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: req });
  const { pathname } = req.nextUrl;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const stiti = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (!url || !anon || !stiti) return res;

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (toSet: CookieZaPostavljanje[]) =>
        toSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options),
        ),
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const u = req.nextUrl.clone();
    u.pathname = "/admin/login";
    u.searchParams.set("od", pathname);
    return NextResponse.redirect(u);
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
