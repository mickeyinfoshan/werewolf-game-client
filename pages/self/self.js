// self.js
var app = getApp();

const MODE_ENTRANCE = "entrance"
const MODE_CREATED = "created"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
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
      app.getUserInfo(userInfo => {
        this.setData({ userInfo })
      })
      wx.setNavigationBarTitle({
          title: '我的',
      })
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
    toEdit: function() {
      wx.navigateTo({
        url: '../userinfo/userinfo',
      })
    },

    toAddGame: function() {
      wx.navigateTo({
        url: '../addgame/addgame',
      })
    },

    toMyGames: function() {
      wx.navigateTo({
        url: '../mygames/mygames',
      })
    },
})