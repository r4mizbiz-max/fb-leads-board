const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const cards = [
  'card-01-title.html',
  'card-02-objections.html',
  'card-03-speed-to-lead.html',
  'card-04-price-shoppers.html',
  'card-05-ad-broken.html',
  'card-06-wrong-setup.html',
  'card-07-winning-campaign.html',
  'card-08-price-psychology.html',
  'card-09-lead-form.html',
  'card-10-cta.html'
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const imgDir = path.join(__dirname, 'images');

  for (const card of cards) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
    const filePath = path.join(imgDir, card);
    await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });
    const outFile = path.join(imgDir, card.replace('.html', '.png'));
    await page.screenshot({ path: outFile, type: 'png' });
    await page.close();
    console.log('✅ ' + card.replace('.html', '.png'));
  }

  await browser.close();
  console.log('\nDone! All screenshots updated.');
})();
