import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function AuthLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return <>{children}</>;
}

export default AuthLayout;
