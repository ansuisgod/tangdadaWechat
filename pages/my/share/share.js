// pages/my/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // http://api.prod.tangdada.com.cn/im/item/integral_rule.html
    // optionsurl:'https://sit.tangdadatech.com/im/activities/register/index.jsp',

    shareMenu: false,  //弹框
    introduce: false,
    introduce2:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  invite: function () {
    var that = this;
    let menu = that.data.shareMenu
    that.setData({
      shareMenu: !menu,
    })

  },

  hideCover: function () {
    let menu = this.data.shareMenu
    this.setData({
      shareMenu: !menu,
    })
  },

  myCatchTouch: function () {  //防止弹窗页面穿透
    console.log('stop user scroll it!');
    return;
  },


  rules: function () {
    var that = this;
    that.setData({
      introduce: true
    })
  },

  shut: function () {
    this.setData({
      introduce: false
    })
  },






// 我的邀请
  MyInvitation: function () {
    var that = this;
    that.setData({
      introduce2: true
    })
  },

  shut2: function () {
    this.setData({
      introduce2: false
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