import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // Refresh session if needed
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl;
  const isDashboard = url.pathname.startsWith("/dashboard");
  const isLogin = url.pathname === "/admin/login";

  if (isDashboard && !user) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("next", url.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Only users listed in `public.admin_users` can access /dashboard
  if (isDashboard && user) {
    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!adminRow) {
      const redirectUrl = url.clone();
      redirectUrl.pathname = "/admin/login";
      redirectUrl.searchParams.set("next", url.pathname);
      redirectUrl.searchParams.set("error", "not_admin");
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isLogin && user) {
    const next = url.searchParams.get("next") || "/dashboard";
    const redirectUrl = url.clone();
    redirectUrl.pathname = next;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin/login"],
};

