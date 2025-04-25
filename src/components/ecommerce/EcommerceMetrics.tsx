"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";
import { useEffect, useState } from "react";
import { StockData } from "@/types/StockType";
import { stockConfig } from "../../../stockConfig";
import { isWithinTradingHours } from "@/utils/timeUtils";

export const EcommerceMetrics = () => {
     const [profitOrLoss, setProfitOrLoss] = useState<number | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/futu");
          if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
          }
  
          const result: StockData[] = await response.json();
          let pol = 0;
  
          result.forEach((item) => {
            const config = stockConfig[item.code];
            if (config) {
              item.buy_in_price = config.buy_in_price;
              item.buy_in_number = config.buy_in_number;
            }
            pol += (item.last_price - item.prev_close_price) * (item.buy_in_number || 0);
          });

          setProfitOrLoss(pol);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      
      fetchData();

     
        const intervalId = setInterval(() => {
          if (isWithinTradingHours()) {
            fetchData();
          }
        }, 3000);
    
        return () => clearInterval(intervalId); // 清除定时器
    }, []); // 依赖 data，确保深比较生效
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
            Today&#39;s P/L
            </span>
            <h4 className={profitOrLoss !== null && profitOrLoss > 0? "mt-2 font-bold text-success-600 text-title-sm dark:text-white/90": "mt-2 font-bold text-error-600 text-title-sm dark:text-white/90"}>
              {profitOrLoss?.toFixed(2)}
            </h4>
          </div>
          <Badge color={profitOrLoss !== null && profitOrLoss > 0?"success":"error"}>
            {profitOrLoss !== null && profitOrLoss > 0 ? ( <ArrowUpIcon />) : (<ArrowDownIcon/>)}
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              0
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
