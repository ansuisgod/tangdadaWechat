// pages/my/health_records/health_records.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    
  },


  /**
* @desc:获取我的参考建议文本文字的接口
* @date:2019.06.14
* @auther:li
*/
  getProfileText: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.getProfileTextInterfaceAddress,
      { wx_session_key: that.data.wxSessionKey },
      function (res) {//查询成功
        //打印日志
        console.log("****************文本文字***************");
        console.log(res);

        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data;

          if (data.data != undefined){
            wx.setStorageSync('reviewStatus', '1') //缓存信息
            that.setData({
              status: '1',
            });
          }else{
            wx.setStorageSync('reviewStatus', '0') //缓存信息
            that.setData({
              status: '1',
            });
          }

          // that.setData({
            // refGoalInfoText: data,
            // refGoalInfoTextInfo: JSON.parse(data.profile_text),
          // });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
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
    // wx.navigateTo({
    //   url: '/pages/my/Remind_set/Remind_set',
    // })
    let platform = abstac.mobilePhoneModels(this.data.platform);//手机型号
    wx.navigateTo({
      url: '/pages/my/DownApp/DownApp?status=' + platform,
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
var that = this;
    that.getProfileText()
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