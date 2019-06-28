// pages/my/setting/setting.js
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

  },


  // 以下為跳转业务
  goHelp: function () {  //跳转入帮助
    wx.navigateTo({
      url: '/pages/my/help_list/help_list',
    })
  },

  goArticle: function () {  //跳转入文字
    wx.navigateTo({
      url: '/pages/my/setting_article/setting_article?status=1',
    })
  },


  goProductIdeas: function () {  //跳转入产品建议
    wx.navigateTo({
      url: '/pages/my/ProductIdeasList/ProductIdeasList',
    })
  },

  


  goBj: function () {  //跳转入更改消息背景
    wx.showModal({
      title: '温馨提示',
      content: '新功能开发中，敬请期待！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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