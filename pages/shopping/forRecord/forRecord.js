// pages/shopping/forRecord/forRecord.js
var abstac = require('../../../commonmethod/abstract.js'),
    size = '30',//请求数据大小
    app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:'',
    goodsListRecords:'',
    page: '1'//页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.enquiryExchangeRecords();//请求接口查询商品的兑换的记录
  },
  /**
   * 请求接口查询商品的兑换的记录
   */
  enquiryExchangeRecords:function(){
    var that = this;
    //参数日志打印
    console.log("page=" + this.data.page + "&size=" + size + "&wx_session_key=" + this.data.wxSessionKey);
    abstac.promptBox("数据加载中...");
    abstac.sms_Interface(app.publicVariable.enquiryRecordsInterfaceAddress,
      { size: size, page: this.data.page, wx_session_key: this.data.wxSessionKey},
    function (res) {//接口调用成功
      console.log("****************查询商品兑换记录接口返回函数***************");
      console.log(res);
      //判断是否有数据，有则取数据
      if (res.data.result.code == '2000'){
        /**
          * 判断当前的页数是否超过了总页数
        */
        var totalPage = res.data.data.pages;//数据的总页数 .substr(0, 10)
        var datas = res.data.data.orders;
        var newList = that.data.goodsListRecords;
        //遍历日期的字段去掉后面的时分秒
        for (var i = 0; i < datas.length; i++){
          datas[i].created_at = datas[i].created_at.substr(0, 10);
        }
            
        if (that.data.page == '1'){
          that.setData({
            orderList: res.data.data.orders,
            goodsListRecords: datas
          });
        } else if (that.data.page > totalPage){
          abstac.promptBox("没有数据了！");
          that.data.page = 1;
          return;
        }else{
          abstac.promptBox("加载中...");
          that.setData({
            orderList: res.data.data.orders,
            goodsListRecords: newList.concat(datas),
            page: that.data.page
          });
        }
        that.data.page++;
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },
    function (error) {//接口调用失败

    });
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
    this.enquiryExchangeRecords();//请求接口查询商品的兑换的记录
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底事件的处理函数,页数" + this.data.page);
    //判断是否超过了总页数，如果超过了则没有下一页，否则还有下一页的数据
    if (this.data.totalPage < this.data.page) {
      abstac.promptBox("没有数据了！");
      return;
    } else {
      this.enquiryExchangeRecords();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})