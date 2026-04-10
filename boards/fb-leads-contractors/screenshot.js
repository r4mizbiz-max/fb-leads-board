const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const dir = __dirname;
  const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  for (const f of htmlFiles) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
    await page.goto('file://' + path.join(dir, f), { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(dir, f.replace('.html', '.png')), type: 'png' });
    await page.close();
    console.log('✅ ' + f.replace('.html', '.png'));
  }
  await browser.close();
})();
