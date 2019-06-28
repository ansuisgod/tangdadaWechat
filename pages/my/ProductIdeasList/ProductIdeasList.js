// pages/my/ProductIdeasList/ProductIdeasList.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getFeedList:[],  //y意见列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
  },






  /**
   * @desc:意见列表的接口
   * @date:2019.06.17
   * @auther:li
   */
  getFeedList: function () {
    var that = this;

    wx.showLoading({
      title: '请求中',
    });

    abstac.sms_Interface(app.publicVariable.getFeedInterfaceAddress, {
      wx_session_key: that.data.wxSessionKey,
    },
      function (res) { //查询成功
        //打印日志
        wx.hideLoading();
        console.log("****************意见列表的接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;


          for (var i = 0; i < data.length; i++) {
            var list = data[i];
            list.contents = JSON.parse(list.content)
            // console.log(JSON.parse(list.content))
          }
          // console.log(JSON.parse(data[2].content))

          // 
          that.setData({
            getFeedList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) { 
        wx.hideLoading();//查询失败
        console.log(error);
      });
  },








  goFill: function () {  //跳转入产品建议输入
    wx.navigateTo({
      url: '/pages/my/ProductIdeas/ProductIdeas',
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
    that.getFeedList()
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