// pages/my/SMS_alerts/SMS_alerts.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',

    shareMenu: false,  //第一个弹框
    shareMenu2: false,  //弹框
    shareMenu3: false,  //弹框



    phone: "",          //输入的手机号
    verificationCode: "",   //输入的验证码
    content:'',   //备注
    open:'1',   //是否打开

    arr: '',
    arrText:[],
    sendBtnState: {
      color: '#c1c1c1',
    },
    status: '0', //设置频率
    statusText: "每天",



    selectIndex: [{
      sureid: false,
      selected: "1",
      name: "测血糖"
    },
    {
      sureid: false,
      selected: "2",
      name: "测血压"
    },
    {
      sureid: false,
      selected: "3",
      name: "打胰岛素"
    },
    {
      sureid: false,
      selected: "4",
      name: "检查"
    },
    {
      sureid: false,
      selected: "5",
      name: "运动"
    },
    {
      sureid: false,
      selected: "6",
      name: "服药"
    },
    {
      sureid: false,
      selected: "7",
      name: "其他"
    },
    ],

    noSelect: '../../../images/personal/checkbox_big_remind.png',
    hasSelect: '../../../images/personal/checkbox_selected_big_remind.png',
    noChoose: false, // 取消已选项

    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    that.setData({
      platform: app.globalData.platform,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
  },






 
  account: function (e) {
    var that = this
    if (e.detail.value.length === 11) {
      that.setData({
        ['sendBtnState.color']: '#fe7282',
        phone: e.detail.value
      })
    } else {
      that.setData({
        ['sendBtnState.color']: '#c1c1c1',
        phone: e.detail.value
      })
    }
  },

  handleVerificationCodeBlur: function (e) {  //输入的验证码
    var that = this;
    // if (e.detail.value.length == 4) {
      that.setData({
        verificationCode: e.detail.value
      })
    // }
  },

  // 简单正则手机号
  checkPhone: function (phone) {
    if ((/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      return true;
    } else {
      return false;
    }
  },


  content: function (e) {  //输入的备注
    var that = this;
    that.setData({
      content: e.detail.value
    })
  },


  switch1Change: function (e) {  //是否开启
    var that = this;
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value){
      that.setData({
        open: '1'
      })
    }else{
      that.setData({
        open: '2'
      })
    }
  },


// 日期选择/精确到分
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
    });

    let dateTimeArray1 = dateArr
    let dateTime1 = this.data.dateTime1
    let times = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]] 
    this.setData({
      time: times,
    });

  },


// 设置频率
  goStatus: function (e) {
    let status = e.currentTarget.dataset.status;
    let statusText = e.currentTarget.dataset.text;
    let menu = this.data.shareMenu2
    this.setData({
      shareMenu2: !menu,
      status: status,
      statusText: statusText,
      time:'',
    })
  },





  //获取短信验证码的接口
  sendMsg: function () {
    var that = this

    if (that.data.sendBtnState.color == '#c1c1c1' || that.data.sendBtnState.interval > 0) return


    if (that.checkPhone(that.data.phone)) { //是手机号 发送验证码
      wx.showLoading({
        title: '加载中'
      })

      let platform = abstac.mobilePhoneModels(that.data.platform); //手机型号
      abstac.sms_Interface(app.publicVariable.smsInterface, {
        platform: platform, wx_session_key: this.data.wxSessionKey, phone: that.data.phone, type: '3'
      },
        function (res) { //查询成功
          //打印日志
          console.log("****************获取短信验证码的接口***************");
          console.log(res);
          wx.hideLoading()
          //判断是否有数据，有则取数据
          if (res.data.result.code == '2000') {
            var data = res.data.data;


            that.setData({
              ['sendBtnState.interval']: 60,
            })
            that.data.timeinterval = setInterval(function () {
              that.setData({
                ['sendBtnState.interval']: that.data.sendBtnState.interval - 1
              })
              if (that.data.sendBtnState.interval <= 0) {
                clearInterval(that.data.timeinterval)
              }
            }, 1000)

            wx.showToast({
              title: '短信发送成功',
              icon: 'success',
              duration: 2000
            })


          } else {
            abstac.promptBox(res.data.result.message);
          }
        },
        function (error) { //查询失败
          console.log(error);
        });




    } else { //不是手机号
      wx.showToast({
        title: '手机号错误，请重新输入',
        icon: 'none',
        duration: 2000
      })
    }



  },




