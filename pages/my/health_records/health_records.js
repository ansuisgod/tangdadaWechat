// pages/my/health_records/health_records.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },


  // 以下為跳转业务
  goBloodGlucoseRecord: function() { //跳转入血糖记录
    wx.navigateTo({
      url: '/pages/my/blood_glucose_record/blood_glucose_record',
    })
  },

  goMotionRecords: function() { //跳转入运动记录
    wx.navigateTo({
      url: '/pages/my/motion_records/motion_records',
    })
  },

  goDietRecords: function() { //跳转入饮食记录
    wx.navigateTo({
      url: '/pages/my/diet_records/diet_records',
    })
  },

  goWeightRecords: function() { //跳转入体重记录
    wx.navigateTo({
      url: '/pages/my/weight_records/weight_records',
    })
  },

  goBloodPressureRecorded: function() { //跳转入血压记录
    wx.navigateTo({
      url: '/pages/my/blood_pressure_recorded/blood_pressure_recorded',
    })
  },

  goStatistical: function() { //跳转入统计
    wx.navigateTo({
      url: '/pages/my/Statistical/Statistical',
    })
  },

  goAppraisal: function () { //跳转入测评
    wx.navigateTo({
      url: '/pages/my/appraisal/appraisal',
    })
  },

  goRemindSet: function () { //跳转入提醒设置
    wx.navigateTo({
      url: '/pages/my/Remind_set/Remind_set',
    })
  },


  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})