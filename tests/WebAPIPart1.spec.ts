import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../Utils_ts/APIUtils';
import { APIRequestContext, APIResponse } from '@playwright/test';

interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

interface OrderPayload {
  orders: { country: string; productOrderedId: string }[];
}



const loginPayLoad:LoginPayload = {
  userEmail: "pratik350442@gmail.com",
  userPassword: "Test@12345"
};

const orderPayload:OrderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }]
};

let response: any;

test.describe('Order placement flow', () => {

  test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
    await apiContext.dispose();
  });

  test.beforeEach(async ({ page }) => {
    // Inject token before each test
    page.addInitScript(value => {
      window.localStorage.setItem('token', value);
    }, response.token);
  });

  test('Place order and verify in Orders tab', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.locator(".card-body b").first().waitFor();

    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
      const orderText = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(orderText ?? '')) {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }

    let orderIdSummary :any;
    orderIdSummary= await page.locator("div.col-text").textContent();
    expect(response.orderId.includes(orderIdSummary)).toBeTruthy();
  });

    test('Place order and verify in Orders tab2', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.locator(".card-body b").first().waitFor();

    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
      const orderText = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(orderText ?? '')) {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    };

    let orderIdSummary :any;
    orderIdSummary = await page.locator("div.col-text").textContent();
    expect(response.orderId.includes(orderIdSummary)).toBeTruthy();
  });

});
