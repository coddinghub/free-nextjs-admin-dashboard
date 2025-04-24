import { chromium } from 'playwright';
import { NextRequest, NextResponse } from 'next/server';

const PROXY_URL = process.env.PROXY_URL || 'http://127.0.0.1:8888';
const TARGET_WEBSITE = process.env.TARGET_WEBSITE || 'https://www.linksyssmartwifi.com';

export async function GET(req:NextRequest) {

  const url = req.nextUrl;
  const action = url.searchParams.get('action') || 'block';
  let retryTime: number = 3;
  // console.info(action);
  while( retryTime >0){
    const browser = await chromium.launch({
      headless: true,
      proxy: {server: PROXY_URL,}
    });
    try {
      const page = await browser.newPage();
      console.info('Browser started.')
      await page.goto(TARGET_WEBSITE);
      await page.fill('#username',process.env.LINKSYS_USERNAME || '');
      await page.fill('#password',process.env.LINKSYS_PASSWORD || '');
      await page.click('#submit-login');
      console.info('Clicked login button.')
      await page.click('#pcViewAll');
      console.info('Clicked view all.')
      await page.click('xpath=//ul[@id="deviceSelection"]//li[@tooltip="Smart TV Pro"]');
      console.info('Selected Smart TV Pro.')
      if(action === 'block'){
        await page.click('xpath=//ul[@id="blockRadios"]//label[@for="idRadioBlockAlways"]');
        console.info('Clicked block radio.')
      }else{
        await page.click('xpath=//ul[@id="blockRadios"]//label[@for="idRadioBlockNever"]');
        console.info('Clicked never block radio.')
      }
      await page.click('xpath=//footer[@class="applet-button-section"]/button[@class="submit"]');
      console.info('Clicked submit button.')
      await page.hover('#pcViewAll');
      await page.hover('#user-menu');
      console.info('Hover menu.')
      await page.click('#user-menu-sign-out');
      console.info('Clicked sign out.')
      await page.hover('#submit-login');
      // await page.screenshot({ path: '/Volumes/ZHITAI-1TB/projects/nodejs/free-nextjs-admin-dashboard/linksys.png' });
      retryTime = -1;
      return NextResponse.json({ message: action==='block'? 'Locked':'Unlocked' }, { status: 200 });
    } catch (error: unknown) {
      console.error('Error while running Playwright:', error);
      retryTime = retryTime -1;
      if(retryTime<=0){
        return NextResponse.json({ message: `Failed to visit ${TARGET_WEBSITE}`, error: 'An unknown error occurred' }, { status: 500 });
      }else{
        continue;
      }
    }finally{
      await browser.close();
      console.info('Browser closed.')
    }
  }
}