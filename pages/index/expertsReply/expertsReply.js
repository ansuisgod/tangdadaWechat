// pages/index/expertsReply/expertsReply.js
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp(),
    sizes = '20';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pages:'1',
    dataInfo:'',
    reportId:'',
    replarList:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('专家回复文章的id=' + options.replyAtircalId + "&platform=" + app.globalData.platform);
    this.setData({
      platform: app.globalData.platform,
      aticalId: options.replyAtircalId,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.expectReplay();//调用接口查询专家详情信息
  },
  /**
   * @desc:调用接口查询专家详情信息
   */
  expectReplay:function(){
    var htmls = '1',
        platforms = abstac.mobilePhoneModels(this.data.platform),
        that = this,
        topicId = this.data.aticalId;
    //打印参数日志
    console.log("platforms=" + platforms + "&topicId=" + topicId);
    abstac.sms_Interface(app.publicVariable.blogDetailInterfaceAddress,
      { html: htmls, page: this.data.pages, platform: platforms, size: sizes, topic_id: topicId, wx_session_key: this.data.wxSessionKey},
    function(res){//接口返回成功
      console.log("**********专家回复详情接口返回的数据**********");
      console.log(res);
      if (res.data.result.code == '2000'){//有则获取数据
        if (res.data.data.replies == undefined){
          that.setData({
            dataInfo: res.data.data.topic,
            replarList: ''
          });
        }else{
          that.setData({
            dataInfo: res.data.data.topic,
            replarList: res.data.data.replies
          });
        }
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },function(error){//接口返回失败
      console.log(error);
    });
  },
  /**
   * @desc:点击更多触发的函数
   */
  mores:function(e){
    var that = this;
    wx: wx.showActionSheet({
      itemList: ['举报', '复制'],
      itemColor: '#000',
      success: function (res) {
        console.log(res.tapIndex);
        if (res.tapIndex == '0') {
          console.log("举报");
          that.toReport();//点击举报触发的函数
        } else if (res.tapIndex == '1') {
          console.log("复制");
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    });
    this.setData({
      reportId: e.currentTarget.dataset.quteid
    });
  },
  /**
   * @desc:点击举报触发的函数
   */
  toReport: function () {
    var that = this;
    wx: wx.showActionSheet({
      itemList: ['骚扰信息', '色情相关', '资料不当', '盗用他人资料', '垃圾广告'],
      itemColor: '#000',
      success: res => {
        let contents = res.tapIndex;
        if (contents == '0') {
          contents = '骚扰信息';
        } else if (contents == '1') {
          contents = '色情相关';
        } else if (contents == '2') {
          contents = '资料不当';
        } else if (contents == '3') {
          contents = '盗用他人资料';
        } else if (contents == '4') {
          contents = '垃圾广告';
        }
        //打印日志
        console.log("content=" + contents + '&report_user_id=' + that.data.reportId + "&topic_id=" + that.data.aticalId + "&wx_session_key=" + that.data.wxSessionKey + "&type=2");
        /**
         * @desc:调用举报的接口
         */
        abstac.sms_Interface(app.publicVariable.toReportInterfaceAddress,
          { content: contents, report_user_id: that.data.reportId, topic_id: that.data.aticalId, wx_session_key: that.data.wxSessionKey, type: '2' },
          function (res) {//举报成功
            console.log("********************举报接口返回数据***********************");
            console.log(res);
            if (res.data.result.code == '2000') {
              abstac.promptBox("举报成功！");
            } else {
              abstac.promptBox("举报失败！");
            }
          },
          function (error) {//举报失败
            console.log(res);
          });
      }
    })
  },
  /**
   * @desc:点击用户的头像进入用户的主页
   */
  homePage: function (e) {
    console.log("帖友id=" + e.target.dataset.friendid);
    //跳转到用户的主页
    wx.navigateTo({
      url: '../../../pages/homePage/homePage?friendid=' + e.target.dataset.friendid
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