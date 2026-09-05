const {  expect } = require('@playwright/test');
const { test } = require('../Utils/fixtures.js');

test('fixtures demo', async ({ authenticatedPage, createOrder, testDataForCreateOrder }) => {
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await authenticatedPage.getByRole('button', { name: '  ORDERS' }).click();
    await authenticatedPage.locator("tbody").waitFor({state:'visible'});
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForCreateOrder.productName)
});
