import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
// import Image from "next/image";
// import { Elsie } from "next/font/google";
import { StockData } from "@/types/StockType";

export default function BasicTableOne({data}: {data: StockData[] | null}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Symbol
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Today&#39;s P/L
                </TableCell>                
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Price/Cost
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  MV/QTY
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                 P/L
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data?.map((order) => (
                <TableRow key={order.code}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      {/* <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={order.user.image}
                          alt={order.user.name}
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
                  {/* Today's P/L */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
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
                  {/* Price/Cost */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                      {/* {order.team.images.map((teamImage, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                        >
                          <Image
                            width={24}
                            height={24}
                            src={teamImage}
                            alt={`Team member ${index + 1}`}
                            className="w-full"
                          />
                        </div>
                      ))} */}
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.last_price}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.buy_in_price}
                        </span>
                    </div>
                  </TableCell>
                  {/* MV/QTY */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {(order.buy_in_price*order.buy_in_number).toFixed(2)}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.buy_in_number}
                        </span>
                      </div>
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
    </div>
  );
}
