"use client";

import { use } from "react";
import { LineChart } from "@/components/line-chart";

export function Chart({
  chartData,
}: {
  chartData: Promise<Array<{ date: string; DOGE: number }>>;
}) {
  const data = use(chartData);
  return (
    <LineChart
      data={data}
      index="date"
      categories={["DOGE"]}
      valueFormatter={(number: number) =>
        `$${Intl.NumberFormat("us").format(number).toString()}`
      }
      colors={
        ["amber"]
      }
      xAxisLabel="Month"
      yAxisLabel="Price"
    />
  );
}
