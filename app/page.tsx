import { Chart } from "./chart";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getPriceData } from "@/lib/data";
import { ShellDemo } from "./shell-demo";
import { A, Code } from "@/components/markup";
import { Card } from "@/components/ui/card";

async function getChartData(ticker = "XDGUSD") {
  const data = await getPriceData(ticker);

  if (data.error.length) {
    throw new Error(data.error.join(", "));
  }

  let convertedData = data.result.slice(-12).map((elem) => {
    let date = new Date(elem[0] * 1000);
    let averagePrice = (parseFloat(elem[2]) + parseFloat(elem[3])) / 2;
    return {
      date: date.toISOString(),
      DOGE: averagePrice,
    };
  });

  return convertedData;
}

export default function Home({
  searchParams,
}: {
  searchParams: { ticker: string };
}) {
  return (
    <>
      <main className="font-sans flex items-center min-h-dvh justify-start sm:justify-center flex-col gap-7 p-5">
        <div className="w-full max-w-3xl">
          <Card className="grid md:aspect-[16/11] aspect-square flex-col w-full">
            <ErrorBoundary
              fallback={
                <span className="text-sm text-red-600">
                  Failed to load stock data from Kraken — please try later
                </span>
              }
            >
              <Suspense
                fallback={
                  <span className="justify-self-center self-center text-sm text-gray-400">
                    Fetching price…
                  </span>
                }
              >
                <Chart chartData={getChartData(searchParams.ticker)} />
              </Suspense>
            </ErrorBoundary>
          </Card>
        </div>

        <div className="font-mono text-sm flex flex-col gap-5 max-w-2xl">
          <p>
            This demo shows off Next.js App Router with RSC streaming a{" "}
            <Code>Promise</Code> (
            <A
              href="https://github.com/rauchg/stream-chart/blob/main/app/page.tsx#L50"
              tr="src-promise"
            >
              source
            </A>
            ) from the server which gets <Code>use()</Code>
            &rsquo;d by the client (
            <A
              href="https://github.com/rauchg/stream-chart/blob/main/app/chart.tsx#L11"
              tr="src-use"
            >
              source
            </A>
            ).
          </p>

          <p>
            The chart is <b>not</b> rendered on the server, but that does not
            come at the expense of having to perform a <Code>fetch()</Code> on
            the client. No roundtrips or waterfalls.
          </p>

          <p>
            This demo shows how App Router can stream &ldquo;server-rendered
            data&rdquo;, not just UI, a great solution for data-heavy apps,
            &ldquo;SPAs&rdquo;, or libraries which rely on browser APIs (and
            have no SSR support).
          </p>

          <p>
            The best part: thanks to{" "}
            <A
              href="https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model"
              tr="ppr"
            >
              PPR
            </A>
            , the <ShellDemo /> is instantly &amp; statically delivered by the
            Vercel edge, followed by the dynamic stream.
          </p>

          <hr />

          <p>
            Deployed on{" "}
            <A href="https://vercel.com/home" tr="vercel">
              Vercel
            </A>{" "}
            (
            <A href="https://github.com/rauchg/stream-chart" tr="src-main">
              source
            </A>
            ). Data by{" "}
            <A href="https://docs.kraken.com/rest/" tr="kraken">
              Kraken API
            </A>
            . Charts by{" "}
            <A href="https://ui.shadcn.com/" tr="tremor">
              shadcn
            </A>{" "}
            &amp;{" "}
            <A href="https://recharts.org/" tr="recharts">
              Recharts
            </A>
            .
          </p>
        </div>
      </main>
    </>
  );
}
