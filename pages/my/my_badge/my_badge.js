// pages/my/my_badge/my_badge.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp(),
  session_key = wx.getStorageSync('sessionKey');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBadgeList:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var timestamp = Date.parse(new Date()) / 1000;
    that.setData({
      timestamp: timestamp
    });
    that.myBadgeIntegral()

 
  },



  

  /**
 * @desc:查询当前的用户的徽章信息
 * @date:2019.06.06
 * @auther:li
 */
  myBadgeIntegral: function() {
    var that = this;
    abstac.sms_Interface(app.publicVariable.myBadgeInterfaceAddress,
      { timestamp: that.data.timestamp },
      function (res) {//查询成功
        //打印日志
        console.log("****************查询当前的用户的徽章信息***************");
        console.log(res);
        let data = res.data.data.badges;
        if (res.data.result.code == '2000') {
          
          that.setData({
            myBadgeList:data
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },





  // 以下為跳转业务
  goBadgeDetails: function (e) {  //跳转入徽章详情
    let levels = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/my/badge_details/badge_details?levels=' + JSON.stringify(levels),
    })
  },
  
  GoRules: function () {  //跳转入徽章规则
    wx.navigateTo({
      url: '/pages/my/IntegralRules/IntegralRules',
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

  }
})