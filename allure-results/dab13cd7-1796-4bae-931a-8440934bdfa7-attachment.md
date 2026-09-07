# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FramesPopUps.spec.js >> Visual Test
- Location: tests\FramesPopUps.spec.js:37:6

# Error details

```
Error: expect(Buffer).toMatchSnapshot(expected) failed

  39402 pixels (ratio 0.05 of all image pixels) are different.

  Snapshot: landingPage.png

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
    - generic [ref=e27]:
      - generic [ref=e28]:
        - heading "Customer Login" [level=2] [ref=e29]
        - generic [ref=e30]:
          - generic [ref=e31]:
            - paragraph [ref=e32]: Username
            - textbox [active] [ref=e34]
            - paragraph [ref=e35]: Password
            - textbox [ref=e37]
            - button "Log In" [ref=e39] [cursor=pointer]
          - paragraph [ref=e40]:
            - link "Forgot login info?" [ref=e41] [cursor=pointer]:
              - /url: lookup.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
          - paragraph [ref=e42]:
            - link "Register" [ref=e43] [cursor=pointer]:
              - /url: register.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
      - generic [ref=e44]:
        - list [ref=e46]:
          - listitem [ref=e47]: ATM Services
          - listitem [ref=e48]:
            - link "Withdraw Funds" [ref=e49] [cursor=pointer]:
              - /url: services/ParaBank;jsessionid=15884533113A6D2B6036D51AD4BB8819?wsdl
          - listitem [ref=e50]:
            - link "Transfer Funds" [ref=e51] [cursor=pointer]:
              - /url: services/ParaBank;jsessionid=15884533113A6D2B6036D51AD4BB8819?wsdl
          - listitem [ref=e52]:
            - link "Check Balances" [ref=e53] [cursor=pointer]:
              - /url: services/ParaBank;jsessionid=15884533113A6D2B6036D51AD4BB8819?wsdl
          - listitem [ref=e54]:
            - link "Make Deposits" [ref=e55] [cursor=pointer]:
              - /url: services/ParaBank;jsessionid=15884533113A6D2B6036D51AD4BB8819?wsdl
        - list [ref=e56]:
          - listitem [ref=e57]: Online Services
          - listitem [ref=e58]:
            - link "Bill Pay" [ref=e59] [cursor=pointer]:
              - /url: services/bank;jsessionid=15884533113A6D2B6036D51AD4BB8819?_wadl&_type=xml
          - listitem [ref=e60]:
            - link "Account History" [ref=e61] [cursor=pointer]:
              - /url: services/bank;jsessionid=15884533113A6D2B6036D51AD4BB8819?_wadl&_type=xml
          - listitem [ref=e62]:
            - link "Transfer Funds" [ref=e63] [cursor=pointer]:
              - /url: services/bank;jsessionid=15884533113A6D2B6036D51AD4BB8819?_wadl&_type=xml
        - paragraph [ref=e64]:
          - link "Read More" [ref=e65] [cursor=pointer]:
            - /url: services.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - heading "Latest News" [level=4] [ref=e66]
        - list [ref=e67]:
          - listitem [ref=e68]: 09/06/2026
          - listitem [ref=e69]:
            - link "ParaBank Is Now Re-Opened" [ref=e70] [cursor=pointer]:
              - /url: news.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819#6
          - listitem [ref=e71]:
            - link "New! Online Bill Pay" [ref=e72] [cursor=pointer]:
              - /url: news.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819#5
          - listitem [ref=e73]:
            - link "New! Online Account Transfers" [ref=e74] [cursor=pointer]:
              - /url: news.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819#4
        - paragraph [ref=e75]:
          - link "Read More" [ref=e76] [cursor=pointer]:
            - /url: news.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
  - generic [ref=e78]:
    - list [ref=e79]:
      - listitem [ref=e80]:
        - link "Home" [ref=e81] [cursor=pointer]:
          - /url: index.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - text: "|"
      - listitem [ref=e82]:
        - link "About Us" [ref=e83] [cursor=pointer]:
          - /url: about.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - text: "|"
      - listitem [ref=e84]:
        - link "Services" [ref=e85] [cursor=pointer]:
          - /url: services.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - text: "|"
      - listitem [ref=e86]:
        - link "Products" [ref=e87] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e88]:
        - link "Locations" [ref=e89] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e90]:
        - link "Forum" [ref=e91] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e92]:
        - link "Site Map" [ref=e93] [cursor=pointer]:
          - /url: sitemap.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
        - text: "|"
      - listitem [ref=e94]:
        - link "Contact Us" [ref=e95] [cursor=pointer]:
          - /url: contact.htm;jsessionid=15884533113A6D2B6036D51AD4BB8819
    - paragraph [ref=e96]: © Parasoft. All rights reserved.
    - list [ref=e97]:
      - listitem [ref=e98]: "Visit us at:"
      - listitem [ref=e99]:
        - link "www.parasoft.com" [ref=e100] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test')
  2  | 
  3  | test('frames and Pop Ups Test', async ({ page }) => 
  4  |     {
  5  | 
  6  |     await page.goto("https://rahulshettyacademy.com/AutomationPractice/#");
  7  |     //   await page.goto("https://google.com/");
  8  |     //   await page.goBack();
  9  |     //   await page.goForward(); 
  10 |     await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  11 |     await page.getByRole('button', { name: 'Hide' }).click();
  12 |     await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
  13 |     page.on('dialog', dialog => dialog.accept());
  14 |     await page.locator("#name").fill("test");
  15 | 
  16 |     await page.getByRole('button', { name: 'Confirm' }).click();
  17 |     await page.getByRole('button', { name: 'Mouse Hover' }).hover();
  18 |     const framePage = page.frameLocator("#courses-iframe");
  19 |     await framePage.getByText("VIEW ALL COURSES").click();
  20 | }); 
  21 | 
  22 | test('screenshot and partial screenshot Test', async ({ page }) => 
  23 |     {
  24 | 
  25 |     await page.goto("https://rahulshettyacademy.com/AutomationPractice/#");
  26 |     //   await page.goto("https://bing.com/");
  27 |     //   await page.goBack();
  28 |     //   await page.goForward(); 
  29 |     await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  30 |     await page.screenshot({path:'screenshot.png'});
  31 |     await page.getByPlaceholder("Hide/Show Example").screenshot({path:'partialScreenshot.png'});
  32 |     await page.getByRole('button', { name: 'Hide' }).click();
  33 |     await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
  34 |     
  35 | });
  36 | 
  37 | test.only('Visual Test', async ({ page }) => 
  38 |     {
  39 | 
  40 |     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
> 41 |     expect(await page.screenshot()).toMatchSnapshot('landingPage.png');
     |                                     ^ Error: expect(Buffer).toMatchSnapshot(expected) failed
  42 |     
  43 | }); 
```