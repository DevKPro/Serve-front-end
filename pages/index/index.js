// pages/index/index.js
const app = getApp()

Page({
  data: {
    statusBarHeight: 0,
    banners: [
      { id: 1, imageUrl: '/images/banner1.jpg' },
      { id: 2, imageUrl: '/images/banner2.jpg' }
    ],
    quickServices: [
      { id: 1, name: '快速洗车', icon: '/images/wash.png' },
      { id: 2, name: '精致美容', icon: '/images/beauty.png' },
      { id: 3, name: '镀膜养护', icon: '/images/protect.png' },
      { id: 4, name: '内饰清洗', icon: '/images/interior.png' }
    ],
    hotServices: [
      {
        id: 1,
        name: '标准洗车套餐',
        price: 68,
        imageUrl: '/images/service1.jpg'
      },
      {
        id: 2,
        name: '精致内饰护理',
        price: 198,
        imageUrl: '/images/service2.jpg'
      }
    ]
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    })
  },

  async onPullDownRefresh() {
    try {
      // Refresh data here
      await this.loadPageData()
    } catch (error) {
      wx.showToast({
        title: '刷新失败',
        icon: 'error'
      })
    } finally {
      wx.stopPullDownRefresh()
    }
  },

  loadPageData() {
    // TODO: Implement data loading from backend
    return Promise.resolve()
  },

  navigateToService(e) {
    wx.navigateTo({
      url: `/pages/service/detail?id=${e.currentTarget.dataset.id}`
    })
  },

  bookService(e) {
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '提示',
        content: '预约服务需要先登录',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/login/login' })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: `/pages/booking/booking?serviceId=${e.currentTarget.dataset.id}`
    })
  }
})
