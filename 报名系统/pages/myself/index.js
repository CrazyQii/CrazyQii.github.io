// pages/myself/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    version: "1.0.1",
    items: [
      {
        name: '报名信息',
        bind: 'getMySelf'
      },
      {
        name: '意见反馈',
        bind: 'getAdvice'
      }
    ]
  },

  /**
   * [getMySelf 跳转个人信息]
   * @return {[type]} [description]
   */
  getMySelf: function() {
    wx.getStorage({ //获取缓存信息
      key: 'student',
      success: function(res) { //成功获取，跳转个人信息
        var list = res.data;
        wx.navigateTo({
          url: '../success/success?data='+ JSON.stringify(list)
        })
      },
      fail: function() {  //获取失败，跳转填写信息
        wx.showActionSheet({
          itemList: ['完善个人信息'],
          success: function(res) {
            wx.switchTab({
              url: '../apply/index'
            })
          }
        })  
      }
    })
  },

  /**
   * [getAdvice 跳转意见反馈]
   * @return {[type]} [description]
   */
  getAdvice: function() {
    wx.navigateTo({
      url: 'advice'
    })
  }
})