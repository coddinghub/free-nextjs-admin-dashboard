import { NextResponse } from 'next/server';

interface ApiResponse {
  status: string;
  data?: JSON;
}

export async function GET() {
  try {
    const stockCodes = process.env.STOCK_HK_CODES;
    if (!stockCodes) {
      console.error("Environment variable STOCK_HK_CODES is not defined.");
      return NextResponse.json(
        { error: "Internal Server Error: Missing STOCK_HK_CODES" },
        { status: 500 }
      );
    }

    const apiUrl = `http://localhost:5001/get_price?codes=${encodeURIComponent(stockCodes)}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      return NextResponse.json(
        { error: `API request failed with status: ${response.status}` },
        { status: response.status }
      );
    }

    const result: ApiResponse = await response.json();
    if (result.status === "success" && result.data) {
      return NextResponse.json(result.data);
    } else {
      console.error("API returned unexpected response:", result);
      return NextResponse.json(
        { error: "Unexpected API response" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error occurred while fetching stock prices:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}