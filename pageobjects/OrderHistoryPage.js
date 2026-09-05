class OrderHistoryPage {
    constructor(page) {
        this.page = this.page;
        this.ordersContentBody = page.locator("tbody");
        this.orderRows = page.locator("tbody tr");
        this.summaryOrderId = page.locator("div.col-text");

    }

    async searchOrderandView(orderId) 
    {
        await this.ordersContentBody.waitFor();
        const rows = this.orderRows;
        for (let i = 0; i < await rows.count(); ++i) {

            if (orderId.includes(await rows.nth(i).locator("th").textContent())) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async getOrderIdFromOrderHistory()
    {
        return await this.summaryOrderId.textContent();
    }

}
module.exports={OrderHistoryPage}



