// pages/index/askList/askList.js
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp(),
    tagIds = '25',
    sizes = '20';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pages:'1',
    dataList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("搜索关键字=" + options.keyWords);
    this.setData({
      keyWordss: options.keyWords,
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.getDataInfo();//从接口获取问答数据信息
  },
  /**
   * @desc：从接口获取问答数据信息
   */
  getDataInfo:function(){
    var that = this;
    abstac.promptBox("数据加载中...");
    abstac.sms_Interface(app.publicVariable.searchArticalInterfaceAddress,
      { platform: abstac.mobilePhoneModels(this.data.platform), size: sizes, wx_session_key: this.data.wxSessionKey, page: this.data.pages, keyword: this.data.pages, tag_id: tagIds},
      function(res){
        console.log('*********获取问答列表信息的页面****************');
        console.log(res);
        if (res.data.result.code == '2000'){
          /**
          * 判断当前的页数是否超过了总页数
          */
          var totalPage = res.data.data.pages,//数据的总页数
              datas = res.data.data.topics,
              newList = that.data.dataList;

          if (that.data.pages == '1') {
            newList = datas;
            that.setData({
              dataList: datas,
            });
          } else if (that.data.pages > totalPage) {
            abstac.promptBox("没有数据了！");
            that.data.pages = 1;
            return;
          } else {
            abstac.promptBox("加载中...");
            that.setData({
              dataList: newList.concat(datas),
              pages: that.data.pages,
              totalPage: res.data.data.pages
            });
          }
          that.data.pages++;
        }else{

        }
      },function(error){
        console.log(error);
    });
  },
  /**
   * @desc:查看详情的问答
   */
  askTheExperts:function(e){
    wx.navigateTo({
      url: '../../../pages/index/expertsReply/expertsReply?replyAtircalId=' + e.currentTarget.dataset.ids
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
    this.getDataInfo();//从接口获取问答数据信息
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底事件的处理函数,页数" + this.data.pages);
    //判断是否超过了总页数，如果超过了则没有下一页，否则还有下一页的数据
    if (this.data.totalPage < this.data.pages) {
      abstac.promptBox("没有数据了！");
      return;
    } else {
      this.getDataInfo();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})