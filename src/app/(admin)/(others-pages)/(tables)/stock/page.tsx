"use client";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { useEffect, useState } from "react";
import { StockData } from "@/types/StockType";
import { stockConfig } from "../../../../../../stockConfig";
import React from "react";

// 使用 React.memo 包装 BasicTableOne，避免不必要的重新渲染
const MemoizedBasicTableOne = React.memo(BasicTableOne);

export default function BasicTables() {
  const [data, setData] = useState<StockData[] | null>(null);
  const [profitOrLoss, setProfitOrLoss] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // 定义 fetchData 函数
    const fetchData = async () => {
      try {
        const response = await fetch("/api/futu");
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const result: StockData[] = await response.json();
        let pol = 0;

        // 更新数据并计算盈亏
        result.forEach((item) => {
          const config = stockConfig[item.code];
          if (config) {
            item.buy_in_price = config.buy_in_price;
            item.buy_in_number = config.buy_in_number;
          }
          pol += (item.last_price - item.prev_close_price) * (item.buy_in_number || 0);
        });

        // 深比较：只有当数据变化时才更新状态
        if (JSON.stringify(result) !== JSON.stringify(data)) {
          setData(result);
        }
        setProfitOrLoss(pol);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 初始化时立即调用一次 fetchData
    fetchData();

    // 设置定时器，每 3 秒调用一次 fetchData
    intervalId = setInterval(fetchData, 3000);

    // 清除定时器
    return () => clearInterval(intervalId);
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
        <ComponentCard title={getTitle()}>
          {/* 使用 MemoizedBasicTableOne */}
          {data && <MemoizedBasicTableOne data= {data} />}
        </ComponentCard>
      </div>
    </div>
  );
}