// pages/my/add_blood_glucose/add_blood_glucose.js

var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 刻度尺
    value: 0,
    val: 6.4,
    styles: [{
      line: '#dbdbdb',
      bginner: '#fff',
      bgoutside: '#dbdbdb',
      lineSelect: '#fe7281',
      font: '#000000'
    }],
    // 刻度尺END

    birthdayDisplay: '',

    shareMenu: false,  //第一个弹框
    shareMenu2: false,  //第二个弹框

    category:'0',
    categoryText: "早上空腹",
    status:'0',
    statusText: "无",
    statusTextArr: ["无", "运动后", "发脾气", "疲劳", "饮酒", "吃药后", "生病", "生理期"],
    categoryTextArr: ["早上空腹", "早餐后1小时", "早餐后2小时", "早餐后3小时", "午餐前", "午餐后2小时", "晚餐前", "晚餐后2小时", "睡前", "随机"],

    // 如果是修改的参数
    id: '', //修改项id
    alter: '', //判断是否修改状态
    inspect_at: '',

    lock: false, //防止多次点击按钮

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;


    if (options.alter == 1) {
      that.setData({
        id: options.toId,
        val: options.value,//cal值
        birthdayDisplay: options.inspect_at,
        alter: options.alter,

        status: options.status,// 个人状态
        statusText: that.data.statusTextArr[options.status],
        category: options.category,//测量时段
        categoryText: that.data.categoryTextArr[options.category],
        wxSessionKey: wx.getStorageSync('sessionKey')
      })
    } else {
      that.setData({
        alter: options.alter,
      })
      that.goData()
    }




    
  },


  goData: function () {
    //获取当前时间
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var nowDate = year + "-" + month + "-" + day;
    this.setData({
      birthdayDisplay: nowDate,
    })


  },




  



  goCategory: function (e) {
    let category = e.currentTarget.dataset.category;
    let categoryText = e.currentTarget.dataset.text;
    let menu = this.data.shareMenu
    this.setData({
      shareMenu: !menu,
      category: category,
      categoryText: categoryText
    })
  },

  goStatus: function (e) {
    let status = e.currentTarget.dataset.status;
    let statusText = e.currentTarget.dataset.text;
    let menu = this.data.shareMenu2
    this.setData({
      shareMenu2: !menu,
      status: status,
      statusText: statusText
    })
  },




  /**
 * @desc:提交血糖记录的接口
 * @date:2019.06.10
 * @auther:li
 */
  SaveRecord: function () {
    var that = this;


    if (that.data.alter == 1) {
      abstac.sms_Interface(app.publicVariable.newSugarInterfaceAddress,
        { status: that.data.status, wx_session_key: that.data.wxSessionKey, inspect_at: that.data.birthdayDisplay, value: that.data.value, category: that.data.category, id: that.data.id },
        function (res) {//查询成功
          //打印日志
          console.log("****************提交血糖记录的接口***************");
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
        function (error) {//查询失败
          console.log(error);
        });
    } else {
      abstac.sms_Interface(app.publicVariable.newSugarInterfaceAddress,
        { status: that.data.status, wx_session_key: that.data.wxSessionKey, inspect_at: that.data.birthdayDisplay, value: that.data.value, category: that.data.category },
        function (res) {//查询成功
          //打印日志
          console.log("****************提交血糖记录的接口***************");
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
        function (error) {//查询失败
          console.log(error);
        });
    }


  },





  // 时间选择器
  bindDateChange: function (e) {
    console.log("bindDateChange")
    console.log(e)
    let tm = new Date(e.detail.value).valueOf()
    this.setData({
      birthday: tm,
      birthdayDisplay: e.detail.value
    })
  },



// 刻度尺
  bindvalue: function (e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  assignment() {
    this.setData({
      val: 50
    })
  },
  // 刻度尺END


  // 弹框1
  shareShare: function () {
    var that = this;
      let menu = that.data.shareMenu
      that.setData({
        shareMenu: !menu,
      })
  
  },

  hideCover: function () {
    let menu = this.data.shareMenu
    this.setData({
      shareMenu: !menu,
    })
  },

  // 弹框2
  shareShare2: function () {
    var that = this;
    let menu = that.data.shareMenu2
    that.setData({
      shareMenu2: !menu,
    })

  },

  hideCover2: function () {
    let menu = this.data.shareMenu2
    this.setData({
      shareMenu2: !menu,
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