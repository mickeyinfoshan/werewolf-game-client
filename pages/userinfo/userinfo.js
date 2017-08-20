var app = getApp()
// userinfo.js
Page({
  data: {
    nickName: app.globalData.userInfo.nickName,
    phone: app.globalData.userInfo.phone,
    avatarUrl: app.globalData.userInfo.avatarUrl,
    gender: app.globalData.userInfo.gender,
    genders:[{
      value: "女 ♀"
    }, {
      value: "男 ♂",
    }],
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
  selectGender: function(e) {
    let gender = e.detail.value
    this.setData({gender})
  },
  save: function() {

  },
  toBindPhone: function() {
    wx.navigateTo({
      url: '../bindphone/bindphone',
    })
  },
  chooseImage: function() {
      wx.chooseImage({
        success: function(res) {
          this.setData({
            avatarUrl: res,
          })
        },
      })
  },
})