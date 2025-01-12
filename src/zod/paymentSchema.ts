import { z } from "zod";

export const paymentSchema = z.object({
  title: z
    .string({
      required_error: "Enter title",
    })
    .min(1, "Enter title")
    .max(255, "Too long"),
  payment_amount: z.coerce
    .number({
      required_error: "Enter amount",
      invalid_type_error: "Enter amount",
    })
    .gte(1, "Minium 1$")
    .lte(9999999999, "Number is too big"),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
