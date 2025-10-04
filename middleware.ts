import { NextRequest, NextResponse } from "next/server";

// Quy tắc phân quyền: route nào cho role nào
const accessMatrix = [
  {
    pathPrefix: "/admin",
    allow: ["admin"], // chỉ admin
  },
  {
    pathPrefix: "/doctor",
    allow: ["doctor"], //, "admin"
  },
  {
    pathPrefix: "/pharma",
    allow: ["pharmacist"], //, "admin"
  },
  {
    pathPrefix: "/nurse",
    allow: ["nurse"], //, "admin"
  },
  {
    pathPrefix: "/staff",
    allow: ["staff"], //, "admin""receptionist"],
  },
  {
    pathPrefix: "/reception",
    allow: ["receptionist"], //, "admin"
  },
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // Route nào cần token thì check, không thì next luôn
  const matched = accessMatrix.find((rule) =>
    pathname.startsWith(rule.pathPrefix)
  );

  if (matched) {
    if (!token) {
      // Không có token, về login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Decode JWT payload ở FE (không bảo mật tuyệt đối, chỉ chặn UI)
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(
        Buffer.from(base64Payload, "base64").toString()
      );
      const userRole = payload.role;
      console.log("Quyền nè" + userRole);
      if (!matched.allow.includes(userRole)) {
        // Không có quyền, về not-found hoặc 403
        return NextResponse.redirect(new URL("/not-found", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Tự động apply cho tất cả các route protected
export const config = {
  matcher: [
    "/admin/:path*",
    "/doctor/:path*",
    "/pharma/:path*",
    "/nurse/:path*",
    "/staff/:path*",
    // "/reception/:path*",
  ],
};
