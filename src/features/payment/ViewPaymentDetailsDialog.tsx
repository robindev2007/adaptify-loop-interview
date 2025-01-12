import { CurrentUserPayments } from "@/actions/payment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

function ViewPaymentDetailsDialog({
  payment,
}: {
  payment: CurrentUserPayments;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"ghost"}>View payment details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div className="flex gap-1">
          <p>ID: </p>
          <span>
            {payment.id.slice(0, 10)}...
            {payment.id.slice(payment.id.length - 10, payment.id.length)}
          </span>
        </div>
        <div className="flex gap-2">
          <p>Email: </p>
          <span>{payment.email}</span>
        </div>
        <div className="flex gap-2">
          <p>Status: </p>
          <span>{payment.status}</span>
        </div>
        <div className="flex gap-2">
          <p>Amount: </p>
          <span>{payment.amount}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewPaymentDetailsDialog;
