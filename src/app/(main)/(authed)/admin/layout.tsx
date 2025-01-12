import UserHeader from "@/components/UserHeader";
import AdminMobileFooter from "@/features/admin/AdminMobileFooter";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser || !authUser.id) {
    redirect("/");
  }

  const { data: userData } = await supabase
    .from("users")
    .select("role,id")
    .eq("id", authUser.id)
    .single();

  if (userData?.role !== "admin") {
    redirect("/");
  }

  console.log(userData);

  return (
    <div className="flex h-full flex-1 flex-col">
      <UserHeader />
      <div className="flex h-full flex-1 flex-col">{children}</div>
      <AdminMobileFooter />
    </div>
  );
}

export default AdminLayout;
