import { NextRequest } from "next/server";

/**
 * Validates if the request is authorized to access admin APIs.
 * Supports both Admin and Developer credentials.
 */
export function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-auth") || req.headers.get("authorization");
  if (!auth) return false;

  // Expected Admin: admin@aivsme : Aivsme@Admin#2026
  const adminExpected = "Basic " + Buffer.from("admin@aivsme:Aivsme@Admin#2026").toString("base64");
  
  // Expected Developer: dev@aivsme : Aivsme@Dev#2026
  const devExpected = "Basic " + Buffer.from("dev@aivsme:Aivsme@Dev#2026").toString("base64");

  return auth === adminExpected || auth === devExpected;
}
