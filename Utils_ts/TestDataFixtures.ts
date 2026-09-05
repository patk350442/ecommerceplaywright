//const base=require('@playwright/test')
import {test as base} from '@playwright/test';
interface testDataPlaceOrder
{
        username:string; 
        password :string;
        productName:string;
};
export const test=base.extend<{testDataPlaceOrder: testDataPlaceOrder}>(
{
    testDataPlaceOrder:
    {
        "username": "pratik350442.1@gmail.com",
        "password": "Test@123456",
        "productName": "ADIDAS ORIGINAL"
    }
}

)