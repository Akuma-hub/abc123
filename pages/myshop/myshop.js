// pages/myshop/myshop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    data: [], //用户商店信息,
    shop:'',
    latitude: 23.099994,
    longitude: 113.324520,
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.user)
    // 获取用户名
    // 查询用户商店数据
    // 渲染商店数据
    var userName = wx.getStorageSync('userinfo').nickName
    var that = this
    wx.request({
      url: 'http://112.124.7.23:8080/App_02/shop/findall',
      method: 'GET',
      success: function(res){
        console.log(res.data)
        var result = res.data.find((item)=>{
          return item.user_name === userName
        })
        if(!result){
          wx.navigateTo({
            url: '../addshop/addshop',
          })
        }else{
          var mar = [
            {
              address: result.address,
              height: 32,
              iconPath: '',
              latitude: result.dimension,
              longitude: result.longitude,
              name: result.name,
              width:22
            }
          ]
          that.setData({
            shop:result,
            markers:mar,
            latitude:result.dimension,
            longitude:result.longitude
          })
        }
      }
    })
  }
})