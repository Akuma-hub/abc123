// components/appointmentitem/appointmentitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    appointments: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    commonUrl: '../../style/img/commonPhoto.jpg'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCancel:function(e){
      console.log(e.currentTarget.dataset.item)
      var that = this
      wx.request({
        url: 'http://112.124.7.23:8080/App_02/appoint/cancel/' + e.currentTarget.dataset.item.id,
        method: 'POST',
        success: function(res){
          wx.showToast({
            title: '解约成功',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../../pages/unappoint/unappoint',
          })
        }
      })
    }
  }
})
