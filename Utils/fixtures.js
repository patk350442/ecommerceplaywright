const  base = require('@playwright/test');
const {APIUtils}= require('./APIUtils.js');
const {  request } = require('@playwright/test');

const loginPayLoad = {userEmail: "pratik350442@gmail.com", userPassword: "Test@12345"};
const oderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

exports.test = base.test.extend(
    {


        authenticatedPage: async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            const email = "pratik350442@gmail.com";
            await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
            const userName = page.locator("#userEmail");
            const password = page.locator("#userPassword");
            const signIn = page.locator("#login");
            await userName.fill(email);
            await password.fill("Test@12345");
            await signIn.click();
            await page.locator(".card-body b").first().waitFor();
            await use(page);
            await context.close();

        },
 
        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, loginPayLoad);
            const  response = await apiUtils.createOrder(oderPayload);
            await use(response);
            await apiContext.dispose();
        },

        testDataForCreateOrder: {
            productName : 'ADIDAS ORIGINAL'
        }

    });