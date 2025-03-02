
import {Http} from "../utils/http";

class Payment{

    static async getPayParams(orderId) {
        const serverParams = await Http.request({
            url:`payment/pay/order/${orderId}`,
            method:'POST'
        })
        return  serverParams
    }

    // static async pay(payParams){
    //     // 调用微信支付接口
    //     // 1. 小程序端调用微信支付接口
    //     // 2. 服务端调用微信支付接口
    //     // 3. 小程序端调用服务端接口，服务端调用微信支付接口
    //     wx.requestPayment(payParams)

    // }



}

export {
    Payment
}
