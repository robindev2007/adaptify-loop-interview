"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaPlus } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { PaymentSchema, paymentSchema } from "@/zod/paymentSchema";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { addNewPayment } from "@/actions/payment";
import { useRouter } from "next/navigation";

function AddNewPaymentDialog() {
  const [dialogActive, setDialogActive] = useState(false);

  return (
    <AlertDialog open={dialogActive} onOpenChange={setDialogActive}>
      <AlertDialogTrigger asChild>
        <Button size={"lg"} className="w-full">
          <FaPlus /> Add new payment
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            Add new payment
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AddNewPaymentDialogContent setDialogActive={setDialogActive} />
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddNewPaymentDialog;

const AddNewPaymentDialogContent = ({
  setDialogActive,
}: {
  setDialogActive: (active: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { executeAsync } = useAction(addNewPayment, {
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error.message);
        return;
      }

      toast.success("New Payment added");
      router.refresh();
      setDialogActive(false);
    },
  });

  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payment_amount: undefined,
    },
  });

  async function onSubmit(values: PaymentSchema) {
    if (loading) return;
    setLoading(true);

    await executeAsync(values);

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1.5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Title</FormLabel>
              <FormControl>
                <Input placeholder="Placeholder" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payment_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Placeholder" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2 pt-4">
          <Button
            loading={loading}
            onClick={() => setDialogActive(false)}
            variant={"outline"}
            type="button"
          >
            Cancel
          </Button>
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
