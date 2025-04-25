"use client"
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
// import { Metadata } from "next";
import React from "react";
import { useEffect,useState } from 'react';
import { StockData } from "@/types/StockType";
import { stockConfig } from "../../../../../../stockConfig";

// export const metadata: Metadata = {
//   title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
//   // other metadata
// };

const MemoizedBasicTableOne = React.memo(BasicTableOne);

export default function BasicTables() {
  const [data, setData] = useState<StockData[] | null>(null);
  const [profitOrLoss, setProfitOrLoss] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/futu");
      const result:StockData[] = await response.json();
      let pol:number = 0;
      result?.forEach((item) => {
        const config = stockConfig[item.code];
        if (config) {
          item.buy_in_price = config.buy_in_price;
          item.buy_in_number = config.buy_in_number;
        }
        pol = pol + (item.last_price - item.prev_close_price) * (item.buy_in_number || 0);
      });

      if (JSON.stringify(result) !== JSON.stringify(data)) {
        setData(result);
      }
      setProfitOrLoss(pol);
    };

   
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [data]);

  const getTitle = () => {
    if (profitOrLoss === null) {
      return "Loading...";
    }
    return `Profit/Loss: ${profitOrLoss.toFixed(2)}`;
  };
  return (
    <div>
      <PageBreadcrumb pageTitle="" />
      <div className="space-y-6">
        <ComponentCard title={getTitle()}>
          {/* <BasicTableOne data={data}/> */}
          {data && <MemoizedBasicTableOne data={data} />}
        </ComponentCard>
      </div>
    </div>
  );
}
