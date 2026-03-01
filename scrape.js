const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Replace these with the ACTUAL 10 URLs from your assignment
  const urls = [
    'https://example.com/seed1',
    'https://example.com/seed2',
    'https://example.com/seed3',
    'https://example.com/seed4',
    'https://example.com/seed5',
    'https://example.com/seed6',
    'https://example.com/seed7',
    'https://example.com/seed8',
    'https://example.com/seed9',
    'https://example.com/seed10'
  ];

  let totalSum = 0;

  for (const url of urls) {
    console.log(`Visiting: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' }); // Wait for the page to stop loading
    
    // This waits specifically for a table to appear on the screen
    await page.waitForSelector('table'); 

    const numbers = await page.$$eval('td', cells => 
      cells.map(c => {
        // This removes commas, dollar signs, or spaces before turning text into a number
        const cleaned = c.innerText.replace(/[^\d.-]/g, '');
        return parseFloat(cleaned);
      }).filter(n => !isNaN(n))
    );
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
    console.log(`Found on page: ${pageSum}`);
  }

  console.log('--- FINAL RESULT FOR 23f2004440@ds.study.iitm.ac.in ---');
  console.log('TOTAL SUM IS:', totalSum);

  await browser.close();
})();
