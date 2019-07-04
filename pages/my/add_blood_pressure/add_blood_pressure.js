// pages/my/add_blood_pressure/add_blood_pressure.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {


    // 刻度尺
    value: 0,
    val: 100,
    val2: 70,
    value2: 0,
    styles: [{
      line: '#dbdbdb',
      bginner: '#fff',
      bgoutside: '#dbdbdb',
      lineSelect: '#fe7281',
      font: '#000000'
    }],
    // 刻度尺END


    shareMenu2: false, //弹框
    status: '0', //个人状态值
    statusText: "无",
    statusTextArr: ["无", "运动后", "发脾气", "疲劳", "饮酒", "吃药后", "生病", "生理期"],
    nowData: '', //当前时间

    // 如果是修改的参数
    id: '', //修改项id
    alter: '', //判断是否修改状态
    inspect_at:'',

    lock:false, //防止多次点击按钮

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    that.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    })

    if (options.alter == 1) {
      that.setData({
        id: options.toId,
        val2: options.diastolic, //舒张压
        val: options.systolic, //收缩压
        status: options.category,
        statusText: that.data.statusTextArr[options.category],
        inspect_at: options.inspect_at,
        alter: options.alter,
      })
    } else {
      that.setData({
        alter: options.alter,
      })
    }

    that.goData()



  },


  /**
   * @desc:添加新的血压记录的接口
   * @date:2019.06.11
   * @auther:li
   */
  SaveRecord: function() {
    var that = this;

    if (!(Number(that.data.value >= 70) && Number(that.data.value <= 260))) {
      wx.showToast({
        title: '收缩压的合理范围为:70~260mmHg,请您重新选择!',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!(Number(that.data.value2 >= 20) && Number(that.data.value2 <= 160))) {
      wx.showToast({
        title: '舒张压的合理范围为:20~160mmHg,请您重新选择!',
        icon: 'none',
        duration: 1500
      })
      return
    }
    

if(that.data.alter == 1){
  abstac.sms_Interface(app.publicVariable.newPressureInterfaceAddress, {
    category: that.data.status,
    wx_session_key: that.data.wxSessionKey,
    inspect_at: that.data.inspect_at,
    diastolic: that.data.value2,
    systolic: that.data.value,
    id:that.data.id,
  },

    function (res) { //查询成功
      //打印日志
      console.log("****************添加新的血压记录的接口***************");
      console.log(res);
      //判断是否有数据，有则取数据
      if (res.data.result.code == '2000') {

        that.setData({
          lock: true,
        })

        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 500
        })
        setTimeout(function () {
        wx.navigateBack({})
        }, 600)
      } else {
        abstac.promptBox(res.data.result.message);
      }
    },
    function (error) { //查询失败
      console.log(error);
    });
}else{
  abstac.sms_Interface(app.publicVariable.newPressureInterfaceAddress, {
    category: that.data.status,
    wx_session_key: that.data.wxSessionKey,
    inspect_at: that.data.nowData,
    diastolic: that.data.value2,
    systolic: that.data.value
  },

    function (res) { //查询成功
      //打印日志
      console.log("****************添加新的血压记录的接口***************");
      console.log(res);
      //判断是否有数据，有则取数据
      if (res.data.result.code == '2000') {

        that.setData({
          lock: true,
        })

        wx.showToast({
          title: '新增成功',
          icon: 'success',
          duration: 500
        })
        setTimeout(function () {
          wx.navigateBack({})
        }, 600)
      } else {
        abstac.promptBox(res.data.result.message);
      }
    },
    function (error) { //查询失败
      console.log(error);
    });
}





  },


  goStatus: function(e) {
    let status = e.currentTarget.dataset.status;
    let statusText = e.currentTarget.dataset.text;
    let menu = this.data.shareMenu2
    this.setData({
      shareMenu2: !menu,
      status: status,
      statusText: statusText
    })
  },

  goData: function() {
    //获取当前时间
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    var nowDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    this.setData({
      nowData: nowDate,
    })


  },


  // 刻度尺
  bindvalue: function(e) {
    // console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  bindvalue2: function(e) {
    // console.log(e)
    this.setData({
      value2: e.detail.value
    })
  },
  assignment() {
    this.setData({
      val: 50
    })
  },
  // 刻度尺END


  // 弹框2
  shareShare2: function() {
    var that = this;
    let menu = that.data.shareMenu2
    that.setData({
      shareMenu2: !menu,
    })

  },

  hideCover2: function() {
    let menu = this.data.shareMenu2
    this.setData({
      shareMenu2: !menu,
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})