
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointments: [],
    poisData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var shopList = wx.getStorageSync('shopList')
    //console.log(shopList)
    //console.log(options.user)
    wx.request({
      url: 'http://112.124.7.23:8080/App_02/appoint/findall',
      method: 'GET',
      success: function(res) {
        //console.log(res.data)
        var appoints = res.data.filter((item) => {
          return item.appoint_user_name == options.user
        })
        //console.log(selectRes)
        //console.log(appoints)
        appoints.forEach(function(item){
           var shop = shopList.find((element => {
              return element.id == item.appoint_shop_id
           }))
           item.conShop = shop
        })
        if(appoints){
          that.setData({
            appointments: appoints
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})