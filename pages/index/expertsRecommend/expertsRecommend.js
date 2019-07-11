// pages/index/expertsRecommend/expertsRecommend.js
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    docotor:'',//姓名信息的初始值
    sizes:'8',//每页的数据的条数初始值
    pages: '1',//页数初始值
    dataList:'',
    contentHeight:'300rpx',//内容的最小高度
    listDisplay:'block'//点击更多就隐藏姓名列表
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.exportsRecommand();//向后台请求推荐专家接口数据信息
  },
  /**
   * @desc:向后台请求推荐专家接口数据信息
   */
  exportsRecommand:function(){
    var that = this;
    abstac.promptBox("数据加载中...");
    abstac.sms_Interface(app.publicVariable.exportRecommandInterfaceAddress,
      { page: this.data.pages, size: this.data.sizes},
    function(res){
      console.log("****************推荐专家接口返回函数***************");
      console.log(res);
      //有则取数据
      if (res.data.result.code == '2000'){
        that.setData({
          docotor: res.data.data,
          dataList: res.data.data[0]
        });
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },function(error){
      console.log(error);
    })
  },
  /**
   * @desc:点击名字触发的函数
   */
  clickFun:function(e){
    this.setData({
      dataList: e.currentTarget.dataset
    });
    console.log((this.data.dataList));
  },
  /**
   *@desc:点击查看详情触发的函数
   */
  expertsDetails:function(){
    this.setData({
      contentHeight:'100%',
      listDisplay:'none',
    });
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
  onReachBottom: function () {
    this.exportsRecommand();//向后台请求推荐专家接口数据信息
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})