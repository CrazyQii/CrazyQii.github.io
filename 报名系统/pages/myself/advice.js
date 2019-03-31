// pages/myself/advice.js

function checkValue(text, telephone) {
  if (text == "") {
    wx.showModal({
      title: '提示',
      content: '请写下您的意见和建议哦',
      showCancel: false,
      confirmText: '我知道啦'
    })
  } 
  else if (telephone == "") {
    wx.showModal({
      title: '提示',
      content: '请留下您的联系方式，我们好联系您',
      showCancel: false,
      confirmText: '我知道啦'
    })
  }
  else {
    return true;
  }
}
 
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  submitInfo: function(event) {
    console.log(event);
    var advice_text = event.detail.value.advice;
    var advice_telephone = event.detail.value.telephone
    if (checkValue(advice_text, advice_telephone)) { //如果两个信息都填了
      wx.showModal({
        title: '提示',
        content: '确认提交您的意见和建议吗',
        cancelText: '继续填写',
        confirmText: '确认提交',
        success(res) {
          if (res.confirm) {
            wx.request({//请求服务器端
              url: 'https://crazyqiqi.top/index.php',
              method: 'GET',
              data: {
                'advice_text': advice_text,
                'advice_telephone': advice_telephone,
              },
              header: {
                'content-type': 'application/json'//默认值
              }
            })
          } 
          else if (res.cancel){
            console.log("用户点击取消");
          }
        }
      })
    }
  } 
})