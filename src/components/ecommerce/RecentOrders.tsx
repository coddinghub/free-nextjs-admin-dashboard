"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
// import Image from "next/image";
import { useState,useEffect } from 'react';
import Button from "@/components/ui/button/Button";
import { BoxIcon } from "@/icons";
import { StockData } from "@/types/StockType";
import { stockConfig } from "../../../stockConfig";
import { isWithinAmTradingHours,isWithinPmTradingHours } from "@/utils/timeUtils";

export default function RecentOrders() {
  const [status, setStatus] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [data, setData] = useState<StockData[] | null>(null);
  const [profitOrLoss, setProfitOrLoss] = useState<number | null>(null);
  const [totalProfitOrLoss, setTotalProfitOrLoss] = useState<number | null>(null);  

  const tv = async (act:string) => {
    setIsButtonDisabled(true);
    try {
      const params = new URLSearchParams({
        action: act,
      });
      setStatus(act==='block'? 'Locking...':'Unlocking...');
      const response = await fetch(`/api/tv?${params}`, { method: 'GET' });
      const result: { message: string } = await response.json();
      setStatus(result.message);
    } catch (error) {
      setStatus(`Error occurred ${error}`);
    }finally{
      setIsButtonDisabled(false);
    }
  };

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
      if (isWithinAmTradingHours() || isWithinPmTradingHours()) {
        fetchData();
      }
    }, 3000);

    return () => clearInterval(intervalId); // 清除定时器
  }); 
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Today P/L: <Badge color={profitOrLoss !== null && profitOrLoss > 0?"success":"error"}>${profitOrLoss?.toFixed(2)}</Badge>  P/L:
          <Badge color={totalProfitOrLoss !== null && totalProfitOrLoss > 0?"success":"error"}>${totalProfitOrLoss?.toFixed(2)}</Badge> 
          {status}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button> */}
          {/* <button disabled={isButtonDisabled} onClick={() => tv('block')} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Block TV
          </button> */}
          <Button disabled={isButtonDisabled} onClick={() => tv('block')} size="sm" variant="primary" startIcon={<BoxIcon />}>
            Lock TV
          </Button>
          <Button disabled={isButtonDisabled} onClick={() => tv('unblock')} size="sm" variant="primary" startIcon={<BoxIcon />}>
            Unlock TV
          </Button>          
          {/* <button disabled={isButtonDisabled} onClick={() => tv('unblock')} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Unblock TV
          </button>           */}
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Symbol
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Today P/L
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price/Cost
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                MV/QTY
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Holding P/L
              </TableCell>              
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data?.map((order) => (
              <TableRow key={order.code} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    {/* <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div> */}
                    <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.code}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.name}
                        </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                <Badge
                      size="sm"
                      color={
                        (order.last_price-order.prev_close_price) > 0
                          ? "success"
                          :(order.last_price-order.prev_close_price) < 0 
                          ? "error"
                          : "warning"
                      }
                    >
                     {((order.last_price-order.prev_close_price)*order.buy_in_number).toFixed(2)} <br />
                     ({((order.last_price-order.prev_close_price)/order.prev_close_price*100).toFixed(2) +'%'} )
                    </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.last_price}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.buy_in_price}
                        </span>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {(order.buy_in_price*order.buy_in_number).toFixed(2)}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.buy_in_number}
                        </span>
                </TableCell>
                  {/* P/L */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        (order.last_price-order.buy_in_price) > 0
                          ? "success"
                          :(order.last_price-order.buy_in_price) < 0 
                          ? "error"
                          : "warning"
                      }
                    >
                     {((order.last_price-order.buy_in_price)*order.buy_in_number).toFixed(2)} <br />
                     ({((order.last_price-order.buy_in_price)/order.buy_in_price*100).toFixed(2) +'%'} )
                    </Badge>
                  </TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
