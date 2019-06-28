// pages/my/blood_glucose_record/blood_glucose_record.js


var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();




Page({

  /**
   * 页面的初始数据
   */
  data: {


    getSugarList:'',

    delBounced: false,//删除弹框

    delId: '',  //删除项id

    category: '0',
    status: '0',
    categoryText: ["早上空腹", "早餐后1小时", "早餐后2小时", "早餐后3小时", "午餐前", "午餐后2小时", "晚餐前", "晚餐后2小时", "睡前", "随机"],
    statusText: ["无", "运动后", "发脾气", "疲劳", "饮酒", "吃药后", "生病", "生理期"],

    birthdayDisplay: '',



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    // that.getSugarList()
  },








  /**
   * @desc:获取我的血糖记录的接口
   * @date:2019.06.06
   * @auther:li
   */
  getSugarList: function () {
    var that = this;

    abstac.sms_Interface(app.publicVariable.getSugarInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey},
      function (res) {//查询成功
        //打印日志
        console.log("****************查询血糖记录的列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;
          let mm , dd;
          for (var i = 0; i < data.length; i++) {
            var dataList = data[i];
            if (dataList.inspect_at != '') {
              dataList.mm = dataList.inspect_at.slice(5, 7)
              dataList.dd = dataList.inspect_at.slice(8, 10)
            }
          }


            that.setData({
              getSugarList: data,
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
* @desc:删除血糖记录接口
* @date:2019.06.14
* @auther:li
*/
  deleteSugar: function () {
    var that = this;
    // let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.deleteSugarInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, id: that.data.delId },
      function (res) {//查询成功
        //打印日志
        console.log("****************删除血糖记录接口***************");
        console.log(res);

        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          wx.hideLoading()
          that.getSugarList()
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




  ////删除事件
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
    that.deleteSugar()

  },
  ////删除事件end



  // 以下為跳转业务
  goAdd: function (e) {  //跳转入血糖记录填写


    if (this.endTime - this.startTime < 350) {   //按压时间小于350毫秒跳转

    console.log(e.currentTarget.dataset.info)
    let status = e.currentTarget.dataset.info;  //验证是否是要修改
    if (status == undefined) {
      wx.navigateTo({
        url: '/pages/my/add_blood_glucose/add_blood_glucose?alter=0',
      })
    } else {
      let toId = e.currentTarget.dataset.info.id;
      let value = e.currentTarget.dataset.info.value; //cal值
      let category = e.currentTarget.dataset.info.category; //测量时段
      let status = e.currentTarget.dataset.info.status; // 个人状态
      let inspect_at = e.currentTarget.dataset.info.inspect_at;
      wx.navigateTo({
        url: '/pages/my/add_blood_glucose/add_blood_glucose?toId=' + toId + '&value=' + value + '&inspect_at=' + inspect_at + '&alter=1' + '&category=' + category + '&status=' + status,
      })
    }

    }

  },

  goAdvice: function () {  //跳转入参考建议
    wx.navigateTo({
      url: '/pages/my/health_advice/health_advice?status=1',
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
    that.getSugarList()
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

