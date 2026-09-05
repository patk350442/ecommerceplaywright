
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from './CartPage';
import {OrderDetailsPage} from './OrderDetailsPage';
import {OrderHistoryPage} from './OrderHistoryPage';
import { Page } from '@playwright/test';

export class POManager 
{
        page:Page;
        loginPage:LoginPage;
        dashboardPage:DashboardPage;
        cartPage:CartPage;
        orderDetailsPage:OrderDetailsPage;
        orderHistoryPage:OrderHistoryPage;

    constructor(page: Page) 
    {
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage=new CartPage(this.page);
        this.orderDetailsPage=new OrderDetailsPage(this.page);
        this.orderHistoryPage=new OrderHistoryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage; 
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getOrderDetailsPage()
    {
        return this.orderDetailsPage;
    }

    getOrderHistoryPage()
    {
        return this.orderHistoryPage;
    }
}
module.exports={POManager}