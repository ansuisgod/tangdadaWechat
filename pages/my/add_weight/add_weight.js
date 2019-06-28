// pages/my/add_weight/add_weight.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '', //输入的体重
    nowData: '',//当前时间

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
        inputValue: options.value,
        inspect_at: options.inspect_at,
        alter: options.alter,
        wxSessionKey: wx.getStorageSync('sessionKey')
      })
    } else {
      that.setData({
        alter: options.alter,
      })
    }

    that.goData()
  },



  goData: function () {
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


  /**
 * @desc:添加新的运动记录的接口
 * @date:2019.06.11
 * @auther:li
 */
  addnewWeight: function () {
    var that = this;


    if (!that.data.inputValue.replace(/^\s+|\s+$/g, '')) {
      wx.showToast({
        title: '体重填写错误！',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.alter == 1) {
      abstac.sms_Interface(app.publicVariable.newWeightInterfaceAddress, {
        id: that.data.id,
        value: that.data.inputValue,
        inspect_at: that.data.inspect_at,
        wx_session_key: this.data.wxSessionKey,
      },
        function (res) { //查询成功
          //打印日志
          console.log("****************添加新的运动记录***************");
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
     } else {
      abstac.sms_Interface(app.publicVariable.newWeightInterfaceAddress, {
        value: that.data.inputValue,
        inspect_at: that.data.nowData,
        wx_session_key: this.data.wxSessionKey,
      },
        function (res) { //查询成功
          //打印日志
          console.log("****************添加新的运动记录***************");
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



// 输入体重
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
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