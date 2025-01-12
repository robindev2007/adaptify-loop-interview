"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";

export const getAllPendingPayments = async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("payments")
    .select("amount, created_at, id, status, title, user_id, users(email)")
    .limit(20);

  if (error) {
    return { error: { message: error.message } };
  }

  const formattedData = data?.map((payment) => ({
    amount: payment.amount,
    created_at: payment.created_at,
    id: payment.id,
    status: payment.status,
    title: payment.title,
    user_id: payment.user_id,
    email: payment.users?.email, // Extract email from the related users table
  }));

  return { error: null, data: formattedData };
};

export type PendingPayments = NonNullable<
  Awaited<ReturnType<typeof getAllPendingPayments>>["data"]
>[0];
