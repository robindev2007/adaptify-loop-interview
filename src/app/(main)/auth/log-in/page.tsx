import Container from "@/components/Container";
import LoginForm from "@/features/auth/LoginForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create account",
  description: "Crete your new account",
};

function SighUpPage() {
  return (
    <div className="">
      <Container className="500 flex h-full min-h-screen flex-1 flex-grow items-center justify-center">
        <LoginForm />
      </Container>
    </div>
  );
}

export default SighUpPage;
