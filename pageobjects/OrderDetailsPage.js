const { expect } = require("@playwright/test");

class OrderDetailsPage 
{
    constructor(page) 
    {
        this.page = page;
        this.selectCountry = page.locator("[placeholder='Select Country']");
        this.dropdownOptions = page.locator(".ta-results.list-group.ng-star-inserted");
        this.creditCardnumber = page.locator(".field input.input.txt.text-validated");
        this.dateDropdown = page.locator(".input.ddl").first();
        this.monthDropDown = page.locator(".input.ddl").last();
        this.cvvCode = page.locator(".field.small .input.txt").first();
        this.cardName = page.locator(".field.small .input.txt").last();
        this.couponText = page.locator("[name='coupon']");
        this.couponButton = page.getByRole('button', { name: 'Apply Coupon' });
        this.couponSuccessText = page.locator(".mt-1.ng-star-inserted");
        this.emailInOrderDetails = page.locator(".user__name.mt-5 label");
        this.placeOrder = page.locator("a.btnn.action__submit.ng-star-inserted");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderID = page.locator("label.ng-star-inserted").first();
    }

    async searchCountryAndSelect(countryCode, countryName) 
    {
        await this.selectCountry.pressSequentially(countryCode);
        await this.dropdownOptions.waitFor({ state: 'visible' });
        const optionsCount = await this.dropdownOptions.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) 
        {

            //let option = await this.dropdownOptions.locator("button").nth(i).textContent();
            if (await this.dropdownOptions.locator("button").nth(i).textContent() === countryName) 
            {

                await this.dropdownOptions.locator("button").nth(i).click();
                break;
            }
        }

    }

    async verifyEmailId(username) 
    {
        await expect(this.emailInOrderDetails).toHaveText(username);
    }

    async submitAndConfirmOrder() 
    {
        await this.placeOrder.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
    }

    async getOrderId() 
    {
        return await this.orderID.textContent();
    }

    async enterCardDetails() 
    {
        await this.creditCardnumber.fill("");
        await this.creditCardnumber.pressSequentially("4542 9931 9292 2294");
        await this.dateDropdown.selectOption("02");
        await this.monthDropDown.selectOption("02");
        await this.cvvCode.fill("123");
        await this.cardName.fill("test card");
    }

    async ApplyCoupon() 
    {
        await this.couponText.fill("rahulshettyacademy");
        await this.couponButton.click();
        await expect(this.couponSuccessText).toContainText("Coupon Applied");

    }
}
module.exports={OrderDetailsPage}

