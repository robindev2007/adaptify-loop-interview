import UserHeader from "@/components/UserHeader";
import UserMobileFooter from "@/features/Footer/UserMobileFooter";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function UserLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("users")
    .select("role,id")
    .eq("id", authUser?.id as string)
    .single();

  if (userData?.role == "admin") {
    redirect("/admin");
  }
  return (
    <div className="flex h-full flex-1 flex-col">
      <UserHeader />
      <div className="flex h-full flex-1 flex-col">{children}</div>
      <UserMobileFooter />
    </div>
  );
}

export default UserLayout;
