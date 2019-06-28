// pages/my/choose/choose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


    is_vote:1,
    // 测试数据
    testData: [
      {
        name: "测血糖", num: "0" 
      },
      {
        name: "测血压", num: "0"
      },
      {
        name: "打胰岛素", num: "1"
      },
      {
        name: "检查", num: "0"
      },
      {
        name: "运动", num: "0"
      },
      {
        name: "服药", num: "0"
      },
      {
        name: "其他", num: "0"
      },
    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  addChoose: function () {
    if (this.data.is_vote == 1) {
      this.setData({
        is_vote: 0
      })
    } else {
      this.setData({
        is_vote: 1
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