// pages/my/health_advice/health_advice.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',  //判断从进来状态

    refGoalInfo: '',// 全部信息
    refGoalInfoTextInfo:'',//修改过的文本文字
    refGoalInfoText:'', //原文本文字


    Input1:'',  //空腹血糖min
    Input2: '',  //空腹血糖max
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      status: options.status,
      wxSessionKey: wx.getStorageSync('sessionKey')
    })

  },



  /**
* @desc:获取我的参考建议的接口 (根据item字段区分 all获取全部))
* @date:2019.06.14
* @auther:li
*/
  refGoal: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.refGoalInterfaceAddress,
      { wx_session_key: that.data.wxSessionKey, item: "all" },
      function (res) {//查询成功
        //打印日志
        console.log("****************参考建议接口***************");
        console.log(res);

        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;
          that.setData({
            refGoalInfo: data,
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
* @desc:获取我的参考建议文本文字的接口
* @date:2019.06.14
* @auther:li
*/
  getProfileText: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.getProfileTextInterfaceAddress,
      { wx_session_key: that.data.wxSessionKey},
      function (res) {//查询成功
        //打印日志
        console.log("****************文本文字***************");
        console.log(res);

        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;
          that.setData({
            refGoalInfoText: data,
            refGoalInfoTextInfo: JSON.parse(data.profile_text),
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
* @desc:修改参考建议的接口
* @date:2019.06.14
* @auther:li
*/
  Modify: function (val1,val2) {
    var that = this;
    if (val2 != "") {
      abstac.sms_Interface(app.publicVariable.setRefGoalInterfaceAddress,
        { wx_session_key: that.data.wxSessionKey, val1: val2},
        function (res) {//查询成功
          //打印日志
          console.log("****************修改参考建议***************");
          console.log(res);
          //判断是否有数据，有则取数据
          if (res.data.result.code == '2000') {
            var data = res.data.data;
            that.setData({
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




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.refGoal()
    that.getProfileText()
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

  },


  // 输入
  Input1: function (e) {
    // let value = e.detail.value
    // this.setData({
    //   Input1: value
    // })
    // this.Modify('before_sugar_min', value)
  },

  Input2: function (e) {

  },

  Input3: function (e) {

  },

  Input4: function (e) {

  },

  Input5: function (e) {

  },

  Input6: function (e) {

  },

  Input7: function (e) {

  },


  Input8: function (e) {

  },

  Input9: function (e) {

  },

  Input10: function (e) {

  },


})