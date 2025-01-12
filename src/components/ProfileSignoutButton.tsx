"use client";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import { toast } from "sonner";

function ProfileSignoutButton() {
  const [loading, setLoading] = useState(false);

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      setLoading(false);

      return;
    }

    router.push("/auth/log-in");
    setLoading(false);
  };

  return (
    <div>
      <Button loading={loading} onClick={signOut} variant={"destructive"}>
        Sign Out
        <PiSignOutBold />
      </Button>
    </div>
  );
}

export default ProfileSignoutButton;
