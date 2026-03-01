const { chromium } = require('playwright');

(async () => {
  // 1. Launch the browser
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 2. The list of links (Replace these with the actual URLs from your task)
  const urls = [
    'https://example.com/seed1', 
    'https://example.com/seed2'
    // ... add all 10 here
  ];

  let totalSum = 0;

  for (const url of urls) {
    await page.goto(url);
    // This finds all table cells (td), grabs the text, and turns it into a number
    const numbers = await page.$$eval('td', cells => 
      cells.map(c => parseFloat(c.innerText)).filter(n => !isNaN(n))
    );
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
  }

  console.log('--- RESULTS FOR 23f2004440@ds.study.iitm.ac.in ---');
  console.log('TOTAL SUM IS:', totalSum);

  await browser.close();
})();
