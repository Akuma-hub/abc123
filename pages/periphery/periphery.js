var amapFile = require('../../libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
// pages/periphery/periphery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      locationCity: "昆明",
      selectArray: [{
        "id": "10",
        "text": "500m"
      }, {
        "id": "21",
        "text": "100m"
      }],
      selectData:"",
      poisData:[],
      commonUrl:"../../style/img/commonPhoto.jpg"
  },
  handleItemChange(e){
    //console.log(e)
    this.setData({
      selectData:e.detail
    })
  },

  toDetailsTap: function (e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: "/pages/shopDetails/shopDetails?id=" +  JSON.stringify(e.currentTarget.dataset.item.id)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //高德地图api周边商家信息请求-开始
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'016cdcf473fb17217545fa88cf593269'});
    myAmapFun.getPoiAround({
      success: function(data){
        //成功回调
        console.log(data)
        that.setData({
          poisData:data.poisData,
          locationCity:data.poisData[0].cityname
        })
        wx.setStorageSync('shopList', data.poisData)
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
    //高德地图api周边商家信息请求-结束
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})