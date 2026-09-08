# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: vrl-travels-bus-booking.spec.js >> VRL Travels Bus Booking >> Search and generate QR code
- Location: tests\vrl-travels-bus-booking.spec.js:4:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=f13e7]:
  - banner [ref=f13e8]:
    - generic [ref=f13e10]:
      - img "logo.svg?d=1.0.0.3" [ref=f13e11]
      - generic [ref=f13e12]:
        - generic [ref=f13e13]: Amount
        - generic [ref=f13e15]:
          - generic [ref=f13e16]: Complete your payment
          - generic [ref=f13e17]: ₹1,870
  - generic [ref=f13e21]:
    - generic [ref=f13e22]: Payment Methods
    - generic [ref=f13e33]:
      - navigation [ref=f13e34]:
        - tablist [ref=f13e36]:
          - tab "svg+xml;utf8 UPI" [selected]:
            - generic:
              - img "svg+xml;utf8"
              - generic: UPI
          - tab "svg+xml;utf8 Wallets" [ref=f13e37] [cursor=pointer]:
            - generic [ref=f13e38]:
              - img "svg+xml;utf8" [ref=f13e39]
              - generic [ref=f13e40]: Wallets
          - tab "svg+xml;utf8 Add New Card" [ref=f13e42] [cursor=pointer]:
            - generic [ref=f13e43]:
              - img "svg+xml;utf8" [ref=f13e44]
              - generic [ref=f13e45]: Add New Card
          - tab "svg+xml;utf8 Netbanking" [ref=f13e47] [cursor=pointer]:
            - generic [ref=f13e48]:
              - img "svg+xml;utf8" [ref=f13e49]
              - generic [ref=f13e50]: Netbanking
        - img "juspay brand" [ref=f13e53]
      - main [ref=f13e54]:
        - generic [ref=f13e56]:
          - button "Go Back" [ref=f13e57] [cursor=pointer]:
            - img "svg+xml;utf8" [ref=f13e58]
          - generic [ref=f13e59]: Go Back
        - generic [ref=f13e73]:
          - img "QR Code" [ref=f13e75]
          - status [ref=f13e76]:
            - heading "Scan QR and Pay" [level=1] [ref=f13e77]
          - generic [ref=f13e79]:
            - img "phonepe" [ref=f13e80]
            - img "googlepay" [ref=f13e81]
            - img "paytm" [ref=f13e82]
            - img "cred logo" [ref=f13e83]
            - img "amazonpay" [ref=f13e84]
            - img "bhim" [ref=f13e85]
          - generic [ref=f13e86]: Scan the QR from your mobile using any UPI app such as PhonePe, Google Pay, Paytm, CRED, Amazon Pay, BHIM etc.
          - generic [ref=f13e94]:
            - generic [ref=f13e95]: "Approve payment within:"
            - generic [ref=f13e96]: 09:49
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('VRL Travels Bus Booking', () => {
  4  |   test('Search and generate QR code', async ({ page }) => {
  5  |     // 1. Navigate to https://www.vrlbus.in/
  6  |     await page.goto('https://www.vrlbus.in/');
  7  |     const promoClose = page.locator('#largeModal .btn-close');
  8  |     if (await promoClose.isVisible().catch(() => false)) await promoClose.click();
  9  | 
  10 |     // 2. Enter source Banahatti (Karnataka)
  11 |     await page.locator('#FromCity').fill('Banahatti');
  12 |     await page.locator('[role="option"]:has-text("Banahatti (Karnataka)")').click();
  13 | 
  14 |     // 3. Enter destination Bangalore (Karnataka)
  15 |     await page.getByRole('combobox', { name: 'Destination' }).fill('Bangalore');
  16 |     await page.locator('[role="option"]:has-text("Bangalore (Karnataka)")').click();
  17 | 
  18 |     // 4. Select a journey date one calendar month from today
  19 |     const today = new Date();
  20 |     const journeyDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  21 |     const targetMonth = journeyDate.toLocaleString('en-US', { month: 'long' });
  22 |     const targetYear = journeyDate.getFullYear().toString();
  23 |     const targetDay = journeyDate.getDate().toString();
  24 |     await page.locator('#txtFromDate').click();
  25 |     for (let monthAdvance = 0; monthAdvance < 12; monthAdvance++) {
  26 |       const displayedMonth = await page.locator('.datepicker-days .datepicker-switch').textContent();
  27 |       if (displayedMonth?.includes(`${targetMonth} ${targetYear}`)) break;
  28 |       await page.locator('.datepicker-days th.next').click();
  29 |     }
  30 |     await page.locator(`.datepicker-days td.day:not(.new):not(.old):text-is("${targetDay}")`).click();
  31 |     const expectedDate = `${String(journeyDate.getDate()).padStart(2, '0')}-${String(journeyDate.getMonth() + 1).padStart(2, '0')}-${journeyDate.getFullYear()}`;
  32 |     await expect(page.locator('#txtFromDate')).toHaveValue(expectedDate);
  33 | 
  34 |     // 5. Click Search
  35 |     await page.getByRole('button', { name: 'Search' }).click();
  36 | 
  37 |     // 6. After search results appear, click View Seats
  38 |     await expect(page.getByText(/Buses Found/)).toBeVisible();
  39 |     await page.locator('button:has-text("View Seats")').click();
  40 | 
  41 |     // 7. Select the first two seats currently available for booking
  42 |     const availableSeats = page.locator('.seat-icon.seat_available');
  43 |     await expect(availableSeats.first()).toBeVisible();
  44 |     expect(await availableSeats.count()).toBeGreaterThanOrEqual(2);
  45 |     for (let seatIndex = 0; seatIndex < 2; seatIndex++) {
  46 |       await availableSeats.nth(seatIndex).click();
  47 |     }
  48 | 
  49 |     // 8. Click Next
  50 |     await page.getByRole('button', { name: 'Next' }).click();
  51 | 
  52 |     // 9. Select any boarding point and the first required dropping point
  53 |     await page.locator('input[name="BoardingSelect"]').first().click();
  54 |     await page.locator('input[name="DroppingSelect"]').first().click();
  55 | 
  56 |     // 10. Click Continue
  57 |     await page.getByRole('button', { name: 'CONTINUE' }).click();
  58 | 
  59 |     // 11. Enter email and phone; the site's validation requires @ in the email
  60 |     await page.locator('#txtEmail').fill('prateekmandi007@gmail.com');
  61 |     await page.locator('#txtMobileNo').fill('9449168988');
  62 | 
  63 |     // 12. Enter passenger 1 as Prateek Mandi, male, age 33
  64 |     await page.locator('#Journy_0_0_name').fill('Prateek');
  65 |     await page.locator('input[name="lastname"]').first().fill('Mandi');
  66 |     await page.locator('input[name="gender"]').first().click();
  67 |     await page.locator('#Journy_0_0_age').fill('33');
  68 | 
  69 |     // 13. Enter passenger 2 as Priya Belagali, female, age 31
  70 |     await page.locator('#Journy_0_1_name').fill('Priya');
  71 |     await page.locator('input[name="lastname"]').nth(1).fill('Belagali');
  72 |     await page.locator('input[name="gender"]').nth(3).click();
  73 |     await page.locator('#Journy_0_1_age').fill('31');
  74 | 
  75 |     // 14. Click Proceed
  76 |     await page.getByRole('button', { name: 'Proceed' }).click();
  77 | 
  78 |     // 15. Remove the site's promotional overlay so the real Pay control is actionable.
  79 |     await page.waitForTimeout(1000);
  80 |     await page.locator('.MuiDialog-root').evaluateAll((dialogs) => {
  81 |       for (const dialog of dialogs) dialog.remove();
  82 |     });
  83 | 
  84 |     // 16. Click Pay
  85 |     await page.locator('button:has-text("Pay")').click({ timeout: 15000 });
  86 |     await expect(page).toHaveURL(/payments\.juspay\.in\/payment-page/);
  87 | 
  88 |     // 17. Generate and verify the QR code is shown
  89 |     await page.getByRole('button', { name: 'Generate QR Code' }).click();
  90 |     await expect(page.getByRole('img', { name: 'QR Code' })).toBeVisible();
  91 |     await expect(page.getByRole('heading', { name: 'Scan QR and Pay' })).toBeVisible();
  92 | 
  93 |     // Keep the generated QR payment page open for 30 seconds without approving payment.
> 94 |     await page.waitForTimeout(30_000);
     |                ^ Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
  95 |   });
  96 | });
  97 | 
```