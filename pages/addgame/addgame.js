// addgame.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game: {
      game_title: "",
      game_description: "",
      area_index: 0,
      judge_index: 0,
      member_count: 12,
      game_cost: 35,
      date_value: (()=>{
          let d = new Date()
          return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` 
      })(),
      time_value: (()=>{
          let d = new Date()
          return `${d.getHours()}:${d.getMinutes()}`
      })(),
    },
    areas: [],
    judges: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchAreas()
    this.fetchJudges()
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

  fetchAreas: function () {
    app.request({
      url: `/areas`,
      success: areas => {
        let area_id = areas[0].area_id || null
        this.setData({
          areas,
        })
      }
    })
  },
  fetchJudges: function () {

  },
  selectArea: function (e) {
    let {
      value
    } = e.detail
    let area_index = value < this.data.areas.length ? value : 0
    let game = Object.assign({}, this.data.game, { area_index })
    this.setData({ game })
  },
  selectJudge: function (e) {
    let {
      value
    } = e.detail
    let judge_index = value < this.data.judges.length ? value : 0
    let game = Object.assign({}, this.data.game, { judge_index })
    this.setData({ game })
  },
  onDatePickerChange: function(e) {
    let {
      value
    } = e.detail
    let date_value = value
    let game = Object.assign({}, this.data.game, {date_value})
    this.setData({game})
  },
  onTimePickerChange: function(e) {
    let time_value = e.detail.value
    let game = Object.assign({}, this.data.game, {time_value})
    this.setData({game})
  },
  save: function() {
    let {
      game,
      areas,
      judges,
    } = this.data
    let dataToPost = Object.assign({}, game)
    dataToPost.area_id = areas[game.area_index] && areas[game.area_index].area_id || null
    dataToPost.judge_id = judges[game.judge_index] && judges[game.judge_index].judge_id || null
    let splited_date_value = game.date_value.split("-")
    let splited_time_value = game.time_value.split(":")
    let start_time = new Date()
    start_time.setFullYear(splited_date_value[0])
    start_time.setMonth(splited_date_value[1] - 1)
    start_time.setDate(splited_date_value[2])
    start_time.setHours(splited_time_value[0])
    start_time.setMinutes(splited_time_value[1])
    dataToPost.start_time = start_time.getTime()
    dataToPost.creater_id = app.globalData.openID
    app.request({
      url: "/games",
      data: dataToPost,
      method: "post",
      success: () => {
        wx.showToast({
          title: "创建成功",
          icon: "success",
          complete: ()=> wx.navigateBack({
            
          })
        })
      }
    })
  },
  onTitleInput: function(e) {
    let game_title = e.detail.value
    let game = Object.assign({}, this.data.game, {game_title})
    this.setData({game})
  },
  onMemberCountInput: function(e) {
    let member_count = e.detail.value
    let game = Object.assign({} ,this.data.game, {member_count})
    this.setData({game})
  },
  onCostInput: function(e) {
    let game_cost = e.detail.value
    let game = Object.assign({}, this.data.game, {game_cost})
    this.setData({game})
  },
  onDescriptionInput: function(e) {
    let game_descrption = e.detail.value
    let game = Object.assign({}, this.data.game, {game_description})
    this.setData({game})
  },
})