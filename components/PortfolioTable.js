'use client';

import { useEffect, useState } from 'react';
import portfolioData from '../utils/getPortfolioData';
import styles from '../styles/portfolioTable.module.css';

const formatCurrency = (value) =>
  typeof value === 'number'
    ? '₹' + value.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    : '-';

const formatPercentage = (value) =>
  typeof value === 'number' ? value.toFixed(2) + '%' : '-';

export default function PortfolioTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCMPs = async () => {
      const symbols = portfolioData.flatMap((sector) =>
        sector.stocks.map((stock) => stock.symbol)
      );

      const res = await fetch('/api/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols }),
      });

      const apiData = await res.json();

      const updated = portfolioData.map((sector) => {
        const updatedStocks = sector.stocks.map((stock) => {
          const api = apiData[stock.symbol] || {};
          const cmp = api.cmp || 0;
          const investment = stock.purchasePrice * stock.quantity;
          const presentValue = cmp * stock.quantity;
          const gainLoss = presentValue - investment;
          const gainLossPercent = (gainLoss / investment) * 100;

          return {
            ...stock,
            cmp,
            peRatio: api.peRatio,
            latestEarnings: api.earnings,
            investment,
            presentValue,
            gainLoss,
            gainLossPercent,
          };
        });

        return { ...sector, stocks: updatedStocks };
      });

      setData(updated);
    };

    fetchCMPs();
  }, []);

  return (
    <div className={styles.container}>
      {data.map((sector) => (
        <div key={sector.sector} className={styles.sectorBox}>
          <h2>{sector.sector} Sector</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Buy Price</th>
                <th>Investment</th>
                <th>CMP</th>
                <th>Value</th>
                <th>G/L</th>
                <th>% G/L</th>
                <th>P/E</th>
                <th>EPS</th>
              </tr>
            </thead>
            <tbody>
              {sector.stocks.map((stock) => (
                <tr key={stock.symbol}>
                  <td>{stock.name}</td>
                  <td>{stock.quantity}</td>
                  <td>{formatCurrency(stock.purchasePrice)}</td>
                  <td>{formatCurrency(stock.investment)}</td>
                  <td>{formatCurrency(stock.cmp)}</td>
                  <td>{formatCurrency(stock.presentValue)}</td>
                  <td className={stock.gainLoss < 0 ? styles.loss : styles.gain}>
                    {formatCurrency(stock.gainLoss)}
                  </td>
                  <td>{formatPercentage(stock.gainLossPercent)}</td>
                  <td>{stock.peRatio}</td>
                  <td>{stock.latestEarnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
