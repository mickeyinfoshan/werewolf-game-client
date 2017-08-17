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
        mode: MODE_ENTRANCE,
        entranceGames: [],
        createdGames: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.getUserInfo(userInfo => {
            this.setData({ userInfo })
        })
        this.fetchEntranceGames()
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

    fetchEntranceGames: function () {
        app.requestWithOpenID({
            url: `/games`,
            success: data => this.setData({ entranceGames: data.map(app.initGameItem) })
        })
    },
    fetchCreatedGames: function () {
        app.requestWithOpenID({
            url: `/games/launch`,
            success: data => this.setData({ createdGames: data.map(app.initGameItem) })
        })
    },
    setModeEntrance: function () {
        if (this.data.mode === MODE_ENTRANCE) {
            return
        }
        this.setData({
            mode: MODE_ENTRANCE,
        })
        this.fetchEntranceGames()
    },
    setModeCreated: function () {
        if (this.data.mode === MODE_CREATED) {
            return
        }
        this.setData({
            mode: MODE_CREATED
        })
        this.fetchCreatedGames()
    },
})