// pages/my/add_motion_collect/add_motion_collect.js

var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {


    page:'1',
    size:'20',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
  },



  /**
* @desc:我的运动收藏列表的接口
* @date:2019.06.10
* @auther:li
*/
  favoriteSportList: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.favoriteSportListInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, page: that.data.page, size: that.data.size},
      function (res) {//查询成功
        //打印日志
        console.log("****************运动记录列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          var data = res.data.data.sports;
          that.setData({
            favoriteSportList: data,
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
  goFill: function (e) {  //跳转入运动记录填写
    let toId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/my/add_motion_Fill/add_motion_Fill?id=' + toId + '&alter=0',
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
    var that = this;
    that.favoriteSportList()
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