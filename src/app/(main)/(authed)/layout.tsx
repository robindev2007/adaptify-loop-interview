import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function MainLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser || !authUser.id) {
    redirect("/auth/log-in");
  }

  return <>{children}</>;
}

export default MainLayout;
