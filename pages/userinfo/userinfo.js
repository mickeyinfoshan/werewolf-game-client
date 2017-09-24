var app = getApp()
// userinfo.js
Page({
    data: {
        nickName: "",
        phone: "",
        avatarUrl: "",
        gender: 1,
        genders: [{
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
        // app.getUserInfo(data => this.setData(data))
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      // app.getUserInfo(data => this.setData(data))
      app.login(()=>{
        app.getUserInfo(data => this.setData(data))
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    selectGender: function (e) {
        let gender = e.detail.value
        this.setData({ gender })
    },
    save: function () {
        let {
            data
        } = this
        app.getOpenID({
            success: openID => {
                app.requestWithOpenID({
                    method: "PUT",
                    url: `/users/${openID}`,
                    data: data,
                    success: userInfo => {
                        app.globalData.userInfo = userInfo
                        wx.navigateBack({
                            
                        })
                    }
                })
            }})

    },
    toBindPhone: function () {
        wx.navigateTo({
            url: '../bindphone/bindphone',
        })
    },
    chooseImage: function () {
        let that = this
        wx.chooseImage({
            success: function (res) {
                let tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    filePath: tempFilePaths[0],
                    name: "file",
                    url: `${app.globalData.apiHost}/upload`,
                    success: ({ data }) => {
                        console.log(typeof data)
                        data = JSON.parse(data)
                        console.log(data)
                        that.setData({
                            avatarUrl: data.data,
                        })
                    },
                    fail: () => wx.showToast({
                        title: '图片上传失败',
                    })
                })
            },
        })
    },
    onNickNameInput: function(e) {
        let nickName = e.detail.value;
        this.setData({ nickName })
    }
})