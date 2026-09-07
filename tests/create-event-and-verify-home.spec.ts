// spec: EventHub Admin Event Creation
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('EventHub Admin Event Creation', () => {
  test('Create an event and verify it on the home page', async ({ page }) => {
    // 1. Navigate to https://eventhub.rahulshettyacademy.com/login
    await page.goto('https://eventhub.rahulshettyacademy.com/login');

    // 2. Enter the email address pratik350442@gmail.com
    await page.getByRole('textbox', { name: 'Email' }).fill('pratik350442@gmail.com');

    // 3. Enter the password Test@12345
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@12345');

    // 4. Submit the login form
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 5. Open the Admin menu
    await page.getByRole('button', { name: 'Admin' }).click();

    // 6. Open Manage Events
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();

    // 7. Start creating a new event
    await expect(page.getByRole('heading', { name: '+ New Event' })).toBeVisible();

    // 8. Fill the event form with test data: title "Playwright Test Event 2026", description "Event created by Playwright automation", location "Bengaluru", date "2026-12-15", time "18:30", and available seats "100"
    await page.getByTestId('event-title-input').fill('Playwright Test Event 2026');
    await page.getByRole('textbox', { name: 'Describe the event…' }).fill('Event created by Playwright automation');
    await page.getByLabel('Category*').selectOption('Workshop');
    await page.getByRole('textbox', { name: 'City*' }).fill('Bengaluru');
    await page.getByRole('textbox', { name: 'Venue*' }).fill('Bengaluru Test Arena');
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-12-15T18:30');
    await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('50');
    await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('100');

    // 9. Submit the new event form
    await page.getByTestId('add-event-btn').click();
    await expect(page.getByRole('cell', { name: 'Playwright Test Event 2026' })).toBeVisible();

    // 10. Navigate to the public home page
    await page.getByTestId('nav-home').click();

    // 11. Verify that "Playwright Test Event 2026" is visible on the home page
    await expect(page.getByRole('link', { name: 'Playwright Test Event' })).toBeVisible();
  });
});
