// pages/blog/searchBlogMoreInfo/searchBlogMoreInfo.js
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp(),
    sizess = '20';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagess:'1',
    keyWords:'',
    blogList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.keyWords);
    this.setData({
      platform: app.globalData.platform,
      keyWords: options.keyWords,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.moreBloggInfo();//查询帖子的消息列表
  },
  /**
   * 查询帖子的消息列表
   */
  moreBloggInfo:function(){
    let platForm = abstac.mobilePhoneModels(this.data.platform),//手机型号
        that = this;
    abstac.promptBox("数据加载中...");
    abstac.sms_Interface(app.publicVariable.searchArticalInterfaceAddress,
      { platform: platForm, size: sizess, wx_session_key: this.data.wxSessionKey, page:this.data.pagess, keyword: this.data.keyWords},
    function(res){//接口调用成功
      console.log("****************搜索帖子列表返回的数据口成功时返回函数***************");
      console.log(res);
      if (res.data.result.code == '2000'){
        var dataBox = that.data.blogList,
            datas = res.data.data.topics;
        for (var j = 0; j < datas.length; j++){
          datas[j].summary = JSON.parse(datas[j].summary);
        }
        if (that.data.pagess == '1'){
          dataBox = datas;
          that.setData({
            blogList: datas
          });
        }else{
          that.setData({
            blogList: dataBox.concat(datas),
            pagess: that.data.pagess
          });
        }
        that.data.pagess++;
      }else{

      }
      }, function (error) {//接口调用失败
      console.log(error);
    }
    );
  },
  /**
   * @desc:跳转到帖子的详情页面
   */
  blogDetails:function(e){
    wx.navigateTo({
      url: '../../../pages/blog/blogDetail/blogDetail?blogId=' + e.currentTarget.dataset.blogid
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
    this.moreBloggInfo();//查询帖子的消息列表
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.moreBloggInfo();//滚动到底部请求下一页数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})