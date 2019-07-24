// pages/inputNickName/inputNickName.js
/**
 * 注册用户输入昵称
 */
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    btnFontColor: '#a8a5a5',//下一步按钮的初始化字体颜色
    btnBgColor: '#e5e5e5',//下一步按钮的初始化背景颜色
    nameInputValue: '',
    nextDisable: false,//下一步按钮的禁用状态
    regCode: '',//从上个页面传的参数：注册密码
    regPhone: '',//从上个页面传的参数：注册电话号码
    verificationCode: ''//从上个页面传的参数：注册验证码
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
      regCode: options.regCode,
      regPhone: options.regPhone,
      verificationCode: options.verificationCode,
      inviterid: options.inviterid
    })
    console.log(options.inviterid);
  },
  /**
   * 输入昵称的输入框输入触发的函数
   */
  nameInput: function (e) {
    this.setData({
      nameInputValue: e.detail.value
    });
  },
  /**
   * 输入昵称的输入框失去焦点触发的函数
   */
  nameBlur: function () {
    console.log("用户输入的昵称======" + this.data.nameInputValue);
    var nameIn = this.data.nameInputValue;
    if (nameIn == '') {
      this.setData({
        btnFontColor: '#a8a5a5',
        btnBgColor: '#e5e5e5',
        nextDisable: true
      });
    } else {
      this.setData({
        btnFontColor: '#fff',
        btnBgColor: '#ff7382',
        nextDisable: false
      });
    }
  },
  /**
   * 点击下一步按钮触发的函数
   */
  nextFunc: function () {
    wx.navigateTo({
      url: '../choosePicture/choosePicture?nickName=' + this.data.nameInputValue + '&regCode=' + this.data.regCode + '&regPhone=' + this.data.regPhone + '&verificationCode=' + this.data.verificationCode + '&inviterid=' + this.data.inviterid
    })
  },
  /**
   * 点击跳过按钮
   */
  skip: function () {
    wx.navigateTo({
      url: '../choosePicture/choosePicture?nickName=&regCode=' + this.data.regCode + '&regPhone=' + this.data.regPhone + '&verificationCode=' + this.data.verificationCode + '&inviterid=' + this.data.inviterid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})