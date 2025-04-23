import { chromium } from 'playwright';
import { NextResponse } from 'next/server';

const PROXY_URL = process.env.PROXY_URL || 'http://192.168.1.219:8888';
const TARGET_WEBSITE = process.env.TARGET_WEBSITE || 'https://www.linksyssmartwifi.com';

export async function GET() {
  const browser = await chromium.launch({
    headless: true,
    proxy: {
      server: PROXY_URL,
    },
  });

  try {
    const page = await browser.newPage();
    await page.goto(TARGET_WEBSITE);

    return NextResponse.json({ message: `Success.` }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error while running Playwright:', error);
      return NextResponse.json({ message: `Failed to visit ${TARGET_WEBSITE}`, error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error occurred:', error);
      return NextResponse.json({ message: `Failed to visit ${TARGET_WEBSITE}`, error: 'An unknown error occurred' }, { status: 500 });
    }
  } finally {
    await browser.close();
  }
}

export const POST = GET;