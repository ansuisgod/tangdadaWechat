// pages/index/signIn/signIn.js
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp(),
    page = 1,
    sizess = '20';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insertDatas:'',
    times:'',//签到的次数
    singinStaus: '',//签到的状态 cicleActiveBox
    userPoint:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.userPoint();
    this.insertData();
    this.siginStaus();
  },
  /**
   * @func:userPoint
   * @desc:查询用户的积分
   * @date:20190813
   */
  userPoint:function(){
    var that = this,
        platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.queryPointsInterfaceAddress,
      { platform: platform, wx_session_key: this.data.wxSessionKey },
      function (res) {
        console.log("**********查询用户积分的接口**********");
        console.log(res);
        if (res.data.result.code == '2000') {
          that.setData({
            userPoint: res.data.data.points
          });
        }
      },
      function (error) {
        console.log(error);
      });
  },
  /**
   * @func:generateArray
   * @desc:签到天数
   * @date:20190813
   */
  generateArray: function (timer) {
    let that = this,
        newObj = [];
    //循环输出图片
    for (let i = 0; i < 50; i++) {
      newObj[i] = {
        id: i + 1,
        state: false,
        src:'../../../images/personal/notFill.png'
      }
    }
    //遍历数据对象动态改变数组里面的值
    for (let K = 0; K < newObj.length; K++) {
      let lists = newObj[K];
      if (lists.id <= timer) {
        lists.state = true;
      }
      if (lists.state == true){
        lists.src = '../../../images/personal/filled.png';
      }
      if (lists.state == false) {
        lists.src = '../../../images/personal/notFill.png';
      }
    }
    //向里面赋值
    that.setData({
      newObj: newObj
    })
    //返回数据信息
    return newObj;
  },
  /**
   * @func:insertData
   * @desc:查询商品列表的信息
   * @date:20190812
   */
  insertData:function(){
    var that = this;
    abstac.sms_Interface(app.publicVariable.signTimeListInterfaceAddress, 
    {size: sizess, page: page, wx_session_key: this.data.wxSessionKey},
    function(res){
      console.log("**********查询签到的时间列表的接口**********");
      console.log(res);
      if (res.data.result.code == '2000'){
        that.setData({
          insertDatas: res.data.data.rows,
          times: res.data.data.times
        });
        that.generateArray(res.data.data.times);
      }
    },
    function(error){
      console.log(error);
    });
  },
  /**
   * @func:siginStaus
   * @desc:查询签到的状态
   * @date:20190812
   */
  siginStaus:function(){
    var that = this;
    abstac.sms_Interface(app.publicVariable.siginStausInterfaceAddress,
      {id: '80', wx_session_key: this.data.wxSessionKey },
      function (res) {
        console.log("**********查询是否已经签到的接口**********");
        console.log(res);
        if (res.data.result.code == '2000'){
          if (res.data.data.user_task == null){}else{
            that.setData({
              singinStaus: res.data.data.user_task.status
            });
          }
        }else{
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {
        console.log(error);
      });
  },
  /**
   * @func:sigin
   * @desc:点击签到按钮
   * @date:20190812
   */
  sigin:function(){
    var that = this;
    abstac.sms_Interface(app.publicVariable.siginsInterfaceAddress,
      { id: '80', wx_session_key: wx.getStorageSync('sessionKey') },
      function (res) {
        console.log("**********签到的接口**********");
        console.log(res);
        if (res.data.result.code == '2000') {
          abstac.promptBox("已签到");
          that.insertData();
          that.siginStaus();
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {
        console.log(error);
      });
  },
  /**
   * @func:toReceive
   * @desc:点击领取按钮
   * @date:20190812
   */
  toReceive:function(e){
    //跳转到兑换的详情页面
    wx.navigateTo({
      url: '../../../pages/shopping/change/change?goodsid=' + e.currentTarget.dataset.goodsid + '&userpoints=' + this.data.userPoint
    })
  },
  /**
   * @func:sportsRules
   * @desc:点击活动规则的文字跳转页面
   * @date:20190812
   */
  sportsRules:function(){
    //跳转到活动规则的详情页面
    wx.navigateTo({
      url: '../../../pages/index/sportsRules/sportsRules'
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