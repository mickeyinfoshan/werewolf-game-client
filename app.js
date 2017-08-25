//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        this.getUserInfo()
        // this.login()
    },

    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },

    requestFailed: function (msg) {
        console.log("网络请求失败")
        wx.showToast({
            title: msg || '请求失败',
            icon: 'loading',
        })
    },

    globalData: {
        userInfo: null,
        apiHost: "https://mickey.yeeuu.com/api-neuclub/api",
        openID: "",
    },
    initGameItem: function (item) {
        let startTime = new Date(item.start_time);
        let createTime = new Date(item.create_time);
        let startTimeDisplay = `${startTime.getFullYear()}/${startTime.getMonth() + 1}/${startTime.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}`
        let createTimeDisplay = `${createTime.getMonth()}/${createTime.getDate()}`
        return Object.assign({}, item, { startTimeDisplay, createTimeDisplay })
    },
    toGameDetail: function (e) {
        let {
          gameid
        } = e.currentTarget.dataset
        console.log(e.currentTarget.dataset)
        wx.navigateTo({
            url: '../gamedetail/gamedetail?id=' + gameid,
        })
    },
    request: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        let that = this;
        let success = res => {
            console.log(res.data)
            let {
            code,
                data,
                msg,
          } = res.data
            if (code != "0") {
                that.requestFailed(msg)
                return
            }
            wx.hideLoading()
            return options.success && options.success(data)
        }
        let fail = e => {
            console.error(e)
            that.requestFailed(e)
            return options.fail && options.fail(e)
        }
        let url = this.globalData.apiHost + options.url
        console.log(url)
        console.log(options.data)
        let header = {
            'content-type': 'application/x-www-form-urlencoded',
        }
        let reqOptions = Object.assign({}, options, { success, fail, url, header })
        return wx.request(reqOptions)
    },
    getOpenID: function (options) {
        let {
            openID
        } = this.globalData
        if (openID && openID !== "") {
            return options.success && options.success(openID)
        }
        return this.login(({openid})=>options.success(openid))
        // return options.fail && options.fail("no open id")
    },
    requestWithOpenID: function (options) {
        let that = this
        let fail = e => {
            that.requestFailed()
            return options.fail && options.fail(e)
        }
        this.getOpenID({
            success: openID => {
                options.data = Object.assign({}, options.data, { openid: openID })
                that.request(options)
            },
            fail: fail,
        })
    },
    login: function (cb) {
        let that = this
        this.getUserInfo(({ nickName, avatarUrl, gender }) => {
            wx.login({
                success: ({ code }) => {
                    let dataToPost = {
                        nickName,
                        avatarUrl,
                        gender,
                        code,
                    }
                    that.request({
                        url: "/users",
                        method: "POST",
                        data: dataToPost,
                        success: data => {
                            let {
                                openid,
                                nickName,
                            } = data
                            that.globalData.openID = openid
                            that.globalData.userInfo = data
                            cb && cb(data)
                        } 
                    })
                },
                fail: wx.showToast({
                    title: '登录失败',
                })
            })
        })
    },
    pay: function({prepay_id, success, fail, complete}) {
      this.request({
        url: "/pay",
        method: "POST",
        data: {prepay_id},
        success: data => {
          data.timeStamp = data.timeStamp + ""
          data.paySign = data.sign
          console.log(data)
          let paymentRequest = Object.assign({}, data, {
            success: res => {
              // this.request({
              //   url: "/pay/success",
              //   data: {prepay_id},
              //   method: "POST",
              // }),
              success()
            },
            fail,
            complete,
          })
          wx.requestPayment(paymentRequest);
        }
      })
    },
})
