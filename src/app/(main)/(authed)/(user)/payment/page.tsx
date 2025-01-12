import { getCurrentUserPayments } from "@/actions/payment";
import Container from "@/components/Container";
import { Alert } from "@/components/ui/alert";
import AddNewPaymentDialog from "@/features/payment/AddNewPaymentDialog";
import UserPaymentHistory from "@/features/payment/UserPaymentHistory";
import React from "react";

async function PaymentPage() {
  const { error, data: payments } = await getCurrentUserPayments();

  return (
    <div>
      <Container>
        <AddNewPaymentDialog />
        {error ? (
          <Alert variant={"destructive"}>{error.message}</Alert>
        ) : (
          <UserPaymentHistory payments={payments ?? []} />
        )}
      </Container>
    </div>
  );
}

export default PaymentPage;
