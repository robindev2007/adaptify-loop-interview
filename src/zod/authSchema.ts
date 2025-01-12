import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: "Enter email",
      })
      .email(),
    password: z
      .string({
        required_error: "Enter password",
      })
      .min(6, "Min password length 6"),
    password_retype: z.string({ required_error: "Retype Password" }),
  })
  // Check if retype pass match
  .refine((data) => data.password === data.password_retype, {
    message: "Passwords don't match",
    path: ["password_retype"], // path of error
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

// Login schema
export const logInSchema = z.object({
  email: z
    .string({
      required_error: "Enter email",
    })
    .email(),
  password: z
    .string({
      required_error: "Enter password",
    })
    .min(6, "Min password length 6"),
});

export type LogInSchema = z.infer<typeof logInSchema>;
