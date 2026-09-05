
import {test, expect,Locator,Page} from "@playwright/test";
export class CartPage
{
        page:Page;
        cartProducts:Locator; 
        checkout:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.cartProducts=page.locator("div.cart"); 
        this.checkout=page.locator("text =Checkout");

    }


async verifyProductIsDisplayed(ProductName:String)
{
    await this.cartProducts.waitFor({state:'visible'});
    await this.page.waitForTimeout(500);
    const bool = await this.getProductLocator(ProductName).isVisible();
    expect(bool).toBeTruthy();
}
getProductLocator(ProductName:String)
{
      return this.page.locator(`h3:has-text("${ProductName}")`);
    // return this.page.locator("h3:has-text('"+ProductName+"')");
}

async clickCheckout()
{
    await this.checkout.click();
}
}
module.exports={CartPage}


/*
  await page.locator("div.cart").waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text =Checkout").click();
  */