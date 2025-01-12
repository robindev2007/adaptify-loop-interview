"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpSchema, signUpSchema } from "@/zod/authSchema";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SingUpForm() {
  const [loading, setLoading] = useState(false);

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit({ email, password }: SignUpSchema) {
    if (loading) return;
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log(error);

      if (error?.message) {
        toast.error(error?.message);
        return;
      }

      toast.success("Account created");
      router.push("/");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create new account</CardTitle>
        <CardDescription>Create new account with email</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="mail@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_retype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retype Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Retype Password" {...field} />
                  </FormControl>
                  <FormDescription>Retype your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button loading={loading} className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-center text-sm text-muted-foreground">
          Already a user?{" "}
          <Link
            href={"/auth/log-in"}
            className="font-semibold text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
