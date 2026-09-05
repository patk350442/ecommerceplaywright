

class DashboardPage{
    constructor(page)
    {
        this.page=page;
        this.products = page.locator("#products .card-body");
        this.productsText= page.locator(".card-body b");
        this.cart= page.locator("[routerlink*='cart']");
        this.orders=page.getByRole('button',{name:'  ORDERS'});
    }

    async searchProductAndAddToCart(productName)
    {
         
          //await page.waitForLoadState("networkidle");
          const titles= await this.productsText.allTextContents()
          console.log(titles);
         // await page.pause();
        //  await page.locator("#products .card").filter({hasText : "iphone 13 pro" }).getByRole('button' , { name : ' Add To Cart'}).click();
          const count = await this.products.count();
          for(let i = 0; i < count; ++i )
          { 
              if(await this.products.nth(i).locator("b").textContent() === productName)
              {
                await this.products.nth(i).locator("text = Add To Cart").click();
                break;
              }
          }
    }

    async navigateToCart()
    {
        await this.cart.click();

    }

    async navigateToOrders()
    {
        await this.orders.click();

    }
}
module.exports={DashboardPage};