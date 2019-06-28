// pages/blog/moreFriend/moreFriend.js
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp(),
    tag_ids = '25',
    sizes = '20';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:'',
    pages:'1',
    keyWord:'',
    friendListInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("搜索内容=" + options.searchContent);
    this.setData({
      platform: app.globalData.platform,
      gender: options.gender,
      city: options.city,
      keyWord: options.searchContent,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.queryAllFriend();//获取全部的好友的列表信息
  },
  /** 
   * @desc:获取全部的好友的列表信息
   * @parm:platform[判断是什么系统]、size【数据数量】、gender【性别代码】、city=0【城市】、wx_session_key【微信code值】、page=【页数】、keyword【搜索内容】
   */
  queryAllFriend:function(){
    let platForms = abstac.mobilePhoneModels(this.data.platform),//手机型号
        that = this;
    //打印参数
    abstac.promptBox("正在加载中...");
    console.log("platform=" + platForms + "&size=" + sizes + "&gender=" + this.data.gender + "&city=" + this.data.city + "&wx_session_key=" + this.data.wxSessionKey + "&page=" + this.data.pages + "&keyword=" + this.data.keyWord);
    abstac.sms_Interface(app.publicVariable.searchGoodFrendInterfaceAddress,
      { platform: platForms, size: sizes, gender: this.data.gender, city: this.data.city, wx_session_key: this.data.wxSessionKey, page: this.data.pages, keyword: this.data.keyWord},
    function(res){//成功
      //打印日志
      console.log("*********搜索好友的接口返回的数据*****************");
      console.log(res);
      if (res.data.result.code == '2000'){
        var datas = res.data.data.users;
        console.log(datas.length);
        var friendAll = that.data.friendListInfo,
            dataFriend = res.data.data.users;
        if (datas.length == '0'){
          abstac.promptBox("没有更多数据了！");
          return;
        }else{
          //遍历日期的字段去掉后面的时分秒
          for (var i = 0; i < datas.length; i++) {
            datas[i].last_login_at = datas[i].last_login_at.substr(0, 10);
          }
          if (that.data.pages == '1') {
            friendAll = dataFriend;
            that.setData({
              friendListInfo: dataFriend
            });
          } else {
            that.setData({
              friendListInfo: friendAll.concat(dataFriend)
            });
          }
        }
        that.data.pages++;
      }else{
        abstac.promptBox(res.data.result.message);
      }
      
    },function(error){//失败
      console.log(error);
    });
  },
  queryInfo:function(e){
    console.log("frid="+e.currentTarget.dataset.frid);
    wx.navigateTo({
      url: '../../../pages/homePage/homePage?friendid=' + e.currentTarget.dataset.frid
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
    this.queryAllFriend();//获取全部的好友的列表信息
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.queryAllFriend();//获取全部的好友的列表信息
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})