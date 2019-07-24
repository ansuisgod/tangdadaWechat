// pages/homePage/homePage.js
var abstac = require('../../commonmethod/abstract.js'),
    app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    friendId:'',//帖友的id
    blogUserInfo:'',//用户的信息展示
    userCenter:'',//用户中心的信息
    userInfor:'',
    blogDate:'',
    userId:'',//用户的id
    followed: '',//是否已经关注1已经关注0未关注
    myFollowNum:'',
    followMeNum:'',
    showOrHiden:'none'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("帖友id=" + options.friendid);
    this.setData({
      friendId: options.friendid,
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.queryBlogFriendInfomation();//获取帖友的用户信息
  },
  /**
   * @desc：获取帖友的用户信息
   * @note：新增加的代码
   * @date：20190606
   * @param：friend_id：帖友id wx_session_key：微信的code值
   */
  queryBlogFriendInfomation:function(){
    //打印日志
    console.log("帖友的id=" + this.data.friendId);
    var that = this;
    //访问接口
    abstac.sms_Interface(app.publicVariable.queryBlogFriendInformationInterfaceAddress,
      { friend_id: this.data.friendId, wx_session_key: this.data.wxSessionKey},//接口的参数
      function(res){//成功回调的函数
        console.log("*********查询贴友信息接口返回的数据*************");
        console.log(res);
        if (res.data.result.code == '2000'){
          
          if (res.data.data.topic == null){
            that.setData({
              blogUserInfo: res.data.data.user,//贴友的信息
              userCenter: res.data.data.userCenter,//下面的关注列表信息
              userInfor: '',//帖子
              blogDate: '',//帖子的日期
              userId: res.data.data.user.id,
              myFollowNum: res.data.data.follow_me_num,
              followMeNum: res.data.data.my_follow_num,
              showOrHiden: 'none',
              followed: res.data.data.follow_status//是否已经关注1已经关注0未关注
            });
          }else{
            var userTopic = res.data.data.topic,
                createdDate = userTopic.created_at;
            userTopic.summary = JSON.parse(userTopic.summary);
            that.setData({
              blogUserInfo: res.data.data.user,//贴友的信息
              userCenter: res.data.data.userCenter,//下面的关注列表信息
              userInfor: res.data.data.topic,//帖子
              blogDate: createdDate.substr(0, 10),//帖子的日期
              userId: res.data.data.user.id,
              myFollowNum: res.data.data.follow_me_num,
              followMeNum: res.data.data.my_follow_num,
              showOrHiden: 'block',
              followed: res.data.data.follow_status//是否已经关注1已经关注0未关注
            });
          }
        }else{
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//失败回调的函数
        console.log(error);
    });
  },
  /**
   * @desc:点击关注对方按钮触发的函数
   * @param:(关注的接口需要的参数)platform:设备系统[andorid:2 ios:1]、user_id：用户的id、followed:是否已经关注[1已经关注0未关注]、wx_session_key：微信的code值
   * @date:2019/06/10
   */
  attentionOther:function(){
    let platform = abstac.mobilePhoneModels(this.data.platform),//手机型号
        userId = this.data.userId,//用户的id
        followed = this.data.followed,
        that = this;
    abstac.sms_Interface(app.publicVariable.attentionOtherInterfaceAddress,
      { platform: platform, wx_session_key: this.data.wxSessionKey, user_id: userId, followed: followed},
    function (res) {//成功回调的函数
        console.log("*********点击关注对方接口返回的数据*************");
        console.log(res);
      /*判断是否关注成功，成功则将按钮置为灰色*/
      if (res.data.result.code == '2000'){
        abstac.promptBox("关注请求已经发出，请等待...");
        that.setData({
          followed:'1'
        });
      }else{
        abstac.promptBox(res.data.result.message);
        that.setData({
          followed: '0'
        });
      }
    },
    function (error) {//失败回调的函数
      console.log(error);
    });
  },
  /**
   * @desc:取消关注
   * @param:(关注的接口需要的参数)platform:设备系统[andorid:2 ios:1]、user_id：用户的id、wx_session_key：微信的code值
   * @date:2019/06/10
   */
  cancelTheAttention:function(){
    let platform = abstac.mobilePhoneModels(this.data.platform),//手机型号
        userId = this.data.userId,//用户的id
        that = this;
    abstac.sms_Interface(app.publicVariable.cancelAttentionInterfaceAddress,
      { platform: platform, wx_session_key: this.data.wxSessionKey, user_id: userId},
      function (res) {//成功回调的函数
        console.log("*********点击关注对方接口返回的数据*************");
        console.log(res);
        /*判断是否关注成功，成功则将按钮置为灰色*/
        if (res.data.result.code == '2000') {
          abstac.promptBox("取消关注成功");
          that.setData({
            followed: '0'
          });
        } else {
          abstac.promptBox(res.data.result.message);
          that.setData({
            followed: '1'
          });
        }
      },
      function (error) {//失败回调的函数
        console.log(error);
      });
  },
  /**
   * @desc:跳转到TA的粉丝页面
   * @date:20190711
   * @auther：an
   */
  itFans:function(){
    //跳转到TA的粉丝页面
    wx.navigateTo({
      url: '../../pages/my/friends_circle/friends_circle?friendId=' + this.data.friendId+'&state=1'
    })
  },
  /**
   * @desc:跳转到TA的关注页面
   * @date:20190711
   * @auther：an
   */
  itFlows:function(){
    //跳转到TA的关注页面
    wx.navigateTo({
      url: '../../pages/my/friends_circle/friends_circle?friendId=' + this.data.friendId + '&state=0'
    })
  },
  /**
   * @desc:跳转到TA发表的帖子
   * @date:20190711
   * @auther：an
   */
  postings:function(){
    if (this.data.followed == '1' || this.data.followed == '0'){
      abstac.promptBox("关注成功才能查看");
    }else{
      wx.navigateTo({
        url: '../../pages/my/my_post/my_post?userid=' + this.data.friendId
      })
    }
  },
  infoss:function(){
    abstac.promptBox("已申请关注对方");
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.queryBlogFriendInfomation();//获取帖友的用户信息
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