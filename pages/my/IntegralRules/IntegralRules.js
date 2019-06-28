// pages/my/IntegralRules/IntegralRules.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp(),
  session_key = wx.getStorageSync('sessionKey');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    badgeRulesList:[],//列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
     that.badgeRulesList()
  },

  /**
* @desc:徽章规则的接口
* @date:2019.06.18
* @auther:li
*/
  badgeRulesList: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.badgeRulesInterfaceAddress,
      { },
      function (res) {//查询成功
        //打印日志
        console.log("****************徽章规则的接口***************");
        console.log(res);
        let data = res.data.data;
        if (res.data.result.code == '2000') {

          that.setData({
            badgeRulesList: data
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
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