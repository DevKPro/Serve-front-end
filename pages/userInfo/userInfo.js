import {User} from "../../models/user";

Page({
    data: {
        name: '',
        phone: '',
        car_no: ''
    },

    onNameInput(e) {
        this.setData({
            name: e.detail.value
        });
    },
    onCarNoInput(e) {
        this.setData({
            car_no: e.detail.value
        });
    },
    onPhoneInput(e) {
        this.setData({
            phone: e.detail.value
        });
    },

    onSubmit() {
        const { name, phone, car_no } = this.data;

        if (name && phone && car_no) {

            //检查手机号码格式是否有效
            if (!(/^1[3456789]\d{9}$/.test(phone))) {
                wx.showToast({
                    title: '手机号码格式错误',
                    icon: 'none',
                    duration: 2000
                });
                // return;
            }

            // 保存用户信息
            //更新至数据库
            let user_info = {
                'name': name,
                'phone': phone,
                'car_no': car_no
            };
            User.updateUserInfo(user_info);

            wx.showToast({
                title: '信息已保存',
                icon: 'success',
                duration: 2000
            });

            // 返回首页
            wx.switchTab({
                url: '/pages/index/index'
            });
        } else {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none',
                duration: 2000
            });
        }
    }
});
