// pages/index/task/task.js
var app = getApp(),
    abstac = require('../../../commonmethod/abstract.js'),
    sizes = '20',
    mtabW = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["活动任务", "每日任务"],
    activeIndex: 0,
    slideOffset: 0,
    tabW: 0,
    pages:'1',
    imgSrcs: '',
    everyDayTaskArr: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mtabW = app.globalData.mtabW / 2;
    this.setData({
      tabW: mtabW,
      tabW1: app.globalData.mtabW * 1.2,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.activeTask();//调用接口显示数据的方法
    this.listEveryDayTask();//调用每日任务的接口方法
  },
  /**
   * @desc:调用每日任务的接口方法
   */
  listEveryDayTask:function(){
    var that = this;
    abstac.sms_Interface(app.publicVariable.everyDayTaskInterfaceAddress,
      { size: sizes, page: this.data.pages, wx_session_key: this.data.wxSessionKey },
      function (res) {//接口成功返回
        console.log("****************首页的活动/每日任务接口成功时返回函数***************");
        console.log(res);
        //有则取数据
        if (res.data.result.code == '2000') {
          var list = [];
          for (var i = 0; i <= res.data.data.length - 1; i++){
            var datass = res.data.data[i];
            var cc = datass.split(",", 2);
            var dd = cc[1].substring(3);
            list.push({ 'ziduan': datass, "score": dd});
          }
          that.setData({
            everyDayTaskArr: list
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      }, function (error) {//接口失败返回
        console.log(error);
      });
  },
  /**
   * @desc:调用接口显示数据的方法
   */
  activeTask:function(){
    var that = this;
    abstac.sms_Interface(app.publicVariable.indexTaskSportsInterfaceAddress,
      { size: sizes, page: this.data.pages, wx_session_key: this.data.wxSessionKey},
    function(res){//接口成功返回
      console.log("****************首页的活动/活动任务接口成功时返回函数***************");
      console.log(res);
      //有则取数据
      if (res.data.result.code == '2000'){
        that.setData({
          imgSrcs: res.data.data.activity_tasks
        });
      }else{
        abstac.promptBox(res.data.result.message);
      }
      }, function (error) {//接口失败返回
      console.log(error);
    });
  },
  /**
   * @desc:tab的切换
   */
  tabClick: function (e) {
    var that = this;
    var idIndex = e.currentTarget.id;
    var offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: idIndex,
      slideOffset: offsetW
    });
  },
  bindChange: function (e) {
    var current = e.detail.current;
    if ((current + 1) % 4 == 0) {}
    var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });
  },
  /**
   * @desc:点击图片列表调到修改任务里面
   */
  jumpPage:function(e){
    let indexs = e.currentTarget.dataset.indexs;
    if (indexs == '1' || indexs == '2'){
      wx.navigateTo({
        url: '../../../pages/my/ModifyMyInfo/ModifyMyInfo'
      })
    }else{
      wx.navigateTo({
        url: '../../../pages/index/signIn/signIn'
      })
    }
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
  onPullDownRefresh: function () {
    this.activeTask();//调用接口显示数据的方法
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})