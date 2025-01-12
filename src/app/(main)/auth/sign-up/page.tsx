import Container from "@/components/Container";
import SingUpForm from "@/features/auth/SingUpForm";
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
        <SingUpForm />
      </Container>
    </div>
  );
}

export default SighUpPage;
