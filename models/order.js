import {Http} from "../utils/http";

class Order {
    constructor() {
    }

    static async getOrderList(){
        return await Http.request({
            url: `order/orderList`,
            data: {
                start: 0,
                count: 10
            }
        })
    }

    static async placeOrder(orderDTO){
        return await Http.request({
            url: `order`,
            data: orderDTO,
            method: 'POST'
        })

    }

    // static async getServerList(){
    //     return await Http.request({
    //         url: `server/bookingServerList`,
    //     })
    // }

}

export {
    Order
}
