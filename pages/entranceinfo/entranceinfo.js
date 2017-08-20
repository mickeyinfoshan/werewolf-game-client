// entranceinfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone: "",
      nickName: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo(({phone, nickName})=>{
      this.setData({
        phone,
        nickName,
      })
    })
    let {
      id
    } = options
    if (!id && id !== 0) {
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

  onNickNameInput: function(e) {
      let nickName = e.detail.value
      this.setData({nickName})
  },
  onPhoneInput: function(e) {
    let phone = e.detail.value
    this.setData({phone})
  },

  save: function() {
    let dataToPost = {
      contact: this.data.phone,
      nickName: this.data.nickName,
      game_id: this.gameID,
    }
    app.requestWithOpenID({
      url: "/entrances/submit",
      data: dataToPost,
      method: "POST",
      success: prepay_id => {
        wx.showModal({
          title: '报名成功',
          content: '前往支付',
          showCancel: true,
          cancelText: "取消",
          confirmText:"去支付",
          success: ({confirm, cancel}) => {
            if(cancel) {
              wx.navigateBack({
                
              })
            }
            if(confirm) {
              app.pay({
                complete: ()=> wx.navigateBack({
                  
                }),
                prepay_id,
              })
            }
          }
        })
      }
    })
  },

})