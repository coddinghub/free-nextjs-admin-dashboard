// import { StockConfig } from "@/types/types";

export interface StockConfigItem {
  buy_in_price: number;
  buy_in_number: number;
}

export type StockConfig = Record<string, StockConfigItem>;

export const stockConfig: StockConfig = {
    "HK.00270": { buy_in_price: 7.947, buy_in_number: 8000 },
    "HK.00916": { buy_in_price: 10.681, buy_in_number: 12000 },
    "HK.03309": { buy_in_price: 6.901, buy_in_number: 18000 },
  };
