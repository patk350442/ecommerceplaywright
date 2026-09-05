const { test, expect } = require('@playwright/test')

test('frames and Pop Ups Test', async ({ page }) => 
    {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/#");
    //   await page.goto("https://google.com/");
    //   await page.goBack();
    //   await page.goForward(); 
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByRole('button', { name: 'Hide' }).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#name").fill("test");

    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByRole('button', { name: 'Mouse Hover' }).hover();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.getByText("VIEW ALL COURSES").click();
});

test('screenshot and partial screenshot Test', async ({ page }) => 
    {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/#");
    //   await page.goto("https://bing.com/");
    //   await page.goBack();
    //   await page.goForward(); 
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.screenshot({path:'screenshot.png'});
    await page.getByPlaceholder("Hide/Show Example").screenshot({path:'partialScreenshot.png'});
    await page.getByRole('button', { name: 'Hide' }).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    
});

test.only('Visual Test', async ({ page }) => 
    {

    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    expect(await page.screenshot()).toMatchSnapshot('landingPage.png');
    
});