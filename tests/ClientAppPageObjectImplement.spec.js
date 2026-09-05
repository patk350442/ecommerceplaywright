const { expect } = require('@playwright/test');
const {POManager}=require('../pageobjects/POManager')
const dataset=JSON.parse(JSON.stringify(require('../Utils/placeOrderTestData_Parameterization.json')));
const {test}=require('../Utils/TestDataFixtures')

//for(const data of dataset) test.only(`Test with ${data.productName}`, async ({ page }) => {
//{} await loginPage.validLogin(data.username, data.password);
  
for(const data of dataset)
{
test(`Test with ${data.productName}`, async ({ page }) => {

  const poManager=new POManager(page);
 // const username='pratik350442@gmail.com'
 // const password='Test@12345';
 // const productName = "ZARA COAT 3";
  const countryName=' India';
  const countryCode='ind';
  const loginPage=poManager.getLoginPage();
  await loginPage.goTO();
  await loginPage.validLogin(data.username, data.password);
  const dashboardPage =poManager.getDashboardPage();
  await dashboardPage.searchProductAndAddToCart(data.productName);
  await dashboardPage.navigateToCart();
  const cartPage=poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(data.productName);
  await cartPage.clickCheckout();
  const orderDetailsPage=poManager.getOrderDetailsPage();
  await orderDetailsPage.searchCountryAndSelect(countryCode,countryName);
  await orderDetailsPage.enterCardDetails();
  await orderDetailsPage.ApplyCoupon();
  await orderDetailsPage.verifyEmailId(data.username);
  await orderDetailsPage.submitAndConfirmOrder();
  const orderId=await orderDetailsPage.getOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const orderHistoryPage=poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderandView(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderIdFromOrderHistory())).toBeTruthy();
  console.log(await orderHistoryPage.getOrderIdFromOrderHistory());
});
}

test('Test with test data from fixtures', async ({ page, testDataPlaceOrder }) => {

  const poManager=new POManager(page);
 // const username='pratik350442@gmail.com'
 // const password='Test@12345';
 // const productName = "ZARA COAT 3";  
  const countryName=' India';
  const countryCode='ind';
  const loginPage=poManager.getLoginPage();
  await loginPage.goTO();
  await loginPage.validLogin(testDataPlaceOrder.username, testDataPlaceOrder.password);
  const dashboardPage =poManager.getDashboardPage();
  await dashboardPage.searchProductAndAddToCart(testDataPlaceOrder.productName);
  await dashboardPage.navigateToCart();
  const cartPage=poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(testDataPlaceOrder.productName);
  await cartPage.clickCheckout();
  const orderDetailsPage=poManager.getOrderDetailsPage();
  await orderDetailsPage.searchCountryAndSelect(countryCode,countryName);
  await orderDetailsPage.enterCardDetails();
  await orderDetailsPage.ApplyCoupon();
  await orderDetailsPage.verifyEmailId(testDataPlaceOrder.username);
  await orderDetailsPage.submitAndConfirmOrder();
  const orderId=await orderDetailsPage.getOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const orderHistoryPage=poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderandView(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderIdFromOrderHistory())).toBeTruthy();
  console.log(await orderHistoryPage.getOrderIdFromOrderHistory());
});


/* with array comparison
test.only('Test with Browser Context', async ({ page }) => {
  const products = page.locator("#products .card-body");
  const expectedProducts = ["ZARA COAT 3", "iphone 13 pro"];

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const signIn = page.locator("#login");

  await userName.fill("pratik350442@gmail.com");
  await password.fill("Test@12345");
  await signIn.click();

  await page.waitForLoadState("networkidle");
  console.log(await page.locator(".card-body b").allTextContents());

  // Add products to cart
  for (const product of expectedProducts) {
    await page.locator("#products .card")
      .filter({ hasText: product })
      .getByRole('button', { name: ' Add To Cart' })
      .click();
  }

  // Go to cart
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div.cart").waitFor();

  // Get cart product names
  const cartProducts = await page.locator("div.cart h3").allTextContents();
  console.log("Cart contains:", cartProducts);

  // Verify all expected products are present
  for (const product of expectedProducts) {
    expect(cartProducts).toContain(product);
  }
});
*/