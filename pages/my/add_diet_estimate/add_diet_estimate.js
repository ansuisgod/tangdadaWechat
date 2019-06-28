// pages/my/add_diet_estimate/add_diet_estimate.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp(),
  session_key = wx.getStorageSync('sessionKey');



Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      platform: app.globalData.platform
    });

    that.foodCategoryList();
  },





  /**
   * @desc:获取食物热量估算的接口
   * @date:2019.06.10
   * @auther:li
   */
  foodCategoryList: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    abstac.sms_Interface(app.publicVariable.foodCategoryInterfaceAddress,
      { platform: platform, },
      function (res) {//查询成功
        //打印日志
        console.log("****************查询食物热量估算的列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          /**
           * 判断当前的页数是否超过了总页数
           */

          var datas = res.data.data.food_groups;
          that.setData({
            foodCategoryLists: datas,
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

  estimateDetails: function () {  //跳转入饮食记录估算详情
    wx.navigateTo({
      url: '/pages/my/add_diet_estimateDetails/add_diet_estimateDetails',
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