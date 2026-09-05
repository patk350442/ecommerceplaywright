const base=require('@playwright/test')

exports.test=base.test.extend(
{
    testDataPlaceOrder:
    {
        "username": "pratik350442.1@gmail.com",
        "password": "Test@123456",
        "productName": "ADIDAS ORIGINAL"
    }
})