// pages/shopDetails/shopDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    sequence: "0",//商家排队个数
    details: "",//单个商家详细信息
    isTrue : 0,
    user: '',
    appointId: '',
    commonUrl: '../../style/img/nulls.png'
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if(!wx.getStorageSync("userinfo")){
      wx.switchTab({
        url: '../myself/myself',
        complete: wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000
        })
      })
    }
    
    //navatiger url 传值
    var id = JSON.parse(options.id)
    console.log(id)
    var user = wx.getStorageSync("userinfo")
    //console.log(user)
    var shopList = wx.getStorageSync('shopList')
    //console.log(shopList)
    var itemshop = shopList.find(item => {
      return item.id == id
    })
    this.setData({
      details: itemshop,
      user: user.nickName
    })

    // 判断是否预约
    var that = this
    wx.request({
      url: 'http://112.124.7.23:8080/App_02/appoint/findall',
      method: 'GET',
      success: function(res) {
        //console.log(res.data)
        var selectRes = res.data.find( (item) => {
          return item.appoint_user_name == user.nickName && item.appoint_shop_id == itemshop.id
        })
        var appointNum = res.data.filter((item) => {
          return item.appoint_shop_id == itemshop.id
        })
        //console.log(selectRes)
        //console.log(appointNum)
        if(selectRes){
          that.setData({
            isTrue: 1,
            appointId: selectRes.id,
            sequence: appointNum.length
          })
        }
      }
    })
  },
  /**
   * 预约按钮点击事件
   * 点击预约发送请求并改变当前的预约状态
   * 再次进入页面时不会再次发送二次请求
   */
  handleAppointment(){
    var that = this
    wx.request({
      url: 'http://112.124.7.23:8080/App_02/appoint/insert',
      data: {
        appoint_user_name: this.data.user,
        appoint_shop_id: this.data.details.id
      },
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      method: 'POST',
      success: function(res) {
        
        wx.navigateTo({
          url: '../appoint/appoint',
        })
        console.log(res)
      }
    })
    
  },
  /**
   * 预约按钮取消点击事件
   * 取消预约功能
   */
  handleUpAppointment(){
    var that = this
    wx.request({
      url: 'http://112.124.7.23:8080/App_02/appoint/cancel/'+this.data.appointId,
      method: 'POST',
      success: function(res){
        wx.showToast({
          title: '解约成功',
          icon: 'none'
        })
        wx.navigateTo({
          url: '../unappoint/unappoint',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})