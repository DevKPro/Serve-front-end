/**
 * @作者 7七月
 * @微信公号 林间有风
 * @开源项目 $ http://7yue.pro
 * @免费专栏 $ http://course.7yue.pro
 * @我的课程 $ http://imooc.com/t/4294850
 * @创建时间 2019-08-30 20:56
 */
import {Http} from "../utils/http";


class User{

    static async updateUserInfo(user_info) {
        wx.setStorageSync('user_info', user_info);
        return Http.request({
            url:`user/wx_info`,
            user_info,
            method:'POST'
        })

    }

    static async baseInfo(data) {
        let baseInfo = wx.getStorageSync('user_info');
        // console.log(baseInfo);
        if (baseInfo==null || baseInfo==''){
            baseInfo = await Http.request({
                url:`user/baseInfo`,
                data,
                method:'POST'
            })
            wx.setStorageSync('user_info', baseInfo);
            return baseInfo
        }
        return baseInfo;

    }


}

export {
    User
}
