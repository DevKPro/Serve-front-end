import {Http} from "../utils/http";

class Serve {
    constructor() {
    }

    static async getServeList(){
        return await Http.request({
            url: `serve/serveList`
        })
    }

    static async getServeQueue(serveId){

    }

    static async getWaitingCount(){
        return await Http.request({
            url: `serve/waitingCount`
        })
    }


}

export {
    Serve
}
