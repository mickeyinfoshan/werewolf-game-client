// gamelist.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userAvatar: "",
        areas: [],
        games: [],
        showAreaList: false,
        selectedArea: null,
        introTruncate: true,
    },
    toggleAreaList: function () {
        this.setData({
            showAreaList: !this.data.showAreaList,
        })
    },

    selectArea: function(e) {
        console.log("select area")
        let {
            area
        } = e.currentTarget.dataset
        let {
            selectedArea
        } = this.data
        if(selectedArea.area_id === area.area_id) {
            this.setData({
                showAreaList: false
            })
            return
        }
        this.setData({
            selectedArea: area,
            showAreaList: false,
        })
        this.fetchGames();
    },

    getHeaderText: function () {
        return this.getSelectedArea() && this.getSelectedArea().area_name || "暂无数据"
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userAvatar: app.globalData.userInfo.avatarUrl,
        })
        this.fetchAreas()
    },

    fetchAreas: function () {
        let that = this;
        wx.showLoading({
            title: '加载场地中...',
            mask: true,
        })
        wx.request({
            url: `${app.globalData.apiHost}/areas`,
            success: res => {
                console.log(res.data)
                wx.hideLoading()
                let {
                    code,
                    data,
                } = res.data
                let {
                    selectedArea
                } = that.data
                if(code != "0") {
                    app.requestFailed();
                    return
                }
                selectedArea = data.filter(area=>{
                    if(!selectedArea) {
                        return true
                    }
                    return selectedArea.area_id === area.area_id
                })[0] || data[0] || null
                that.setData({
                    areas: data,
                    selectedArea: selectedArea,
                })
            },
            fail: app.requestFailed,
        })
    },

    fetchGames: function () {
        let that = this;
        wx.showLoading({
            title: '加载场次中...',
            mask: true,
        })
        let {
            selectedArea
        } = this.data
        if(!selectedArea) {
            return
        }
        wx.request({
            url: `${app.globalData.apiHost}/games?inRegister=1&area_id=${selectedArea.area_id}`,
            success: res => {
                wx.hideLoading()
            },
            fail: app.requestFailed,
        })
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

    toSelfPage: function () {
        wx.navigateTo({
            url: '../self/self',
        })
    },
    toAddGamePage: function () {
        wx.navigateTo({
            url: '../addgame/addgame',
        })
    },
    toGameDetail: function (game) {
        wx.navigateTo({
            url: '../gamedetail/gamedetail?id=' + game.game_id,
        })
    },

    togglePlaceIntroTruncate: function() {
        this.setData({
            introTruncate: !this.data.introTruncate
        })
    },
})