//新增提醒信息的接口
  newRecord: function () {
    var that = this
    let platform = abstac.mobilePhoneModels(that.data.platform); //手机型号
    if (that.data.phone.length < 11) {
      wx.showToast({
        title: '手机号错误，请重新输入',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.verificationCode.length < 4) {
      wx.showToast({
        title: '验证码错误，请重新输入',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (that.data.arr == '') {
      wx.showToast({
        title: '请至少选择一个提醒事项哦！',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (that.data.time == '') {
      wx.showToast({
        title: '请添加提醒时间！',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.showLoading({
      title: '请求中',
    });





    switch (that.data.status) {
      case '0': //每天
        var frequency = '010000000'
        break
      case '1': //单次
        var frequency = '100000000'
        break
      case '2': //周一
        var frequency = '001000000'
        break
      case '3': //周二
        var frequency = '000100000'
        break
      case '4': //周三
        var frequency = '000010000'
        break
      case '5': //周四
        var frequency = '000001000'
        break
      case '6': //周五
        var frequency = '000000100'
        break
      case '7': //周六
        var frequency = '000000010'
        break
      case '8': //周日
        var frequency = '000000001'
        break
      default:
        break
    }




    abstac.sms_Interface(app.publicVariable.setAlarmInfoInterfaceAddress, {
      platform: platform, 
      wx_session_key: this.data.wxSessionKey, 
      phone: that.data.phone, 
      type: '2',  //暂时未发现是什么
      description: that.data.content,   //备注信息
      category: that.data.arr,    //提醒事项
      time: that.data.time,      //提醒时间
      mode: '2',      //暂时未发现是什么
      open: that.data.open,      //是否开启  //1为开启 2为关闭
      frequency: frequency,      //频率？  晓不得干嘛的
      code: that.data.verificationCode, //验证码
    },
      function (res) { //查询成功
        //打印日志
        console.log("****************新增提醒信息的接口***************");
        console.log(res);
        wx.hideLoading()
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;
          wx.navigateBack({})
          that.setData({})

          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000
          })


        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) { //查询失败
        console.log(error);
      });



  },
























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


  // 弹框3
  shareShare3: function () {
    var that = this;
    let menu = that.data.shareMenu3
    that.setData({
      shareMenu3: !menu,
    })

  },

  hideCover3: function () {
    let menu = this.data.shareMenu3
    this.setData({
      shareMenu3: !menu,
    })
  },




  changeTime(e) {  //
    this.setData({ time: e.detail.value });
  },

  // 以下為跳转业务
  goGhoose: function () {//跳转入提醒选择
    wx.navigateTo({
      url: '/pages/my/choose/choose',
    })
  },









  // 选择提醒事项
  chooseNo: function () { //取消已选项
    var that = this;

    that.setData({
      noChoose: true,
    })

    if (that.data.noChoose == true) {
      let arrlist = this.data.selectIndex
      for (let i = 0; i < arrlist.length; i++) {
        arrlist[i].sureid = false
      }
      this.setData({
        arr: '',
        arrText: [],
        selectIndex: arrlist, //将已改变属性的json数组更新
      })
    }

  },

  chooseMore: function (e) { //多选的

    let index = e.currentTarget.dataset.selectindex; //当前点击元素的自定义数据，这个很关键
    let selectIndex = this.data.selectIndex; //取到data里的selectIndex
    selectIndex[index].sureid = !selectIndex[index].sureid; //点击就赋相反的值

    let arr = [];
    let arrText = [];
    let arrlist = this.data.selectIndex
    for (let i = 0; i < arrlist.length; i++) {
      if (arrlist[i].sureid == true) {
        arr.push(arrlist[i].selected)
        arrText.push(arrlist[i].name)
      }
    };

    this.setData({
      selectIndex: selectIndex, //将已改变属性的json数组更新
      arr: arr.join(','),
      arrText: arrText,
      noChoose: false,
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