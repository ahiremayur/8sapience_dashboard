
import yahooFinance from 'yahoo-finance2';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { symbols } = await req.json();

    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json({ error: 'Invalid request. Expected an array of symbols.' }, { status: 400 });
    }

    const stockData = {};

    const fetchAll = symbols.map(async (symbol) => {
      try {
        const data = await yahooFinance.quoteSummary(symbol, {
          modules: ['price', 'summaryDetail', 'defaultKeyStatistics'],
        });

        stockData[symbol] = {
          cmp: data?.price?.regularMarketPrice || 0,
          peRatio: data?.summaryDetail?.trailingPE || '-',
          earnings: data?.defaultKeyStatistics?.trailingEps || '-',
        };
      } catch (err) {
        console.error(`Failed fetching ${symbol}:`, err.message);
        stockData[symbol] = { cmp: 0, peRatio: '-', earnings: '-' };
      }
    });

    await Promise.all(fetchAll);

    return NextResponse.json(stockData);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
