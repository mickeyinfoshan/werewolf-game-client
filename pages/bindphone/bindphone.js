// bindphone.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDown: -1,
    phone: "",
    sms: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  countDown: function() {
    let {
      countDown
    } = this.data
    if(countDown < 0) {
      return
    }
    countDown = countDown - 1
    setTimeout(()=>{
      this.setData({countDown})
      this.countDown()
    }, 1000)
  },
  onPhoneInput: function(e) {
    let phone = e.detail.value
    this.setData({phone})
  },
  onSmsInput: function(e) {
    let sms = e.detail.value
    this.setData({sms})
  },
  sendSms: function() {
    let {phone} = this.data
    app.request({
      url: "/users/sendSms",
      data: {phone},
      method: "post",
      success: () => {
        this.setData({
          countDown: 60
        })
        this.countDown()
      }
    })
  },
  save: function() {
    let data = {
      phone: this.data.phone,
      code: this.data.sms,
    }
    app.requestWithOpenID({
      url: "/users/bind",
      data,
      method: "post",
      success: ()=>wx.navigateBack({
        
      })
    })
  },
})