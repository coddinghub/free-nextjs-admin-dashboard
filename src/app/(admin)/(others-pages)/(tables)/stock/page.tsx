"use client";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { useEffect, useState } from "react";
import { StockData } from "@/types/StockType";
import { stockConfig } from "../../../../../../stockConfig";
import React from "react";
import { isWithinTradingHours } from "@/utils/timeUtils";
import Badge from "@/components/ui/badge/Badge";

// 使用 React.memo 包装 BasicTableOne，避免不必要的重新渲染
const MemoizedBasicTableOne = React.memo(BasicTableOne);

export default function BasicTables() {
  const [data, setData] = useState<StockData[] | null>(null);
  const [profitOrLoss, setProfitOrLoss] = useState<number | null>(null);
  const [totalProfitOrLoss, setTotalProfitOrLoss] = useState<number | null>(null);

  useEffect(() => {
    // 定义 fetchData 函数
    const fetchData = async () => {
      try {
        const response = await fetch("/api/futu");
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const result: StockData[] = await response.json();
        let todayPL = 0;
        let totalPL = 0;

        // 更新数据并计算盈亏
        result.forEach((item) => {
          const config = stockConfig[item.code];
          if (config) {
            item.buy_in_price = config.buy_in_price;
            item.buy_in_number = config.buy_in_number;
          }
          todayPL += (item.last_price - item.prev_close_price) * (item.buy_in_number || 0);
          totalPL += (item.last_price - item.buy_in_price) * (item.buy_in_number || 0);
        });

        // 深比较：只有当数据变化时才更新状态
        if (JSON.stringify(result) !== JSON.stringify(data)) {
          setData(result);
        }
        setProfitOrLoss(todayPL);
        setTotalProfitOrLoss(totalPL)
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
  }, [data]); // 依赖 data，确保深比较生效

  // 计算标题
  const getTitle = () => {
    if (profitOrLoss === null) {
      return "Loading...";
    }
    return `Today P/L: ${profitOrLoss.toFixed(2)} | Position P/L:`;
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="" />
      <div className="space-y-6">
        <ComponentCard title="Stock">
          {/* 使用 MemoizedBasicTableOne */}
          Today P/L: <Badge color={profitOrLoss !== null && profitOrLoss > 0?"success":"error"}>${profitOrLoss?.toFixed(2)}</Badge> | P/L:
          <Badge color={totalProfitOrLoss !== null && totalProfitOrLoss > 0?"success":"error"}>${totalProfitOrLoss?.toFixed(2)}</Badge>
          {data && <MemoizedBasicTableOne data= {data} />}
        </ComponentCard>
      </div>
    </div>
  );
}