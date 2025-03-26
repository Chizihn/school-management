// app/signin/page.tsx
"use client";

import { redirect } from "next/navigation";

export default function SigninPage() {
  redirect("/auth/login");
  return null; // or you can return some fallback UI (though the redirect should be immediate)
}
