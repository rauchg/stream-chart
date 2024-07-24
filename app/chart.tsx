"use client";

import { use } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartConfig = {
  DOGE: {
    label: "DOGE",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart({
  chartData,
}: {
  chartData: Promise<Array<{ date: string; DOGE: number }>>;
}) {
  const data = use(chartData);
  return (
    <>
      <CardHeader>
        <CardTitle>Doge Price</CardTitle>
        <CardDescription>
          {data.length > 0
            ? `${new Date(data[0].date).toLocaleDateString()} - ${new Date(
                data[data.length - 1].date,
              ).toLocaleDateString()}`
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full w-full">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
            width={700}
            height={400}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="DOGE"
              type="natural"
              stroke="var(--color-DOGE)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-DOGE)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </>
  );
}
