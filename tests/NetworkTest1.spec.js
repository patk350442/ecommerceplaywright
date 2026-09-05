const {test, expect, request}= require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils');
const loginPayLoad = {userEmail: "pratik350442@gmail.com", userPassword: "Test@12345"};
const oderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = {data:[], message:"No Orders"};
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

test('[@API] Place order', async ({ page }) => {

    page.addInitScript( value => 
    {
        window.localStorage.setItem('token', value);
    }, response.token);
 
 
  const email= "pratik350442@gmail.com";  
  const products = page.locator("#products .card-body");
  const productName = "ZARA COAT 3";
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator(".card-body b").first().waitFor();
  
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
   async route=>{
       const response=await page.request.fetch(route.request());
        let body= JSON.stringify(fakePayLoadOrders);
       route.fulfill({
        response,
        body,
       });
    });
  await page.pause();
  await  page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  await expect(page.getByText(" You have No Orders to show at this time.")).toBeVisible();
    console.log(await page.locator(".mt-4").textContent());
}); 