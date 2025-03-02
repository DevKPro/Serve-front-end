import {Serve} from "../../models/serve";
import {Order} from "../../models/order";
import {User} from "../../models/user";

Page({
    data: {
        statusBarHeight: 20, // Example value, adjust as needed
        services: [
        ],
        selectedService: null,
        name: '',
        car_no: '',
        phone: '',
        finalPrice: 0,
        canSubmit: false,
        waitingCount: 0
    },
    updateCanSubmit() {
        const { selectedService, name, phone } = this.data;
        const canSubmit = selectedService && name && phone;
        this.setData({ canSubmit });
    },
    async onLoad() {
        // Load services and user info
        // const app = getApp();
        let user_info = await User.baseInfo();
        this.setData({
            name: user_info.name || '',
            phone: user_info.phone || '',
            car_no: user_info.car_no || '',
        });

        this.loadServices();
        // this.loadUserInfo();
    },


    async loadServices() {
        let serves = await Serve.getServeList()
        this.setData({
            services: serves
        })
    },
    // loadUserInfo() {
    //     // Fetch user info from backend or local storage
    //     wx.getStorage({
    //         key: 'userInfo',
    //         success: (res) => {
    //             this.setData({
    //                 name: res.data.name,
    //                 phone: res.data.phone
    //             });
    //         }
    //     });
    // },
    async selectService(e) {
        const service = e.currentTarget.dataset.service;
        console.log('Selected service:', service);
        let cnt = await this.getWaitingCount();
        console.log('Waiting count:', cnt);
        this.setData({
            selectedService: service,
            finalPrice: service.price,
        });

        // selectedService.estimatedTime = this.getEstimatedTime();
    },

    // 向服务器请求排队人数
    async getWaitingCount() {
        // 获取排队人数
        return await Serve.getWaitingCount();
    },

    async submitBooking() {
        // if (!this.data.canSubmit) return;
        if (!(this.data.selectedService && this.data.name && this.data.phone && this.data.car_no)) return;
        // const bookingInfo = {
        //     serviceId: this.data.selectedService.id,
        //     name: this.data.name,
        //     phone: this.data.phone
        // };
        let orderDTO = {
            'total_price': this.data.finalPrice,
            'final_total_price': this.data.finalPrice,
            'coupon_id': -1,
            'serve_id': this.data.selectedService.id,
            'car_no': this.data.car_no,
            'phone': this.data.phone,
            'name': this.data.name,
        }
        let ret = await Order.placeOrder(orderDTO);
        // console.log('预约结果:', ret);
        // 获取状态
        if (ret!=null && ret.id!=null) {
            wx.showToast({
                title: '预约成功',
                icon: 'success'
            });
        } else {
            wx.showToast({
                title: '预约失败',
                icon: 'error'
            });
        }

        // 重置页面
        this.setData({
            selectedService: null,
            finalPrice: 0,
            canSubmit: false,
            waitingCount: 0
        });

        // wx.request({
        //     url: 'https://example.com/api/bookings',
        //     method: 'POST',
        //     data: bookingInfo,
        //     success: (res) => {
        //         wx.showToast({
        //             title: '预约成功',
        //             icon: 'success'
        //         });
        //     }
        // });
    },

    async onPullDownRefresh() {
        try {
            // 重置
            this.setData({
                services: [],
                selectedService: null,
                name: '',
                phone: '',
                finalPrice: 0,
                canSubmit: false,
                waitingCount: 0
            });
            // const app = getApp();
            let user_info = await User.baseInfo();
            this.setData({
                name: user_info.name || '',
                phone: user_info.phone || '',
                car_no: user_info.car_no || '',
            });
            await this.loadServices();
        } catch (error) {
            wx.showToast({
                title: '刷新失败',
                icon: 'error'
            });
        } finally {
            wx.stopPullDownRefresh();
        }
    }
});
