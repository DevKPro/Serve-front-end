// app.js
import {Token} from "./models/token";
import {User} from "./models/user";

App({
  async onLaunch() {
    // 无感登录，向服务器发送code，服务器返回token
    const token = new Token();
    token.verify();

    // 获取用户信息
    let baseInfo = await User.baseInfo()
    console.log("baseInfo", baseInfo)
    if (baseInfo==null || baseInfo.phone==null || baseInfo.name==null || baseInfo.car_no==null) {
      wx.navigateTo({
        url: '/pages/userInfo/userInfo'
      });
    }
    // 更新globalData
    this.globalData.userInfo = await User.baseInfo()
  },
  globalData: {
    userInfo: null,
  }
})
