const { test, expect } = require('@playwright/test');

test.describe('VRL Travels Bus Booking', () => {
  test('Search and generate QR code', async ({ page }) => {
    // 1. Navigate to https://www.vrlbus.in/
    await page.goto('https://www.vrlbus.in/');
    const promoClose = page.locator('#largeModal .btn-close');
    if (await promoClose.isVisible().catch(() => false)) await promoClose.click();

    // 2. Enter source Banahatti (Karnataka)
    await page.locator('#FromCity').fill('Banahatti');
    await page.locator('[role="option"]:has-text("Banahatti (Karnataka)")').click();

    // 3. Enter destination Bangalore (Karnataka)
    await page.getByRole('combobox', { name: 'Destination' }).fill('Bangalore');
    await page.locator('[role="option"]:has-text("Bangalore (Karnataka)")').click();

    // 4. Select a journey date one calendar month from today
    const today = new Date();
    const journeyDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const targetMonth = journeyDate.toLocaleString('en-US', { month: 'long' });
    const targetYear = journeyDate.getFullYear().toString();
    const targetDay = journeyDate.getDate().toString();
    await page.locator('#txtFromDate').click();
    for (let monthAdvance = 0; monthAdvance < 12; monthAdvance++) {
      const displayedMonth = await page.locator('.datepicker-days .datepicker-switch').textContent();
      if (displayedMonth?.includes(`${targetMonth} ${targetYear}`)) break;
      await page.locator('.datepicker-days th.next').click();
    }
    await page.locator(`.datepicker-days td.day:not(.new):not(.old):text-is("${targetDay}")`).click();
    const expectedDate = `${String(journeyDate.getDate()).padStart(2, '0')}-${String(journeyDate.getMonth() + 1).padStart(2, '0')}-${journeyDate.getFullYear()}`;
    await expect(page.locator('#txtFromDate')).toHaveValue(expectedDate);

    // 5. Click Search
    await page.getByRole('button', { name: 'Search' }).click();

    // 6. After search results appear, click View Seats
    await expect(page.getByText(/Buses Found/)).toBeVisible();
    await page.locator('button:has-text("View Seats")').click();

    // 7. Select the first two seats currently available for booking
    const availableSeats = page.locator('.seat-icon.seat_available');
    await expect(availableSeats.first()).toBeVisible();
    expect(await availableSeats.count()).toBeGreaterThanOrEqual(2);
    for (let seatIndex = 0; seatIndex < 2; seatIndex++) {
      await availableSeats.nth(seatIndex).click();
    }

    // 8. Click Next
    await page.getByRole('button', { name: 'Next' }).click();

    // 9. Select any boarding point and the first required dropping point
    await page.locator('input[name="BoardingSelect"]').first().click();
    await page.locator('input[name="DroppingSelect"]').first().click();

    // 10. Click Continue
    await page.getByRole('button', { name: 'CONTINUE' }).click();

    // 11. Enter email and phone; the site's validation requires @ in the email
    await page.locator('#txtEmail').fill('prateekmandi007@gmail.com');
    await page.locator('#txtMobileNo').fill('9449168988');

    // 12. Enter passenger 1 as Prateek Mandi, male, age 33
    await page.locator('#Journy_0_0_name').fill('Prateek');
    await page.locator('input[name="lastname"]').first().fill('Mandi');
    await page.locator('input[name="gender"]').first().click();
    await page.locator('#Journy_0_0_age').fill('33');

    // 13. Enter passenger 2 as Priya Belagali, female, age 31
    await page.locator('#Journy_0_1_name').fill('Priya');
    await page.locator('input[name="lastname"]').nth(1).fill('Belagali');
    await page.locator('input[name="gender"]').nth(3).click();
    await page.locator('#Journy_0_1_age').fill('31');

    // 14. Click Proceed
    await page.getByRole('button', { name: 'Proceed' }).click();

    // 15. Remove the site's promotional overlay so the real Pay control is actionable.
    await page.waitForTimeout(1000);
    await page.locator('.MuiDialog-root').evaluateAll((dialogs) => {
      for (const dialog of dialogs) dialog.remove();
    });

    // 16. Click Pay
    await page.locator('button:has-text("Pay")').click({ timeout: 15000 });
    await expect(page).toHaveURL(/payments\.juspay\.in\/payment-page/);

    // 17. Generate and verify the QR code is shown
    await page.getByRole('button', { name: 'Generate QR Code' }).click();
    await expect(page.getByRole('img', { name: 'QR Code' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Scan QR and Pay' })).toBeVisible();

    // Keep the generated QR payment page open for 30 seconds without approving payment.
    await page.waitForTimeout(30_000);
  });
});
