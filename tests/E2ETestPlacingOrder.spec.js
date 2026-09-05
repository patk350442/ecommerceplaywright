const { test, expect } = require('@playwright/test');

test.only('Test with Browser Context', async ({ page }) => {
 
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const signIn = page.locator("#login");
  await userName.fill("pratik350442@gmail.com");
  await password.fill("Test@12345");
  await signIn.click();
  //await page.locator(".card-body b").first().waitFor();
  await page.waitForLoadState("networkidle");
  console.log(await page.locator(".card-body b").allTextContents());
 // await page.pause();

});
