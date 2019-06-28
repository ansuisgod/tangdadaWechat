// pages/my/my.js
var abstac = require('../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    woman:'../../images/personal/woman.png',
    man:'../../images/personal/man.png',
    womanIcon: '../../images/personal/womanSex.png',
    manIcon: '../../images/personal/manSex.png',

    refreshState:'0',  //检测是否需要刷新用户信息 1为刷新
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });

    if (options.refreshState != undefined){
      that.setData({
        refreshState: options.refreshState,
      });
    }

    that.queryUserInfo()
    
  },


  /**
* @desc:个人中心的接口
* @date:2019.06.17
* @auther:li
*/
  userCenter: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.userCenterInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey },
      function (res) {//查询成功
        //打印日志
        console.log("****************个人中心的接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          var data = res.data.data;
          that.setData({
            userCenter: data,
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
* @desc:查询用户信息接口
* @date:2019.06.17
* @auther:li
*/
  queryUserInfo: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    abstac.sms_Interface(app.publicVariable.queryUserInformationInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, platform: platform,},
      function (res) {//查询成功
        //打印日志
        console.log("****************查询用户信息接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          var data = res.data.data;
          that.setData({
            queryUserInfo: data,
            refreshState:'0',
          });

        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },



  // 以下為跳转业务
  goMyPost: function () {  //跳转入我的帖子
    wx.navigateTo({
      url: '/pages/my/my_post/my_post',
    })
  },

  goMyComments: function () {  //跳转入我的评论
    wx.navigateTo({
      url: '/pages/my/my_comments/my_comments',
    })
  },

  goFriendsCircle: function () {  //跳转入糖友圈
    wx.navigateTo({
      url: '/pages/my/friends_circle/friends_circle',
    })
  },

    goDraftBox: function() {  //跳转入草稿箱
    wx.navigateTo({
      url: '/pages/my/draft_box/draft_box',
    })
  },

  goMyPoints: function () {  //跳转入我的积分
    wx.navigateTo({
      url: '/pages/my/my_points/my_points',
    })
  },

  goHealthRecords: function () {  //跳转入健康记录
    wx.navigateTo({
      url: '/pages/my/health_records/health_records',
    })
  },
  
  goSetting: function () {  //跳转入设置
    wx.navigateTo({
      url: '/pages/my/setting/setting',
    })
  },

  goShare: function() {  //跳转入邀请赚积分
    wx.navigateTo({
      url: '/pages/my/share/share',
    })
  },

  ModifyMyInfo: function () {  //跳转个人信息修改
    wx.navigateTo({
      url: '/pages/my/ModifyMyInfo/ModifyMyInfo',
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
    that.userCenter()

    if (that.data.refreshState == '1'){
      that.queryUserInfo()
    }
    
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