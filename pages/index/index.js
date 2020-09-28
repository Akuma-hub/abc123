var amapFile = require('../../libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
//Page Object
Page({
  data:{
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [],
  },
  onLoad: function() {
    //高德地图api周边商家信息请求-开始
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'016cdcf473fb17217545fa88cf593269'});
    myAmapFun.getPoiAround({
      success: function(data){
        console.log(data)
        // 获取所有商店数据
        var markers = data.markers
        // wx.request({
        //   url: 'http://112.124.7.23:8080/App_02/shop/findall',
        //   method: 'GET',
        //   success:function(res){
        //     res.data.map(item => {
        //       markers.push(item)
        //     })
        //     console.log(res)
        //   }
        // })
        //成功回调
        that.setData({
          markers:data.markers,
          poisData:data.poisData
        })
        wx.setStorageSync('shopList', data.poisData)
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
    //高德地图api周边商家信息请求-结束

    //初始化地图上下文，并定位到当前位置
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.moveToLocation()
  },
  //定位到当前位置
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  //获取当前位置
  getCenterLocation: function () {
    var that = this
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  }
}) 