import { Chart } from "./chart";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getPriceData } from "@/lib/data";
import { ShellDemo } from "./shell-demo";

async function getChartData(ticker = "XDGUSD") {
  const data = await getPriceData(ticker);

  if (data.error.length) {
    throw new Error(data.error.join(", "));
  }

  let convertedData = data.result.slice(-12).map((elem) => {
    let date = new Date(elem[0] * 1000);
    let formattedDate =
      date.toLocaleString("default", { month: "short" }) + " " + date.getDate();
    let averagePrice = (parseFloat(elem[2]) + parseFloat(elem[3])) / 2;
    return {
      date: formattedDate,
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
      <main className="font-sans flex items-center min-h-dvh justify-start sm:justify-center flex-col gap-10 p-5">
        <div className="flex max-w-3xl w-full bg-white p-7 rounded-xl">
          <div className="flex h-80 w-full items-center justify-center">
            <ErrorBoundary
              fallback={
                <span className="text-sm text-red-600">
                  Failed to load stock data from Kraken — please try later
                </span>
              }
            >
              <Suspense
                fallback={
                  <span className="text-sm text-gray-400">Fetching price…</span>
                }
              >
                <Chart chartData={getChartData(searchParams.ticker)} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        <div className="font-mono text-sm flex flex-col gap-5 max-w-2xl">
          <p>
            This demo shows off Next.js App Router with RSC streaming a{" "}
            <Code>Promise</Code> (
            <A href="https://github.com/rauchg/stream-chart/blob/main/app/page.tsx#L50">
              source
            </A>
            ) from the server which gets <Code>use()</Code>
            &rsquo;d by the client (
            <A href="https://github.com/rauchg/stream-chart/blob/main/app/chart.tsx#L11">
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
            <A href="https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model">
              PPR
            </A>
            , the <ShellDemo /> is instantly &amp; statically delivered by the
            Vercel edge, followed by the dynamic stream.
          </p>

          <hr />

          <p>
            Deployed on <A href="https://vercel.com/home">Vercel</A> (
            <A href="https://github.com/rauchg/stream-chart">source</A>). Data
            by <A href="https://docs.kraken.com/rest/">Kraken API</A>. Charts by{" "}
            <A href="https://www.tremor.so/">Tremor</A> &amp;{" "}
            <A href="https://recharts.org/">Recharts</A>.
          </p>
        </div>
      </main>
    </>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-gray-200 p-1 rounded-md text-gray-700">{children}</code>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="border-b pb-.5 border-gray-400" href={href} target="_blank">
      {children}
    </a>
  );
}
