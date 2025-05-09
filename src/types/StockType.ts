// export interface StockData {
//     // Price and Volume Data
//     after_amplitude: "N/A";
//     after_change_rate: "N/A";
//     after_change_val: "N/A";
//     after_high_price: "N/A";
//     after_low_price: "N/A";
//     after_price: "N/A";
//     after_turnover: number;
//     after_volume: number;
//     amplitude: number;
//     ask_price: "N/A";
//     ask_vol: "N/A";
//     avg_price: number;
//     bid_ask_ratio: number;
//     bid_price: "N/A";
//     bid_vol: "N/A";
//     close_price_5min: number;
//     high_price: number;
//     highest52weeks_price: number;
//     highest_history_price: number;
//     last_price: number;
//     low_price: number;
//     lowest52weeks_price: number;
//     lowest_history_price: number;
//     open_price: number;
//     overnight_amplitude: "N/A";
//     overnight_change_rate: "N/A";
//     overnight_change_val: "N/A";
//     overnight_high_price: "N/A";
//     overnight_low_price: "N/A";
//     overnight_price: "N/A";
//     overnight_turnover: "N/A";
//     overnight_volume: "N/A";
//     prev_close_price: number;
//     price_spread: number;
//     pre_amplitude: "N/A";
//     pre_change_rate: "N/A";
//     pre_change_val: "N/A";
//     pre_high_price: "N/A";
//     pre_low_price: "N/A";
//     pre_price: "N/A";
//     pre_turnover: "N/A";
//     pre_volume: "N/A";
//     turnover: number;
//     turnover_rate: number;
//     volume: number;
//     volume_ratio: number;
  
//     // Market Value and Shares Data
//     circular_market_val: number;
//     issued_shares: number;
//     lot_size: number;
//     outstanding_shares: number;
//     total_market_val: number;
  
//     // Financial Metrics
//     dividend_lfy: number;
//     dividend_lfy_ratio: number;
//     dividend_ratio_ttm: number;
//     dividend_ttm: number;
//     earning_per_share: number;
//     net_asset: number;
//     net_asset_per_share: number;
//     net_profit: number;
//     pb_ratio: number;
//     pe_ratio: number;
//     pe_ttm_ratio: number;
//     ey_ratio: number;
  
//     // Security Information
//     code: string;
//     name: string;
//     listing_date: string;
//     sec_status: "NORMAL";
//     suspension: boolean;
  
//     // Optional Fields (nullable)
//     enable_margin: null;
//     enable_short_sell: null;
//     equity_valid: boolean;
//     future_last_settle_price: null;
//     future_last_trade_time: null;
//     future_main_contract: null;
//     future_position: null;
//     future_position_change: null;
//     future_valid: boolean;
//     index_equal_count: null;
//     index_fall_count: null;
//     index_raise_count: null;
//     index_valid: boolean;
//     long_margin_initial_ratio: null;
//     mortgage_ratio: null;
//     option_area_type: "N/A";
//     option_contract_multiplier: null;
//     option_contract_nominal_value: null;
//     option_contract_size: null;
//     option_delta: null;
//     option_expiry_date_distance: null;
//     option_gamma: null;
//     option_implied_volatility: null;
//     option_net_open_interest: null;
//     option_open_interest: null;
//     option_owner_lot_multiplier: null;
//     option_premium: null;
//     option_rho: null;
//     option_strike_price: null;
//     option_theta: null;
//     option_type: "N/A";
//     option_valid: boolean;
//     option_vega: null;
//     plate_equal_count: null;
//     plate_fall_count: null;
//     plate_raise_count: null;
//     plate_valid: boolean;
//     short_available_volume: null;
//     short_margin_initial_ratio: null;
//     short_sell_rate: null;
//     stock_owner: null;
//     strike_time: null;
//     trust_assetClass: "N/A";
//     trust_aum: null;
//     trust_dividend_yield: null;
//     trust_netAssetValue: null;
//     trust_outstanding_units: null;
//     trust_premium: null;
//     trust_valid: boolean;
//     wrt_break_even_point: null;
//     wrt_conversion_price: null;
//     wrt_conversion_ratio: null;
//     wrt_delta: null;
//     wrt_end_trade: null;
//     wrt_implied_volatility: null;
//     wrt_inline_price_status: "N/A";
//     wrt_ipop: null;
//     wrt_issue_vol: null;
//     wrt_issuer_code: null;
//     wrt_leverage: null;
//     wrt_lower_strike_price: null;
//     wrt_maturity_date: null;
//     wrt_premium: null;
//     wrt_price_recovery_ratio: null;
//     wrt_recovery_price: null;
//     wrt_score: null;
//     wrt_street_ratio: null;
//     wrt_street_vol: null;
//     wrt_strike_price: null;
//     wrt_type: "N/A";
//     wrt_upper_strike_price: null;
//     wrt_valid: boolean;
  
//     // Timestamps
//     update_time: string;
//     buy_in_price: number;
//     buy_in_number: number;
//   }


  export interface StockData {
    name: string;
    code: string;    
    prev_close_price: number;
    last_price: number;
    buy_in_price: number;
    buy_in_number: number;
  }
