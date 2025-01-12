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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function PaymentHistory({ payments }: { payments: PendingPayments[] }) {
  return (
    <div>
      <p className="space-y-1 text-lg">User Payment&apos;s</p>
      <Card className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="">Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Action</TableHead>
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
                    ${payment.amount}
                  </TableCell>
                  <TableCell>
                    <PaymentAction payment={payment} />
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

export default PaymentHistory;

const PaymentAction = ({ payment }: { payment: PendingPayments }) => {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleMarkSucceed = async () => {
    try {
      const { data: pevData } = await supabase
        .from("payments")
        .select("status")
        .eq("id", payment.id)
        .single();

      if (pevData?.status == "status") {
        toast.error("Already marked success");
        return;
      }

      const { error } = await supabase
        .from("payments")
        .update({
          status: "success",
        })
        .eq("id", payment.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Marked Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <HiDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Payment Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem onClick={handleMarkSucceed}>Succeed</DropdownMenuItem>
        <DropdownMenuItem>Cancel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
