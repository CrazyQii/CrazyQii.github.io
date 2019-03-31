// pages/apply/index.js

/**
 * [confirmInfo 确认是否正确填写信息]
 * @param  {[string]} name      [姓名]
 * @param  {[int]} gender    [性别]
 * @param  {[int]} phone     [电话号码]
 * @param  {[string]} institute [学院]
 * @param  {[int]} ID        [学号]
 * @return {[string]}           [提示信息]
 */
function confirmInfo(name, gender, phone, institute, id) {
  if (name == "") {
    wx.showModal({
      title: '提示',
      content: '请输入您的姓名，很重要的哦',
      showCancel: false,
      confirmText: '我知道啦'
    })
  }
  else if (gender == "") {
    wx.showModal({
      title: '提示',
      content: '请选择您的性别，很重要的哦',
      showCancel: false,
      confirmText: '我知道啦'
    })
  }
  else if (phone == "") {
    wx.showModal({
      title: '提示',
      content: '请输入您的电话号码，很重要的哦',
      showCancel: false,
      confirmText: '我知道啦'
    })
  }
  else if (institute == null) {
    wx.showModal({
      title: '提示',
      content: '请选择您的学院，很重要的哦',
      showCancel: false,
      confirmText: '我知道啦'
    })
  }
  else if (id == "") {
    wx.showModal({
      title: '提示',
      content: '请输入您的学号，很重要的哦',
      showCancel: false,
      confirmText: '我知道啦'
    })
  }
  else {
    return true;
  }
}

/**
 * [getInstitute 获取学院]
 * @param  {[int]} num [选择框的index]
 * @return {[string]}     [学院]
 */
function getInstitute(num) {
  switch (num) {
    case "0":  return "计算机学院";
    case "1":  return "自动化学院";
    case "2":  return "机械工程学院";
    case "3":  return "通信工程学院";
    case "4":  return "网络空间安全学院";
    case "5":  return "管理学院";
    case "6":  return "电子信息学院";
    case "7":  return "理学院";
    case "8":  return "外国语学院";
    case "9":  return "人文与法学院";
    case "10":  return "会计学院";
    case "11":  return "经济学院";
    case "12":  return "生仪学院";
    case "13":  return "材环学院";
    case "14":  return "数字媒体与艺术设计学院";
    case "15":  return "卓越学院";
    default : return "选择学院";
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'myInstitute': '选择学院',
    'institutes': [
      '计算机学院',
      '自动化学院',
      '机械工程学院',
      '通信工程学院',
      '网络空间安全学院',
      '管理学院',
      '电子信息学院',
      '理学院',
      '外国语学院',
      '人文与法学院',
      '会计学院',
      '经济学院',
      '生仪学院',
      '材环学院',
      '数字媒体与艺术设计学院',
      '卓越学院'
    ]
  },

  /**
   * [showInstitute picker展示学院信息]
   * @param  {[Object]} event [事件对象]
   * @return {[type]}       [description]
   */
  showInstitute: function(event) {
    this.setData({
      'myInstitute': getInstitute(event.detail.value)
    })
  },

  /**
   * [submit 自定义函数--提交表单]
   * @param  {[Object]} event [事件对象]
   * @return {[void]}       [触发事件]
   */
  submit:  function(event) {
    var name = event.detail.value.name;
    var gender = event.detail.value.gender;
    var phone = event.detail.value.call;
    var institute = event.detail.value.institute;
    var id = event.detail.value.id; 
    //核实信息是否有误
    if (confirmInfo(name, gender, phone, institute, id)) {
        wx.showModal({
        title: '提示',
        content: '确认提交后信息将不能修改，请慎重',
        cancelText: '重新填写',
        confirmText: '确认提交',
        //查看提交信息
        success(res) {
          if (res.confirm) {
            wx.request({//请求服务器端
              url: 'https://crazyqiqi.top/index.php',
              method: 'GET',
              data: {
                'name': name,
                'gender': gender,
                'phone': phone,
                'institute': institute,
                'id': id 
              },
              header: {
                'content-type': 'application/json'//默认值
              },
              success(res) { //提交成功，显示弹窗
                var list = [ //收集用户信息
                  {
                  'name': name,
                  'gender': gender,
                  'phone': phone,
                  'institute': institute,
                  'id': id 
                  }
                ]
                //设置缓存
                wx.setStorage({
                  key: 'student',
                  data: list,
                  success: function(res) {
                    console.log("缓存成功");
                    wx.navigateTo({
                      url: '../success/success?data=' + JSON.stringify(list)
                      }),
                    wx.showToast({
                      title: '提交成功',
                      icon: 'success',
                      duration: 800
                    })
                  }
                })          
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