const { test, expect } = require('@playwright/test');
const { isContext } = require('node:vm');

test.only('Test with Browser Context', async ({ page }) => {

  const radioButton = page.locator("div .customradio");
  const blinkingLink = page.locator("a[href*='documents-request']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("Consultant");
  await radioButton.last().click();
  await page.locator("#okayBtn").click();
  await expect( radioButton.last()).toBeChecked();
  console.log(await radioButton.last().isChecked());
  await page.locator("#terms").click();
  await expect( page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  console.log(await page.locator("#terms").isChecked());
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(blinkingLink).toHaveAttribute("class","blinkingText");
});

test('child window', async ({ browser }) =>{
  const context =await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const blinkingLink = page.locator("a[href*='documents-request']");
  const [newPage] = await Promise.all(
    [
      context.waitForEvent('page'),
      blinkingLink.click(),

    ]
  );
 const text = await newPage.locator(".red").textContent();
  console.log(text);  
 const arrayText = text.split("@");
 const email = arrayText[1].split(" ")[0];
 await page.locator("#username").fill(email);
 console.log(await page.locator("#username").inputValue());
 await page.pause();  
})