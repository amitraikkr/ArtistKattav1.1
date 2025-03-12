// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export const dynamic = "force-dynamic"

// export async function GET(request: NextRequest) {
//   try {
//     const requestUrl = new URL(request.url)
//     const code = requestUrl.searchParams.get("code")

//     if (code) {
//       const cookieStore = cookies()
//       const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

//       // Exchange the code for a session
//       await supabase.auth.exchangeCodeForSession(code)
//     }

//     // URL to redirect to after sign in process completes
//     return NextResponse.redirect(new URL("/profile", request.url))
//   } catch (error) {
//     console.error("Auth callback error:", error)
//     // Redirect to login page with error parameter if something goes wrong
//     return NextResponse.redirect(new URL("/login?error=auth", request.url))
//   }
// }

