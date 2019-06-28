// pages/my/draft_box/draft_box.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();
var size = '20';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ts: false,  //测试用，判断是否有内容

    // 测试数据
    testData: [
      {
        name: "测试数据", time: "2019-05-02 17:14:29"
      },
      {
        name: "测试的", time: "2019-05-09 05:41:29"
      },
    ],


    page: '1',
    topicNotes: [], //草稿箱列表
    delBounced: false,//删除弹框
    delId:'', //草稿id
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


    that.topicNotes()
  },





  /**
 * @desc:草稿箱列表的接口
 * @date:2019.06.18
 * @auther:li
 */
  topicNotes: function () {
    var that = this;
    wx.showLoading({
      title: '请求中',
    });
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    abstac.sms_Interface(app.publicVariable.topicNotesInterfaceAddress,
      { page: that.data.page, wx_session_key: this.data.wxSessionKey, platform: platform, size: size },
      function (res) {//查询成功
        //打印日志
        wx.hideLoading();
        console.log("****************草稿箱列表的接口***************");
        console.log(res);
        if (res.data.result.code == '2000') {

            that.setData({
              topicNotes: res.data.data.topicNotes,
            });
          
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
        wx.hideLoading();
      });
  },



  /**
 * @desc:删除草稿箱的接口
 * @date:2019.06.18
 * @auther:li
 */
  delTopicNotes: function () {
    var that = this;

    abstac.sms_Interface(app.publicVariable.delTopicNotesInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, ids: that.data.delId },
      function (res) {//查询成功
        //打印日志
        wx.hideLoading();
        console.log("****************删除草稿箱的接口***************");
        console.log(res);
        if (res.data.result.code == '2000') {

          that.topicNotes()
          that.setData({
            delBounced: false
          });

        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },

// delTopicNotesInterfaceAddress: httpAdress + '/im/api/v1/note/delete_topic_notes.json',//删除草稿箱的接口
// 需要传（2）  一个“ids”  //删除项id  和一个wx_session_key














  ////删除事件
  //删除弹框显示
  delBounced: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.info.id)
    let delId = e.currentTarget.dataset.info.id
    that.setData({
      delBounced: true,
      delId: delId,
    })
  },


  //删除弹框关闭
  delBounced_close: function () {

    this.setData({
      delBounced: false
    })
  },

  //弹框点击确认按钮
  delBounced_operate: function () {

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.delTopicNotes()

  },
  ////删除事件end


  // 以下為跳转业务
  goRelease: function (e) {  //跳转入发帖页
    var that = this;
    console.log(e.currentTarget.dataset.info)
    let info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/blog/release/release?info=' + JSON.stringify(info),
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

  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})