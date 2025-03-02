// pages/process/process.js
import {Order} from "../../models/order";
import {Payment} from "../../models/payment";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // orders: [
    //     {
    //       order_id: 1,
    //       order_name: '服务1',
    //       description: '服务1的描述',
    //       status: 1
    //     },
    //     {
    //       order_id: 2,
    //       order_name: '服务2',
    //       description: '服务2的描述',
    //       status: 2
    //     },
    //     {
    //       order_id: 3,
    //       order_name: '服务3',
    //       description: '服务3的描述',
    //       status: 3
    //     },
    //     {
    //       order_id: 4,
    //       order_name: '服务4',
    //       description: '服务4的描述',
    //       status: 4
    //     },
    //     {
    //       order_id: 5,
    //       order_name: '服务5',
    //       description: '服务5的描述',
    //       status: 5
    //     },
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let res = await Order.getOrderList();
    console.log(res);
    this.setData({
      orders: res.items
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    try {
      let res = await Order.getOrderList();
      this.setData({
        orders: res.items
      });
    } catch (error) {
      wx.showToast({
        title: '刷新失败',
        icon: 'error'
      });
    } finally {
      wx.stopPullDownRefresh();
    }
  },
  async handlePay(e) {
    const order_id = e.currentTarget.dataset.order_id;
    console.log('order_id:', order_id);
    // const payParams = await Payment.getPayParams(oid)
    // let res
    // try {
    //   res = await Payment.pay(payParams)
    //   // payStatus = OrderStatus.PAID
    //   // wx.lin.hideLoading()
    //   console.log(res)
    //   this.triggerEvent('paysuccess',{
    //     oid
    //   })
    // } catch (e) {
    //   console.error(e)
    //   // wx.lin.hideLoading()
    // }
    // 处理支付逻辑
    wx.showToast({
      title: '支付功能待实现',
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
