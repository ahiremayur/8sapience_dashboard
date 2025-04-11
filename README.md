## files content
1) route.js          ← API route to fetch stock data
Server-side API route that receives a POST request with an array of stock symbols.

Fetches data using yahoo-finance2.

Returns structured data with:

cmp: current market price

peRatio: trailing P/E ratio

earnings: trailing EPS


2) page.js                   ← Main page that renders the dashboard
   Renders the PortfolioTable component on the homepage.

Uses the App Router structure of Next.js 13+.


3) PortfolioTable.js         ← Renders table & handles client-side logic
Client component that:

Loads the portfolio data

Calls the API with all stock symbols

Updates the table with live data and calculated values

Handles formatting (currency/percentage) and color coding for gain/loss.


4) portfolioTable.module.css ← CSS module for styling table
CSS Module scoped to the component.

Styles gain/loss cells in red/green.

Applies consistent table styling.


5) getPortfolioData.js       ← Static portfolio data (sector-wise)
Contains static portfolio entries:

Sector name

Stock name

Buy price

Quantity

Exchange (e.g., NSE)

Used as the base to be enriched with live data.


## How to Run the Project
1. git clone https://github.com/ahiremayur/8sapience_dashboard.git
2. cd 8sapience_dashboard
3. npm install
4. npm install axios react-table
5. npm install yahoo-finance2
6. npm run dev
7. then on browser open http://localhost:3000/


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
