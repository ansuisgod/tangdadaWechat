// pages/Page_5/my_comments/my_comments.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();
var size = '20';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: '1',

    myJoinTopic: [], //我的评论列表
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


    that.myJoinTopic()
  },







  /**
 * @desc:我的评论列表的接口
 * @date:2019.06.18
 * @auther:li
 */
  myJoinTopic: function () {
    var that = this;
    wx.showLoading({
      title: '请求中',
    });
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    abstac.sms_Interface(app.publicVariable.myJoinTopicInterfaceAddress,
      { page: that.data.page, wx_session_key: this.data.wxSessionKey, platform: platform, size: size },
      function (res) {//查询成功
        //打印日志
        wx.hideLoading();
        console.log("****************我的评论列表的接口***************");
        console.log(res);
        if (res.data.result.code == '2000') {



          /**
           * 将后台返回的数据中的summary字符串转化为json格式
           */
          var str = res.data.data.topics;
          for (var i = 0; i <= str.length - 1; i++) {
            str[i].summary = JSON.parse(str[i].summary);
          }
          /**
           * 将后台的数据放到数组中
           */
          var datas = res.data.data.topics;
          var newList = that.data.myJoinTopic;
          var totalPage = res.data.pages;//数据的总页数
          /**
           * 判断当前的页数是否超过了总页数
           */
          if (that.data.page == 1) {
            newList = datas;
            that.setData({
              myJoinTopic: datas,
            });
          } else if (that.data.page > totalPage) {
            abstac.promptBox("没有数据了！");
            that.data.page = 1;
          } else {
            abstac.promptBox("加载中...");
            that.setData({
              myJoinTopic: newList.concat(datas),
              page: that.data.page,
              totalPage: res.data.pages
            });
          }
          that.data.page++;






          // that.setData({
          //   // userIntegral: res.data.data.points
          // });
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
   * @desc:点击进入文章的详情页面
   */
  clickIntoDetail: function (e) {
    console.log("文章的id主键=" + e.currentTarget.dataset.articlid);//打印日志

    //跳转到帖子的详情页面
    wx.navigateTo({
      url: '/pages/blog/blogDetail/blogDetail?blogId=' + e.currentTarget.dataset.articlid
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
    console.log("触底事件的处理函数,页数" + this.data.page);

    //判断是否超过了总页数，如果超过了则没有下一页，否则还有下一页的数据
    if (this.data.totalPage < this.data.page) {
      abstac.promptBox("没有数据了！");
      return;
    } else {
      this.myJoinTopic();
    }

    /**
     * 滚动到底部是就让滚动条回到顶部
     
    wx.pageScrollTo({
      scrollTop: 0,
    })*/
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})