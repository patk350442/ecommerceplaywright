const { test, expect } = require('@playwright/test');

test.only('Test with Browser Context', async ({ page }) => {

  const email = "pratik350442@gmail.com";
  const products = page.locator("#products .card-body");
  const productName = "ZARA COAT 3";
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const userName = page.getByPlaceholder("email@example.com");
  const password = page.getByPlaceholder("enter your passsword");
  const signIn = page.getByRole('button', { name: 'Login' });
  await userName.fill(email);
  await password.fill("Test@12345");
  await signIn.click();
  await page.locator(".card-body b").first().waitFor();
  await page.locator("#products .card").filter({ hasText: "iphone 13 pro" }).getByRole('button', { name: ' Add To Cart' }).click();
  await page.locator("#products .card").filter({ hasText: "ZARA COAT 3" }).getByRole('button', { name: ' Add To Cart' }).click();

  // await page.locator("[routerlink*='cart']").click();
  await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
  await page.locator("div.cart").waitFor();
  // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  //expect(bool).toBeTruthy();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  //  await page.locator("text =Checkout").click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  //  await page.locator("[placeholder='Select Country']").pressSequentially("india");
 await page.getByPlaceholder("Select Country").pressSequentially("india");
  await page.getByRole('button',{name:'India'}).nth(1).click();
  await page.locator(".field input.input.txt.text-validated").fill("");
  await page.locator(".field input.input.txt.text-validated").pressSequentially("4542 9931 9292 2294");
 // await page.getByRole('textbox',{name:'Credit Card Number '}).fill("");
 // await page.getByRole('textbox',{name:'Credit Card Number '}).pressSequentially("4542 9931 9292 2294");
  const dateDropDown = page.locator(".input.ddl").first();
  dateDropDown.selectOption("02");
  const monthDropDown = page.locator(".input.ddl").last();
  monthDropDown.selectOption("02");
  await page.locator(".field.small .input.txt").first().fill("123");
  await page.locator(".field.small .input.txt").last().fill("test card");
  await page.locator("[name='coupon']").fill("rahulshettyacademy");
  await page.getByRole('button', { name: 'Apply Coupon' }).click();
 // await expect(page.locator(".mt-1.ng-star-inserted")).toContainText("Coupon Applied");
 await expect(page.getByText("Coupon Applied")).toBeVisible();
  await expect(page.locator(".user__name.mt-5 label")).toHaveText(email);
  // await page.getByRole('link', { name: 'Place Order' }).click(); didnt work
  await page.getByText("Place Order ").click();
 // await page.locator("a.btnn.action__submit.ng-star-inserted").click();
  //await page.locator(".hero-primary").waitFor();
 //await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
 await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
 const rawOrderId = await page.locator("label.ng-star-inserted").first().textContent();
 const orderId = rawOrderId.replace(/\|/g, '').trim(); 
 console.log(orderId);
  await page.getByRole('button', { name: '  ORDERS' }).click();
  await page.locator("tbody").waitFor();

 // const rows = page.locator("tbody tr");
  await page.locator("tbody tr").filter({hasText:orderId}).getByRole('button').first().click();
 // for (let i = 0; i < await rows.count(); ++i) {

  //  if (orderId.includes(await rows.nth(i).locator("th").textContent())) {
 //     await rows.nth(i).locator("button").first().click();
   //   break;
 //   }
 // }


  // await expect(page.locator("div.col-text")).toContainText(orderId);
  await expect(page.getByText(orderId)).toBeVisible();
  const orderIdSummary = await page.locator("div.col-text").textContent();

  expect(orderId.includes(orderIdSummary)).toBeTruthy();

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