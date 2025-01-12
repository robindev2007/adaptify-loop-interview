import { getAllPendingPayments } from "@/actions/admin/getAllPendingPayments";
import Container from "@/components/Container";
import PaymentHistory from "@/features/admin/payment/PaymentHistory";
import React from "react";

async function PaymentPage() {
  const { data: payments } = await getAllPendingPayments();

  return (
    <div>
      <Container>
        <PaymentHistory payments={payments ?? []} />
      </Container>
    </div>
  );
}

export default PaymentPage;
