var amapFile = require('../../libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      poisData:[],
      selectShopData:[],
      commonUrl:"../../style/img/commonPhoto.jpg"
  },
  bindKeyInput: function (e) {
    if(e.detail.value){
      var patt = new RegExp(e.detail.value);
      var searchRes = this.data.poisData.filter((item) => {
        return item.name.match(patt)
      })
      console.log(searchRes)
      this.setData({
        selectShopData:searchRes
      })
    }
  },
  toDetailsTap: function (e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: "/pages/shopDetails/shopDetails?id=" + JSON.stringify(e.currentTarget.dataset.item.id)
    })
  },
  // searchShop: function(e) {
  //   // var patt = new RegExp('自行车');
  //   // var searchRes = this.data.poisData.filter((item) => {
  //   //   return item.name.match(patt)
  //   // })
  //   // console.log(searchRes)
  // },
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
        })
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