// pages/myself/myself.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    icons: [
      {
        icon: 'icon-instruction',
        content: '预约列表',
      },
      {
        icon: 'icon-setting',
        content: '配置选项',
      },
      {
        icon: 'icon-guests',
        content: '我的商店',
      }
    ]
  },

  handleGetuserInfo(e){
    console.log(e)
    const {userInfo} = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    const userinfo = wx.getStorageSync("userinfo")
    this.setData({
      userinfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const userinfo = wx.getStorageSync("userinfo")
    this.setData({
      userinfo
    })
  }
})