// pages/shopping/goodsDetails/goodsDetails.js
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeColor:'#fd7380',
    aGoodsId:'',
    goodsDeInfo:'',
    changeBtn:'#fff'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      aGoodsId: options.goodsid
    });
    //查询商品详情
    this.enquiryForDetails();
  },
  /**
   * @desc:查询商品详情
   * @date:2019.06.04
   * @auther:an
   */
  enquiryForDetails:function(){
    var that = this;
    //打印日志
    console.log("商品id" + this.data.aGoodsId);
    abstac.promptBox("数据加载中...");
    abstac.sms_Interface(app.publicVariable.goodsListfaceAddress,
      { id: this.data.aGoodsId},
    function(res){//成功
      //打印日志
      console.log("****************商品详情接口返回的数据***************");
      console.log(res);
      if (res.data.result.code == '2000'){
        /**
         * @desc:判断如果库存为0，下面的我要兑换按钮灰色，否则显示我要兑换按钮为红色可以操作
         */
        var inventory = res.data.data.items[0].surplus;
        if(inventory == '0'){
          that.setData({
            changeColor: '#e5e5e5',
            changeBtn:'#a5a5a5',
            inventory:'0'
          });
        }else{
          that.setData({
            changeColor: '#fd7380',
            changeBtn: '#fff',
            inventory: '1'
          });
        }
        that.setData({
          goodsDeInfo: res.data.data.items[0]
        });
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },
    function(error){//失败
      //打印日志
      console.log(error);
    });
  },
  /**
   * @desc：我要兑换按钮跳转到兑换的页面
   */
  recordes:function(){
    console.log("商品的id=" + this.data.aGoodsId);
    //跳转到兑换的详情页面
    wx.navigateTo({
      url: '../../../pages/shopping/change/change?goodsid=' + this.data.aGoodsId
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
    //查询商品详情
    this.enquiryForDetails();
    wx.stopPullDownRefresh();
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