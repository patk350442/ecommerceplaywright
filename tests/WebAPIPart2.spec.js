const { test, expect } = require('@playwright/test');
let webContext;
test.beforeAll(async ({browser}) => {
    const context= await browser.newContext();
    const page= await context.newPage();
    const email = "pratik350442@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator("#login");
    await userName.fill(email);
    await password.fill("Test@12345");
    await signIn.click();
    await page.locator(".card-body b").first().waitFor();
    await context.storageState({path: 'state.json'});
    webContext= await browser.newContext({storageState:'state.json'});
});

test('Test-storageState 1', async ({  }) => {

    const page= await webContext.newPage();
    const email = "pratik350442@gmail.com";
    const products = page.locator("#products .card-body");
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    //await page.waitForLoadState("networkidle");
    console.log(await page.locator(".card-body b").allTextContents());
    // await page.pause();
    await page.locator("#products .card").filter({ hasText: "iphone 13 pro" }).getByRole('button', { name: ' Add To Cart' }).click();
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text = Add To Cart").click();
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div.cart").waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text =Checkout").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("india");
    const dropDown = page.locator(".ta-results.list-group.ng-star-inserted");
    await dropDown.waitFor();
    const optionsCount = await dropDown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {

        //let option = await dropDown.locator("button").nth(i).textContent();
        if (await dropDown.locator("button").nth(i).textContent() === " India") {

            await dropDown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".field input.input.txt.text-validated").fill("");
    await page.locator(".field input.input.txt.text-validated").pressSequentially("4542 9931 9292 2294");
    const dateDropDown = page.locator(".input.ddl").first();
    dateDropDown.selectOption("02");
    const monthDropDown = page.locator(".input.ddl").last();
    monthDropDown.selectOption("02");
    await page.locator(".field.small .input.txt").first().fill("123");
    await page.locator(".field.small .input.txt").last().fill("test card");
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    await expect(page.locator(".mt-1.ng-star-inserted")).toContainText("Coupon Applied");
    await expect(page.locator(".user__name.mt-5 label")).toHaveText(email);
    // await page.getByRole('link', { name: 'Place Order' }).click(); didnt work
    //await page.getByText("Place Order ").click();
    await page.locator("a.btnn.action__submit.ng-star-inserted").click();
    //await page.locator(".hero-primary").waitFor();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator("label.ng-star-inserted").first().textContent();
    console.log(orderId);
    await page.getByRole('button', { name: '  ORDERS' }).click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {

        if (orderId.includes(await rows.nth(i).locator("th").textContent())) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }


    // await expect(page.locator("div.col-text")).toContainText(orderId);
    const orderIdSummary = await page.locator("div.col-text").textContent();

    expect(orderId.includes(orderIdSummary)).toBeTruthy();

});


test('Test-storageState 2', async ({  }) => {

    const page= await webContext.newPage();
    const email = "pratik350442@gmail.com";
    const products = page.locator("#products .card-body");
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    
    //await page.waitForLoadState("networkidle");
    console.log(await page.locator(".card-body b").allTextContents());
    // await page.pause();
    await page.locator("#products .card").filter({ hasText: "iphone 13 pro" }).getByRole('button', { name: ' Add To Cart' }).click();
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text = Add To Cart").click();
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div.cart").waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text =Checkout").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("india");
    const dropDown = page.locator(".ta-results.list-group.ng-star-inserted");
    await dropDown.waitFor();
    const optionsCount = await dropDown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {

        //let option = await dropDown.locator("button").nth(i).textContent();
        if (await dropDown.locator("button").nth(i).textContent() === " India") {

            await dropDown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".field input.input.txt.text-validated").fill("");
    await page.locator(".field input.input.txt.text-validated").pressSequentially("4542 9931 9292 2294");
    const dateDropDown = page.locator(".input.ddl").first();
    dateDropDown.selectOption("02");
    const monthDropDown = page.locator(".input.ddl").last();
    monthDropDown.selectOption("02");
    await page.locator(".field.small .input.txt").first().fill("123");
    await page.locator(".field.small .input.txt").last().fill("test card");
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    await expect(page.locator(".mt-1.ng-star-inserted")).toContainText("Coupon Applied");
    await expect(page.locator(".user__name.mt-5 label")).toHaveText(email);
    // await page.getByRole('link', { name: 'Place Order' }).click(); didnt work
    //await page.getByText("Place Order ").click();
    await page.locator("a.btnn.action__submit.ng-star-inserted").click();
    //await page.locator(".hero-primary").waitFor();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator("label.ng-star-inserted").first().textContent();
    console.log(orderId);
    await page.getByRole('button', { name: '  ORDERS' }).click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {

        if (orderId.includes(await rows.nth(i).locator("th").textContent())) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }


    // await expect(page.locator("div.col-text")).toContainText(orderId);
    const orderIdSummary = await page.locator("div.col-text").textContent();

    expect(orderId.includes(orderIdSummary)).toBeTruthy();

});

