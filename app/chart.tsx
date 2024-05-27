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
        /* noteworthy: for this color to work, since it's not referenced
         * directly in the code as a `className` and signal to the
         * Tailwind compiler that it's used and to be included in the
         * "pruned" css, we defined `stroke-amber - 500` and `bg - amber - 500`
         * in the `safelist` prop of `tawildinw.config.js`
         * https://sdk.vercel.ai/s/mjiuFU7cQtRN */
        ["amber"]
      }
      xAxisLabel="Month"
      yAxisLabel="Price"
    />
  );
}
