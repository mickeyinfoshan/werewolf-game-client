// gamedetail.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    gameDetail: null,
    // area: null,
    introTruncate: true,
    hasEntrance: false,
    nickName: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo(userInfo=>{
        console.log(userInfo)
        this.setData({
            userInfo,
            // nickName: userInfo.nickName,
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
    this.gameID = parseInt(id)
    
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
    this.fetchGameDetail()
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
      this.fetchGameDetail()
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
    app.requestWithOpenID({
      url: `/games/${this.gameID}`,
      success: data => {
        that.setData({
          gameDetail: data,
        })
      },
    })
  },
  togglePlaceIntroTruncate: function () {
    this.setData({
      introTruncate: !this.data.introTruncate
    })
  },
  entranceAction: function() {
    wx.navigateTo({
      url: `../entranceinfo/entranceinfo?id=${this.gameID}`,
    })
  },

  onNickNameChanged: function(e) {
      this.setData({
          nickName: e.detail.value,
      })
      return e.detail.value
  },
  cancelEntrance: function() {
    app.requestWithOpenID({
      url: "/entrances/cancel",
      method:"post",
      data: {
        game_id: this.gameID,
      },
      success: ()=> this.fetchGameDetail()
    })
  }
})