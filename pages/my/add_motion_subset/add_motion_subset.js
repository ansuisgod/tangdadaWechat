// pages/my/add_motion_subset/add_motion_subset.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp(),
  session_key = wx.getStorageSync('sessionKey');


Page({

  /**
   * 页面的初始数据
   */
  data: {

    sportList: '', //小分类列表
    size:'20',//每页的数据条数
    page: '1',//页数
    sport_group_id:'',//分类id


    searchSportList: '',//搜索到的列表信息
    keyword: '',//搜索关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      platform: app.globalData.platform,
      sport_group_id:options.id,
    });

    that.sportList()
  },


  /**
* @desc:获取我的运动小分类列表的接口
* @date:2019.06.10
* @auther:li
*/
  sportList: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    abstac.sms_Interface(app.publicVariable.sportListInterfaceAddress,
      { platform: platform, sport_group_id: that.data.sport_group_id, size: that.data.size, page: that.data.page },
      function (res) {//查询成功
        //打印日志
        console.log("****************运动小分类列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data.sports;
          that.setData({
            sportList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },



  /**
* @desc:我的运动列表搜索的接口
* @date:2019.06.10
* @auther:li
*/
  search: function (e) {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    let value = e.detail.value;
    that.setData({
      keyword: value,
    });


    if (value != "") {
      abstac.sms_Interface(app.publicVariable.searchSportInterfaceAddress,
        { platform: platform, keyword: value, size: that.data.size, page: that.data.page },
        function (res) {//查询成功
          //打印日志
          console.log("****************运动列表搜索***************");
          console.log(res);
          //判断是否有数据，有则取数据
          if (res.data.result.code == '2000') {
            var data = res.data.data.sports;
            that.setData({
              searchSportList: data,
            });
          } else {
            abstac.promptBox(res.data.result.message);
          }
        },
        function (error) {//查询失败
          console.log(error);
        });
    }



  },



      // 以下為跳转业务
  goFill: function(e) {  //跳转入运动记录填写
    let toId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/my/add_motion_Fill/add_motion_Fill?id=' + toId + '&alter=0',
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