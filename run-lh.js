const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port};
  const runnerResult = await lighthouse('http://localhost:3000', options);

  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  console.log('First Contentful Paint:', runnerResult.lhr.audits['first-contentful-paint'].displayValue);
  console.log('Speed Index:', runnerResult.lhr.audits['speed-index'].displayValue);
  console.log('Largest Contentful Paint:', runnerResult.lhr.audits['largest-contentful-paint'].displayValue);
  console.log('Total Blocking Time:', runnerResult.lhr.audits['total-blocking-time'].displayValue);

  await chrome.kill();
})();
