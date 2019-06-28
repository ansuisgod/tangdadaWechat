// pages/my/badge_details/badge_details.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {


    levelsList:[],//列表

    badgeProgess: [], //用户完成徽章列表的接口

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      levelsList: JSON.parse(options.levels),
      wxSessionKey: wx.getStorageSync('sessionKey')
    })


  // setTimeout(function () {
    that.badgeProgess()
        // }, 500)

  },




  /**
 * @desc:用户完成徽章列表的接口
 * @date:2019.06.18
 * @auther:li
 */
  badgeProgess: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.badgeProgessInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey },
      function (res) {//查询成功
        //打印日志
        console.log("****************用户完成徽章列表的接口***************");
        console.log(res);
        let data = res.data.data;
        if (res.data.result.code == '2000') {


          // 合并数据
          let list = res.data.data;

          for (var i = 0; i < list.length; i++) {
            var listbadge = list[i];

            if (listbadge.badge_id == that.data.levelsList.id) {
              that.data.levelsList.descriptions = listbadge.description;
              that.data.levelsList.level = listbadge.level;
            } else{
              that.data.levelsList.descriptions = '您还未开始过这个任务';
              that.data.levelsList.level = 0;
            }

          }


          console.log(list)

          that.setData({
            badgeProgess: list,
            levelsList:that.data.levelsList,
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