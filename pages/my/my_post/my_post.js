// pages/Page_5/my_post/my_post.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCreateTopic:[], //我的发帖列表
    isFromSearch: true,   // 用于判断searchSongList数组是不是空数组，默认true，空的数组
    page: 1,   // 设置加载的第几次，默认是第一次
    size: 5,      //返回数据的个数
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
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


    that.myCreateTopic()
  },





  /**
 * @desc:我的发帖列表的接口
 * @date:2019.06.18
 * @auther:li
 */
  myCreateTopic: function () {
    var that = this;

    let page = that.data.page,//把第几次加载次数作为参数
      size = that.data.size; //返回数据的个数

    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    wx.showLoading({
      title: '请求中',
    });
    abstac.sms_Interface(app.publicVariable.myCreateTopicInterfaceAddress,
      { page: page, wx_session_key: this.data.wxSessionKey, platform: platform, size: size  },
      function (res) {//查询成功
        //打印日志
        wx.hideLoading();
        console.log("****************我的发帖列表的接口***************");
        console.log(res);
        if (res.data.result.code == '2000') {




          /**
           * 将后台返回的数据中的summary字符串转化为json格式
           */
          var str = res.data.data.topics;
          for (var i = 0; i <= str.length - 1; i++) {
            str[i].summary = JSON.parse(str[i].summary);
          }

          var data = res.data.data.topics;
          if (data != 0) {
            // var data = res.data.rows
            let searchList = [];
            //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加
            that.data.isFromSearch ? searchList = data : searchList = that.data.myCreateTopic.concat(data)
            that.setData({
              myCreateTopic: searchList, //获取数据数组
              searchLoading: true   //把"上拉加载"的变量设为false，显示
            })
            //没有数据了，把“没有数据”显示，把“上拉加载”隐藏
          } else {
            that.setData({
              searchLoadingComplete: true, //把“没有数据”设为true，显示
              searchLoading: false  //把"上拉加载"的变量设为false，隐藏
            });
          }





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
   * @desc:点击用户的头像进入用户的主页
   */
  homePage: function (e) {
    console.log("帖友id=" + e.target.dataset.friendid);
    //跳转到用户的主页
    wx.navigateTo({
      url: '/pages/homePage/homePage?friendid=' + e.target.dataset.friendid
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

  // 页面上拉触底事件（上拉加载更多）
  onReachBottom: function () {
    // console.log('eeeeeeeeeee')
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        page: that.data.page + 1,  //每次触发上拉事件，把page+1
        isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false
      });
      that.myCreateTopic();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})