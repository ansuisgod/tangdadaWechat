// pages/my/blood_pressure_recorded/blood_pressure_recorded.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    getPressureList: '',//血压记录列表

    delBounced: false,//删除弹框

    delId:'',  //删除项id

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
  },


  /**
* @desc:获取我的血压记录列表的接口
* @date:2019.06.11
* @auther:li
*/
  getPressureList: function () {
    var that = this;
    // let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.getPressureInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey },
      function (res) {//查询成功
        //打印日志
        console.log("****************血压记录列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          var data = res.data.data;
          let mm, dd;
          for (var i = 0; i < data.length; i++) {
            var dataList = data[i];
            if (dataList.inspect_at != '') {
              dataList.mm = dataList.inspect_at.slice(5, 7)
              dataList.dd = dataList.inspect_at.slice(8, 10)
            }
          }
          that.setData({
            getPressureList: data,
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
* @desc:删除血压记录接口
* @date:2019.06.14
* @auther:li
*/
  deletePressure: function () {
    var that = this;
    // let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.deletePressureInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, id: that.data.delId },
      function (res) {//查询成功
        //打印日志
        console.log("****************删除血压记录接口***************");
        console.log(res);

        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          wx.hideLoading()
          that.getPressureList()
          that.setData({
            delBounced: false
          });
          abstac.promptBox('操作成功');
        } else {
          wx.hideLoading()
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        wx.hideLoading()
        console.log(error);
      });
  },


  // goSubset: function (e) {  //跳转入子集目录
  //   console.log(e.currentTarget.dataset.id)
    
  //   wx.navigateTo({
  //     url: '/pages/my/add_motion_subset/add_motion_subset?id=' + toId,
  //   })
  // },


  // 以下為跳转业务
  goAdd: function (e) {  //跳转入血压记录填写


  if(this.endTime - this.startTime < 350) {   //按压时间小于350毫秒跳转

    console.log(e.currentTarget.dataset.info)
    let status = e.currentTarget.dataset.info;  //验证是否是要修改
    if (status == undefined){
      wx.navigateTo({
        url: '/pages/my/add_blood_pressure/add_blood_pressure?alter=0',
      })
    }else{
      let toId = e.currentTarget.dataset.info.id;
      let diastolic = e.currentTarget.dataset.info.diastolic; //舒张压
      let systolic = e.currentTarget.dataset.info.systolic; //收缩压
      let category = e.currentTarget.dataset.info.category; //
      let inspect_at = e.currentTarget.dataset.info.inspect_at;
      wx.navigateTo({
        url: '/pages/my/add_blood_pressure/add_blood_pressure?toId=' + toId + '&diastolic=' + diastolic + '&systolic=' + systolic + '&category=' + category + '&inspect_at=' + inspect_at + '&alter=1',
      })
    }

    }

  },





  //删除弹框显示
  delBounced: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.info.id)
    let delId = e.currentTarget.dataset.info.id
    console.log("长按");
    wx.vibrateShort({
      success: function (res) {
      }
    })
    that.setData({
      delBounced: true,
      delId: delId,
    })
  },

  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },

  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },

  //删除弹框关闭
  delBounced_close: function () {

    this.setData({
      delBounced: false
    })
  },

  //弹框点击确认按钮
  delBounced_operate: function () {

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.deletePressure()

  },
  


  goAdvice: function () {  //跳转入参考建议
    wx.navigateTo({
      url: '/pages/my/health_advice/health_advice?status=5',
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
    var that = this;
    that.getPressureList()
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


})