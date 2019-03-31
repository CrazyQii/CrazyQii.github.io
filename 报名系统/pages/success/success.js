// pages/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.data);
    var list = JSON.parse(options.data);
    this.setData({
      'name': list[0].name,
      'gender': list[0].gender,
      'institute': list[0].institute,
      'id': list[0].id,
      'phone': list[0].phone,
      'success_info': '亲,我们已经记录下您的信息了呢'
    })
  },

  
})