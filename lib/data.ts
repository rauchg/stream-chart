export async function getPriceData(ticker: string): Promise<PriceData> {
  if (ticker !== "XDGUSD" && ticker !== "XXBTZUSD") {
    return {
      error: ["Invalid ticker"],
      result: [],
    };
  }

  return fetch(
    `https://api.kraken.com/0/public/OHLC?pair=${ticker}&interval=1440`,
    {
      headers: {
        accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    },
  )
    .then((res) => res.json())
    .then((data) => {
      data.result = data.result[ticker] ?? [];
      return data;
    });
}

export type PriceData = {
  error: any[];
  result: [number, string, string, string, string, string, string, number][];
};
