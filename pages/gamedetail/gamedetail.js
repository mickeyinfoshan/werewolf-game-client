// gamedetail.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    gameDetail: null,
    area: null,
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
    app.requestWithOpenID({
      url: `/games/${this.gameID}`,
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
  entranceAction: function() {
      let data = {
          game_id: this.gameID,
          status: 1,
          nick_name: this.data.nickName.length > 0 ? this.data.nickName : this.data.userInfo.nickName,
      }
      console.log(data)
        app.requestWithOpenID({
            url: "/entrances",
            method: "post",
            data,
            success: () => {
                wx.showToast({
                    title: '报名成功',
                })
                this.fetchGameDetail()
            }
        })
  },

  onNickNameChanged: function(e) {
      this.setData({
          nickName: e.detail.value,
      })
      return e.detail.value
  }
})