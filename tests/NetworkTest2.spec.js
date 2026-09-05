const { test, expect } = require('@playwright/test')
test('@API Security test', async ({ page }) => {

    //page.route('**/*.{jpeg,png,jpg}', route=> route.abort())
    //page.route('**/*.css', route=> route.abort())
    const email = "pratik350442@gmail.com";
    const products = page.locator("#products .card-body");
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//    page.on('request',request=>console.log(request.url()));
    page.on('response',Response=>
    {
//        console.log(Response.url(),Response.status());
        if(Response.status()>300)
        {
               console.log(Response.url(), Response.status());
        }
    }
    );
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator("#login");
    await userName.fill(email);
    await password.fill("Test@12345");
    await signIn.click();
    await page.locator(".card-body b").first().waitFor();

    await page.getByRole('button', { name: '  ORDERS' }).click();
    await page.locator("tbody").waitFor();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a94866021054ba465fed742'})
    )
    await page.getByRole('button', { name: 'View' }).first().click();

     await expect(page.getByText("You are not authorize to view this order")).toBeVisible();

     //await expect(page.locator("p.blink_me").last()).toHaveText("You are not authorize to view this order");


});