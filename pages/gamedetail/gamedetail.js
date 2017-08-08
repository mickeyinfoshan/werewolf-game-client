// gamedetail.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar: "",
    gameDetail: null,
    area: null,
    introTruncate: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo(userInfo=>{
        this.setData({
            userAvatar: userInfo.avatarUrl,
        })
    })
    let {
      id
    } = options
    if(!id && id !== 0) {
      wx.redirectTo({
        url: '../gamelist/gamelist',
      })
    }
    this.gameID = id
    this.fetchGameDetail()
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
  fetchGameDetail: function() {
    let that = this
    app.request({
      url: `/games/${this.gameID}`,
      data: {
        open_id: "TODO:setopen_id",
      },
      success: data => {
        that.fetchAreaInfo(data.area_id)
        that.setData({
          gameDetail: data,
        })
      },
    })
  },
  fetchAreaInfo: function(areaID) {
    let that = this;
    app.request({
      url: `/areas/${areaID}`,
      success: data => {
        that.setData({
          area: data
        })
      }
    })
  },
  togglePlaceIntroTruncate: function () {
    this.setData({
      introTruncate: !this.data.introTruncate
    })
  },
})