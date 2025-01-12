"use client";
import React from "react";
import { PendingPayments } from "@/actions/admin/getAllPendingPayments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function AdminPaymentHistory({ payments }: { payments: PendingPayments[] }) {
  return (
    <div>
      <p className="space-y-1 text-lg">User Payment History</p>
      <Card className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="">Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.id} className="bg-muted/10">
                  <TableCell className="py-4 font-medium">
                    {payment.email}
                  </TableCell>
                  <TableCell
                    className={cn(
                      payment.status == "pending"
                        ? "text-red-400"
                        : "text-green-500",
                    )}
                  >
                    {payment.status}
                  </TableCell>
                  <TableCell>{payment.title}</TableCell>
                  <TableCell className="text-lg font-semibold text-primary">
                    {" "}
                    ${payment.amount}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No payment found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default AdminPaymentHistory;
