# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UIBasicstest2.spec.js >> @Web Test with Browser Context
- Location: tests\UIBasicstest2.spec.js:3:6

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/loginpagePractise/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.only('@Web Test with Browser Context', async ({ browser }) => {
  4  |   const context = await browser.newContext();
  5  |   const page = await context.newPage();
  6  |   const userName = page.locator("#username");
  7  |   const password = page.locator("#password");
  8  |   const signIn = page.locator("#signInBtn");
  9  |   const itemTitles = page.locator(".card-body a");
> 10 |   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     |              ^ Error: page.goto: Target page, context or browser has been closed
  11 |   console.log(await page.title());
  12 |   await userName.fill("rahulshetty");
  13 |   await password.fill("Learning@830$3mK2");
  14 |   await signIn.click();
  15 |   console.log(await page.locator("[style*='block']").textContent());
  16 |   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
  17 | 
  18 |   await userName.fill("");
  19 |   await userName.fill("rahulshettyacademy");
  20 |   await signIn.click();
  21 |   console.log(await itemTitles.first().textContent());
  22 |   console.log(await itemTitles.nth(1).textContent());
  23 |   console.log(await itemTitles.allTextContents());
  24 |   
  25 | 
  26 | 
  27 | });
  28 | 
  29 | 
```