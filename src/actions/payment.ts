"use server";

import { actionClient } from "@/lib/safe-action";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { paymentSchema } from "@/zod/paymentSchema";

export const addNewPayment = actionClient
  .schema(paymentSchema)
  .action(async ({ parsedInput: { payment_amount, title } }) => {
    const supabase = await createSupabaseServerClient();

    const data = await supabase
      .from("payments")
      .insert({
        amount: payment_amount,
        title,
      })
      .select()
      .single();

    return data;
  });

export const getCurrentUserPayments = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return { error: { message: "Auth user not found" }, data: null };
  }

  const { data, error } = await supabase
    .from("payments")
    .select("amount, created_at, id, status, title, user_id, users(email)")
    .eq("user_id", user.id)
    .limit(20);

  if (error) {
    return { error, data: null };
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

export type CurrentUserPayments = NonNullable<
  Awaited<ReturnType<typeof getCurrentUserPayments>>["data"]
>[0];
