const {test, expect, request}= require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils');
const loginPayLoad = {userEmail: "pratik350442@gmail.com", userPassword: "Test@12345"};
const oderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;
test.beforeAll( async () =>
{
    const apiContext= await request.newContext();
    const apiUtils= new APIUtils(apiContext, loginPayLoad);
    response= await apiUtils.createOrder(oderPayload);

});

test.beforeEach(  () =>
{

});

test.only('Place order', async ({ page }) => {

    page.addInitScript( value => 
    {
        window.localStorage.setItem('token', value);
    }, response.token);
 
 
  const email= "pratik350442@gmail.com";  
  const products = page.locator("#products .card-body");
  const productName = "ZARA COAT 3";
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator(".card-body b").first().waitFor();
  
  await page.getByRole('button',{name:'  ORDERS'}).click();
  await page.locator("tbody").waitFor();
  const rows= page.locator("tbody tr");
  for(let i= 0; i< await rows.count(); ++i)
  {
      
      if(response.orderId.includes(await rows.nth(i).locator("th").textContent()))
      {
          await rows.nth(i).locator("button").first().click();
          break;
      }
  }
  

 // await expect(page.locator("div.col-text")).toContainText(orderId);
  const orderIdSummary= await page.locator("div.col-text").textContent();
  await page.pause();
  expect(response.orderId.includes(orderIdSummary)).toBeTruthy();

}); 