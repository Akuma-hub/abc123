Page({

  /**
   * 页面的初始数据
   */
  data: {
      id: '',
      name: '',
      user_name: '',
      cityname: '',
      pname: '',
      adname: '',
      address:'',
      latitude:'',
      longitude:''
  },
  // 双向数据绑定
  bindKeyInput: function(e){
    var key = e.currentTarget.id
    if(key == 'name'){
      this.setData({
        name: e.detail.value
      })
    }else if(key == 'user_name'){
      if(e.detail.value != this.data.user_name){
        e.detail.value = this.data.user_name
      }
    }else if(key == 'pname'){
      this.setData({
        pname: e.detail.value
      })
    }else if(key == 'cityname'){
      this.setData({
        cityname: e.detail.value
      })
    }else if(key == 'adname'){
      this.setData({
        adname: e.detail.value
      })
    }else if(key == 'address'){
      this.setData({
        address: e.detail.value
      })
    }
    
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log(res)
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
 
        })
      }
    })

    var user_name = wx.getStorageSync('userinfo').nickName
    var id = this.getId()
    console.log(id)
    this.setData({
      id,
      user_name
    })
  },
  //生成的商店id 10位 16进制数
  getId(){
    var i = 0;
    var str = "";
    var random = 0;
    var aryNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
 
    for(i = 0; i < 10; i++)
    {
    	random = parseInt(Math.random() * 16);
 
    	str += aryNum[random];
    }
    return str
  },
  //发送请求
  formSubmit: function(){
    wx.request({
      url: 'http://112.124.7.23:8080/App_02/shop/insert',
      //添加地理位置 经纬度坐标
      data: {
        id: this.data.id,
        name: this.data.name,
        user_name: this.data.user_name,
        cityname: this.data.cityname,
        pname: this.data.pname,
        adname: this.data.adname,
        address: this.data.address,
        type: '未设置',
        status: 0,
        dimension: this.data.latitude,
        longitude : this.data.longitude
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success:function(res){
        console.log(res)
        wx.switchTab({
          url: '../periphery/periphery',
        })
      }
    })
  }
})