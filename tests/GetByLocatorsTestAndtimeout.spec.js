const { test, expect } = require('@playwright/test');

test('GetBy locators Test and Timeout', async ({ page }) => 
{
    test.setTimeout(60000);
    const customExpect= expect.configure({timeout:8000});
    page.setDefaultTimeout(8000);
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("12345");
    // await page.getByRole('textbox',{name: 'Email' }).fill("abc@gmail.com");
    //   await page.getByLabel('Email').fill("abc@gmail.com");
    await page.getByLabel("Employed").check();
    await page.locator("h4 input").fill("test");


    await page.getByRole('radio', { name: 'Student' }).check();
    await page.getByRole('button', { name: 'Submit' }).click({timeout:10000});
    await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible({timeout: 10000});
    //await customExpect(page.getByText(" The Form has been submitted successfully!.")).toHaveText("Dummy test",{timeout:10000});
   
    await page.getByRole('link',{name:'Shop'}).click();
    await page.locator("app-card .card-body").first().waitFor();
    console.log(await page.locator("app-card .card-body").count());
    await page.locator("app-card-list app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

    //Step level> Test level> Global level
});