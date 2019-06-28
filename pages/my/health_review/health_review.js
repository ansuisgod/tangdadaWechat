// pages/my/health_review/health_review.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    InfoDetail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      that.setData({
        InfoDetail: JSON.parse(options.InfoDetail),
        wxSessionKey: wx.getStorageSync('sessionKey')
      })

    that.doEvaluate()
  },


  /**
   * @desc:健康评测的接口
   * @date:2019.06.13
   * @auther:li
   */
  doEvaluate: function () {
    var that = this;

    abstac.sms_Interface(app.publicVariable.doEvaluateInterfaceAddress, {
      wx_session_key: this.data.wxSessionKey,
      gender: that.data.InfoDetail[0].gender,
      age: that.data.InfoDetail[0].age,
      high: that.data.InfoDetail[0].high,
      weight: that.data.InfoDetail[0].weight,
      type: that.data.InfoDetail[0].type,
      pregnancy: that.data.InfoDetail[0].pregnancy,
      sick_year: that.data.InfoDetail[0].sick_year,
      sport: that.data.InfoDetail[0].sport,
      history: that.data.InfoDetail[0].history,
      blood_sugar: that.data.InfoDetail[0].blood_sugar,
      blood_fat: that.data.InfoDetail[0].blood_fat,
      blood_pressure: that.data.InfoDetail[0].blood_pressure,
      work: that.data.InfoDetail[0].work,
      complication: that.data.InfoDetail[0].complication
    },
      function (res) { //查询成功
        //打印日志
        console.log("****************健康评测的接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;

          that.setData({
            results: data
          });

          
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) { //查询失败
        console.log(error);
      });
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

  }
})