# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: LoginPagePractise.spec.js >> user can sign in and view iphone X on the shop page
- Location: tests\LoginPagePractise.spec.js:5:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://rahulshettyacademy.com/angularpractice/shop"
Received: "https://rahulshettyacademy.com/loginpagePractise/"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html>…</html>
       - unexpected value "https://rahulshettyacademy.com/loginpagePractise/"

```

```yaml
- link "Free Access to InterviewQues/ResumeAssistance/Material":
  - /url: https://rahulshettyacademy.com/documents-request
- link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator.":
  - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
- heading [level=3]:
  - img
- text: Old password "learning" is no longer valid. Please use the new password
- strong: "\"Learning@830$3mK2\""
- text: ". Username:"
- textbox "Username:": rahulshettyacademy
- text: "Password:"
- textbox "Password:": learning
- text: Admin
- radio "Admin" [checked]
- text: User
- radio "User"
- combobox:
  - option "Student" [selected]
  - option "Teacher"
  - option "Consultant"
- checkbox "I Agree to the terms and conditions" [checked]
- text: I Agree to the
- link "terms and conditions":
  - /url: "#"
- button "Sign In"
- paragraph: (username is rahulshettyacademy and Password is Learning@830$3mK2)
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { LoginPagePractise } = require('../pageobjects/LoginPagePractise');
  3  | const { PracticeShopPage } = require('../pageobjects/PracticeShopPage');
  4  | 
  5  | test('user can sign in and view iphone X on the shop page', async ({ page }) => {
  6  |     const loginPage = new LoginPagePractise(page);
  7  |     const shopPage = new PracticeShopPage(page);
  8  | 
  9  |     await loginPage.goTo();
  10 |     await loginPage.signIn('rahulshettyacademy', 'learning');
  11 | 
> 12 |     await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  13 |     await shopPage.verifyProductIsDisplayed('iphone X');
  14 |     await expect(shopPage.iphoneXProduct).toBeVisible();
  15 | });
```