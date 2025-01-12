"use client";
import { Area, AreaChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const chartData = [
  { month: "January", mobile: 10 },
  { month: "February", mobile: 20 },
  { month: "February", mobile: 1000 },
  { month: "February", mobile: 1000 },
  { month: "February", mobile: 1000 },
  { month: "February", mobile: 1000 },
  { month: "February", mobile: 1000 },
  { month: "February", mobile: 1000 },
  { month: "February", mobile: 1000 },
];
const chartConfig = {
  mobile: {
    label: "Balance",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function BalanceCard({ mainBalance }: { mainBalance: number }) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <MdOutlineAccountBalanceWallet size={25} className="text-chart-2" />
        </div>
        <ChartContainer
          config={chartConfig}
          className="h-[40px] w-[30%] overflow-visible"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 5,
              bottom: 5,
            }}
          >
            {/* <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            /> */}

            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="10%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="20%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.5}
              stroke="var(--color-mobile)"
            />
          </AreaChart>
        </ChartContainer>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="text-3xl font-bold">${mainBalance}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
      <CardFooter>
        <span className="text-sm text-chart-2">Account balance</span>
      </CardFooter>
    </Card>
  );
}

export default BalanceCard;
