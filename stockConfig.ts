// import { StockConfig } from "@/types/types";

export interface StockConfigItem {
  buy_in_price: number;
  buy_in_number: number;
}

export type StockConfig = Record<string, StockConfigItem>;

export const stockConfig: StockConfig = {
    "HK.00270": { buy_in_price: 6.383, buy_in_number: 52000 },
    "HK.00916": { buy_in_price: 10.681, buy_in_number: 12000 },
    "HK.03309": { buy_in_price: 6.767, buy_in_number: 14000 },
    "HK.00124": { buy_in_price: 0.0, buy_in_number: 8492 },
  };
