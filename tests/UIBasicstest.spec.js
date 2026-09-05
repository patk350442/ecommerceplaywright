const { test, expect } = require('@playwright/test');

test('@Web Test with Browser Context', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
});

test(' Second test with only and Page',{tag:['@Web','@Smoke']}, async ({ page }) => {
  await page.goto("https://google.com/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google"); 
});
