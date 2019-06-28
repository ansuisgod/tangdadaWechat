// pages/Page_5/friends_circle/friends_circle.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {

    page: '1',
    size:'20',









    ts: false, //测试用，判断是否有内容
    ts1: true, //测试用，判断是否有内容
    // 测试数据
    testData: [
      {
        name: "安苏", img: "../../../images/personal/man.png"
      },
      {
        name: "糖大大糖小妞", img: "../../../images/personal/woman.png"
      },
    ],



    followsLists:[],//关注列表
    fansList:[],//粉丝列表
    currentPage: 0,
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

    that.followsList()
    that.fansList()
  },








  /**
   * @desc:获取我的关注的接口
   * @date:2019.06.06
   * @auther:li
   */
  followsList: function () {
    var that = this;
    wx.showLoading({
      title: '请求中',
    });
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    console.log(that.data.page + '-' + that.data.wxSessionKey + '-' + platform + '-' + that.data.size)
    console.log(app.publicVariable.followsInterfaceAddress)

    abstac.sms_Interface(app.publicVariable.followsInterfaceAddress,
      { page: that.data.page, wx_session_key: that.data.wxSessionKey, platform: platform, size: that.data.size },
      function (res) {//查询成功
        //打印日志
        wx.hideLoading();
        console.log("****************查询我的关注的列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
        let data = res.data.data.users
            that.setData({
              followsLists: data,
            });
          
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
        wx.hideLoading();
      });
  },



  /**
 * @desc:获取我的粉丝的接口
 * @date:2019.06.06
 * @auther:li
 */
  fansList: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号


    abstac.sms_Interface(app.publicVariable.fansInterfaceAddress,
      { page: that.data.page, wx_session_key: that.data.wxSessionKey, platform: platform, size: that.data.size },
      function (res) {//查询成功
        //打印日志
        console.log("****************查询我的关注的列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          let data = res.data.data.users
          that.setData({
            fansList: data,
          });

        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },


  

  
  /**  // 以下為跳转业务
   * @desc:点击用户的头像进入用户的主页
   */
  checkInfo: function (e) {
    //跳转到用户的主页
    wx.navigateTo({
      url: '/pages/homePage/homePage?friendid=' + e.currentTarget.dataset.id
    })
  },

  search: function () { //跳转到搜索
    wx.navigateTo({
      url: '/pages/blog/search/search'
    })
  },




  turnPage: function(e) {
    console.log(e.currentTarget.dataset.types)
    this.setData({
      currentPage: e.currentTarget.dataset.types
    })
  },
  turnTitle: function(e) {
    if (e.detail.source == "touch") {
      console.log(e.detail.current)
      this.setData({
        currentPage: e.detail.current
      })
    }
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