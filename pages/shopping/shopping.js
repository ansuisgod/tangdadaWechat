// pages/shopping/shopping.js
var abstac = require('../../commonmethod/abstract.js'),
    app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userIntegral:'',//用户的积分
    userName:'',//用户的昵称
    hasUserInfo:false,
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
    userPic:'',
    goodsLists:'',
    goodsIds:'',
    page:'1',
    woman: '../../images/personal/woman.png',
    man: '../../images/personal/man.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.goodsList(this.data.page);//查询商品的列表的接口
    this.getUserPicture();//获取微信用户的头像，一开始要按钮触发获取信息头像
    this.queryIntegral();//查询用户的积分
  },
  /**
   * @desc:获取微信用户的头像，一开始要按钮触发获取信息头像
   * @date:2019.06.03
   * @auther:an
   */
  getUserPicture:function(){
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.queryUserInformationInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, platform: platform, },
      function (res) {//查询成功
        //打印日志
        console.log("****************查询用户信息接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;
          that.setData({
            userPic: data
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },
  /**
   * @desc:查询商品的列表的接口
   * @date:2019.06.03
   * @auther:an
   */
  goodsList:function(){
    var that = this;
    abstac.sms_Interface(app.publicVariable.goodsListfaceAddress,
      { page: this.data.page },
      function (res) {//查询成功
        //打印日志
        console.log("****************查询商品的列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000'){
          /**
           * 判断当前的页数是否超过了总页数
           */
          var totalPage = res.data.data.pages;//数据的总页数
          var datas = res.data.data.items;
          var newList = that.data.goodsLists;
          if (that.data.page == 1) {
            newList = datas;
            that.setData({
              goodsLists: datas,
            });
          }else if (that.data.page > totalPage) {
            abstac.promptBox("没有数据了！");
            that.data.page = 1;
            return;
          } else {
            that.setData({
              goodsLists: newList.concat(datas),
              page: that.data.page,
              totalPage: res.data.data.pages
            });
          }
          that.data.page++;
        }else{
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },
  /**
   * @desc:查询当前的用户的积分
   * @date:2019.06.03
   * @auther:an
   */
  queryIntegral:function(){
    var that = this;
    abstac.sms_Interface(app.publicVariable.queryPointsInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey},
    function(res){//查询成功
      //打印日志
      console.log("****************查询当前的用户的积分***************");
      console.log(res);
      if(res.data.result.code == '2000'){
        var userName = wx.getStorageSync('wxnickname');
        that.setData({
          userIntegral: res.data.data.acc_points,
          userName: userName
        });
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },
    function(error){//查询失败
      console.log(error);
    });
  },
  /**
   * 点击我要兑换的按钮跳转页面
   */
  wantChange:function(e){
    console.log("商品的id=" + e.currentTarget.dataset.goodsid);
    //跳转到兑换的详情页面
    wx.navigateTo({
      url: '../../../change/change?goodsid=' + e.currentTarget.dataset.goodsid
    })
  },
  /**
   * 点击跳转到兑换的详情页面
   */
  intoDetail:function(e){
    console.log("商品的id="+e.currentTarget.dataset.goodsid);
    //跳转到兑换的详情页面
    wx.navigateTo({
      url: '../../../goodsDetails/goodsDetails?goodsid=' + e.currentTarget.dataset.goodsid
    })
  },
  /**
   * @desc:点击用户的头像消息的部分触发的函数
   */
  integralList:function(){
    //跳转到积分详细列表页面
    wx.navigateTo({
      url: '../../pages/my/my_points/my_points'
    })
  },
  /**
   * @desc:点击我要兑换按钮触发的函数
   
  forRecord: function () {
    wx.navigateTo({
      url: '../../../forRecord/forRecord'
    })
  },
  */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.goodsList(this.data.page);//查询商品的列表的接口
    this.getUserPicture();//获取微信用户的头像，一开始要按钮触发获取信息头像
    this.queryIntegral();//查询用户的积分
  },
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
  onPullDownRefresh: function () {
    this.goodsList(this.data.page);//查询商品的列表的接口
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底事件的处理函数,页数" + this.data.page);
    //判断是否超过了总页数，如果超过了则没有下一页，否则还有下一页的数据
    if (this.data.totalPage < this.data.page){
      return;
    }else{
      this.goodsList();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})