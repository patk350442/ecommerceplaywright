const { test, expect } = require('@playwright/test');

test.only('[@Web] Test with Browser Context', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const itemTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.fill("rahulshetty");
  await password.fill("Learning@830$3mK2");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await itemTitles.first().textContent());
  console.log(await itemTitles.nth(1).textContent());
  console.log(await itemTitles.allTextContents());
  


});

