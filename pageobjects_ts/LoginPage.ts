import {test,expect,Page,Locator} from '@playwright/test'
import { PathOrFileDescriptor } from 'node:fs';
export class LoginPage{

    page:Page;
    signInButton:Locator;
    userName:Locator;
    password:Locator;
    firstProductOnDashboard:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.signInButton= page.locator("#login");
        this.userName= page.locator("#userEmail");
        this.password= page.locator("#userPassword");
        this.firstProductOnDashboard=page.locator(".card-body b").first();
    }

    async goTO()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
    async validLogin(username:string,password:string)
    {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.firstProductOnDashboard.waitFor();

    }
}
module.exports={LoginPage};