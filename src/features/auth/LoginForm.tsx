"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { logInSchema, LogInSchema } from "@/zod/authSchema";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<LogInSchema>({
    resolver: zodResolver(logInSchema),
  });

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  async function onSubmit(values: LogInSchema) {
    if (loading) return;
    setLoading(true);

    try {
      // Login user with supabase auth
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      // Handle auth error
      if (error) {
        toast.error(
          error.message == "Invalid login credentials"
            ? "Wrong password of email"
            : error.message,
        );
        return;
      }
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
        <CardTitle>Login </CardTitle>
        <CardDescription>Log in with email</CardDescription>
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

            <Button loading={loading} className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account ?{" "}
          <Link
            href={"/auth/sign-up"}
            className="font-semibold text-blue-500 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
