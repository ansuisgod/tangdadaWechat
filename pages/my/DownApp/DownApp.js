// pages/my/DownApp/DownApp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    AndroidUrl: 'https://android.myapp.com/myapp/detail.htm?apkName=cn.tangdada.tangbang&ADTAG=mobile',
    IOSUrl: 'https://itunes.apple.com/cn/app/id942810308',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      status: options.status
    })

    if (options.status == '1') {
      wx.setNavigationBarTitle({
        title: 'IOS下载'
      })
    } else if (options.status == '2') {
      wx.setNavigationBarTitle({
        title: 'Android下载'
      })
    } 


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