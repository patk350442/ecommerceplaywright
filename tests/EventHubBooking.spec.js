const { test, expect } = require('@playwright/test');

const eventHubUrl = 'https://eventhub.rahulshettyacademy.com';
const email = process.env.EVENTHUB_EMAIL || 'pratik350442@gmail.com';
const password = process.env.EVENTHUB_PASSWORD || 'Test@12345';

test('books one World Tech Summit ticket and reduces availability', async ({ page }) => {
  await page.goto(`${eventHubUrl}/login`);
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL(`${eventHubUrl}/`);

  await page.goto(`${eventHubUrl}/events/1`);
  const availability = page.getByText(/\d+ \/ 500 seats/);
  const before = Number((await availability.textContent()).match(/\d+/)[0]);

  await page.getByRole('textbox', { name: 'Full Name*' }).fill('Playwright Test User');
  await page.getByRole('textbox', { name: 'Email*' }).fill(email);
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('+91 98765 43210');
  await page.getByRole('button', { name: 'Confirm Booking' }).click();

  await expect(page.getByRole('heading', { name: /Booking Confirmed!/ })).toBeVisible();
  await page.reload();

  const after = Number((await availability.textContent()).match(/\d+/)[0]);
  expect(after).toBe(before - 1);
});
