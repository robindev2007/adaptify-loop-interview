"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TiCreditCard } from "react-icons/ti";

function PaymentsCounterCard({ mainBalance }: { mainBalance: number }) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <TiCreditCard size={25} className="text-chart-1" />
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <p className="text-2xl font-bold">${mainBalance}</p>
        <p>Pending {}</p>
      </CardContent>
      <CardFooter />
    </Card>
  );
}

export default PaymentsCounterCard;
