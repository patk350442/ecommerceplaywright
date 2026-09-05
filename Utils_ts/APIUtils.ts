interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

interface OrderPayload {
  orders: { country: string; productOrderedId: string }[];
}

export class APIUtils {



    apiContext:any;
    loginPayLoad:LoginPayload;
    constructor(apiContext: any, loginPayLoad:LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad
    }

    async getToken() {

        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayLoad

            });

        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;

    }

    async createOrder(oderPayload:OrderPayload) {
        let response: {token:string, orderId:string} = {token:'', orderId:''};
        response.token=await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: oderPayload,
                headers:
                {
                    'Authorization': response.token,
                    'content-type': 'application/json'
                }
            })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId=orderId;
        return response;
    } 
}
module.exports = { APIUtils };