// pages/my/Statistical/Statistical.js



var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {

    typ: 1, //页面初始页
    shareMenu: false, //弹框
    shareMenu2: false, //弹框2

    // 11111111
    selectedDate: '', //选中的几月几号
    selectedWeek: '', //选中的星期几
    curYear: 2017, //当前年份
    curMonth: 0, //当前月份
    daysCountArr: [ // 保存各个月份的长度，平年
      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ],
    weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dateList: [],

    // 2222222222
    selectedDate2: '', //选中的几月几号
    selectedWeek2: '', //选中的星期几
    curYear2: 2017, //当前年份
    curMonth2: 0, //当前月份
    daysCountArr2: [ // 保存各个月份的长度，平年
      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ],
    weekArr2: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dateList2: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
  },




  /**
   * @desc:获取我的血糖统计的接口
   * @date:2019.06.12
   * @auther:li
   */
  getSugarList: function() {
    var that = this;

    abstac.sms_Interface(app.publicVariable.getSugarInterfaceAddress, {
      wx_session_key: that.data.wxSessionKey,
        end_date: that.data.selectedDate2,
        start_date: that.data.selectedDate
      },
      function(res) { //查询成功
        //打印日志
        console.log("****************查询血糖统计的列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;
          let time;
          for (var i = 0; i < data.length; i++) {
            var dataList = data[i];
            if (dataList.inspect_at != '') {
              dataList.time = dataList.inspect_at.slice(5, 10)
            }
          }
          that.setData({
            getSugarList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function(error) { //查询失败
        console.log(error);
      });
  },


  /**
   * @desc:获取我的血压统计的接口
   * @date:2019.06.12
   * @auther:li
   */
  getPressureList: function() {
    var that = this;
    abstac.sms_Interface(app.publicVariable.getPressureInterfaceAddress, {
      wx_session_key: that.data.wxSessionKey,
        end_date: that.data.selectedDate2,
        start_date: that.data.selectedDate
      },
      function(res) { //查询成功
        //打印日志
        console.log("****************血压统计列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          var data = res.data.data;
          let time, dates;
          for (var i = 0; i < data.length; i++) {
            var dataList = data[i];
            if (dataList.inspect_at != '') {
              dataList.time = dataList.inspect_at.slice(5, 10)
              dataList.dates = dataList.inspect_at.slice(11, 16)
            }
          }
          that.setData({
            getPressureList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function(error) { //查询失败
        console.log(error);
      });
  },



  /**
   * @desc:获取我的体重统计列表的接口
   * @date:2019.06.12
   * @auther:li
   */
  getWeightList: function() {
    var that = this;
    // let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.getWeightInterfaceAddress, {
      wx_session_key: that.data.wxSessionKey,
        end_date: that.data.selectedDate2,
        start_date: that.data.selectedDate
      },
      function(res) { //查询成功
        //打印日志
        console.log("****************体重统计列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          var data = res.data.data;
          let time, dates;
          for (var i = 0; i < data.length; i++) {
            var dataList = data[i];
            if (dataList.inspect_at != '') {
              dataList.time = dataList.inspect_at.slice(5, 10)
              dataList.dates = dataList.inspect_at.slice(11, 16)
            }
          }
          that.setData({
            getWeightList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function(error) { //查询失败
        console.log(error);
      });
  },




  /**
   * @desc:获取我的饮食统计列表的接口
   * @date:2019.06.19
   * @auther:li
   */
  getDietList: function () {
    var that = this;
    // let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.getDietInterfaceAddress, {
      wx_session_key: that.data.wxSessionKey,
      end_date: that.data.selectedDate2,
      start_date: that.data.selectedDate
    },
      function (res) { //查询成功
        //打印日志
        console.log("****************饮食统计列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;
          let time, dates;
          for (var i = 0; i < data.length; i++) {
            var dataList = data[i];
            if (dataList.inspect_at != '') {
              dataList.time = dataList.inspect_at.slice(5, 10)
              dataList.dates = dataList.inspect_at.slice(11, 16)
            }







            if (dataList.category == 0) {
              dataList.categoryText = "早餐"
            }
            if (dataList.category == 1) {
              dataList.categoryText = "上午加餐"
            }
            if (dataList.category == 2) {
              dataList.categoryText = "中餐"
            }
            if (dataList.category == 3) {
              dataList.categoryText = "下午加餐"
            }
            if (dataList.category == 4) {
              dataList.categoryText = "晚餐"
            }
            if (dataList.category == 5) {
              dataList.categoryText = "夜宵"
            }


          }
          that.setData({
            getDietList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) { //查询失败
        console.log(error);
      });
  },





  /**
   * @desc:获取我的运动统计列表的接口
   * @date:2019.06.12
   * @auther:li
   */
  getSportList: function() {
    var that = this;
    // let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.getSportInterfaceAddress, {
      wx_session_key: that.data.wxSessionKey,
        end_date: that.data.selectedDate2,
        start_date: that.data.selectedDate
      },
      function(res) { //查询成功
        //打印日志
        console.log("****************运动统计列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;
          let time, dates;
          for (var i = 0; i < data.length; i++) {
            var dataList = data[i];
            if (dataList.inspect_at != '') {
              dataList.time = dataList.inspect_at.slice(5, 10)
              dataList.dates = dataList.inspect_at.slice(11, 16)
            }

          }
          that.setData({
            getSportList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function(error) { //查询失败
        console.log(error);
      });
  },


  //血糖统计
  bar1: function() {
    var that = this;
    that.setData({
      typ: 1
    })
    that.typess()
    that.getSugarList()  //血糖统计
  },

  //血压统计
  bar2: function() {
    var that = this;
    that.setData({
      typ: 2
    })
    that.typess()
    that.getPressureList()  //血压统计
  },

  //体重统计
  bar3: function() {
    var that = this;
    that.setData({
      typ: 3
    })
    that.typess()
    that.getWeightList()  //体重统计
  },

  //饮食统计
  bar4: function() {
    var that = this;
    that.setData({
      typ: 4
    })
    that.typess()
    that.getDietList()//饮食统计
  },

  //运动统计
  bar5: function() {
    var that = this;
    that.setData({
      typ: 5
    })
    that.typess()
    that.getSportList() //运动统计
  },


  typess: function() {
    this.firstTime();
    this.secondTime();
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
    var that = this;
    that.firstTime();
    that.secondTime();
    that.getSugarList()  //血糖统计
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

  },









  firstTime: function() {
    var today = new Date(); //当前时间  
    // console.log(today.getDay())
    var y = today.getFullYear(); //年  
    var mon = today.getMonth(); //月  
    var d = today.getDate(); //日  
    var i = today.getDay(); //星期  
    this.setData({
      curYear: y,
      curMonth: mon,
      selectedDate: y + '-' + mon + '-' + d,
      selectedWeek: this.data.weekArr[i]
    });

    this.getDateList(y, mon - 1);
  },

  secondTime: function() {
    var today = new Date(); //当前时间  
    // console.log(today.getDay())
    var y = today.getFullYear(); //年  
    var mon = today.getMonth() + 1; //月  
    var d = today.getDate(); //日  
    var i = today.getDay(); //星期  
    this.setData({
      curYear2: y,
      curMonth2: mon,
      selectedDate2: y + '-' + mon + '-' + d,
      selectedWeek2: this.data.weekArr2[i]
    });

    this.getDateList2(y, mon - 1);
  },



  getDateList: function(y, mon) {
    var that = this;
    //如果是否闰年，则2月是29日
    var daysCountArr = this.data.daysCountArr;
    if (y % 4 == 0 && y % 100 != 0) {
      this.data.daysCountArr[1] = 29;
      this.setData({
        daysCountArr: daysCountArr
      });
    }
    //第几个月；下标从0开始实际月份还要再+1  
    var dateList = [];
    // console.log('本月', that.data.daysCountArr[mon], '天');
    dateList[0] = [];
    var weekIndex = 0; //第几个星期
    for (var i = 0; i < that.data.daysCountArr[mon]; i++) {

      // console.log(new Date(y, mon, (i + 1)).getDay())
      var week = new Date(y, mon, (i + 1)).getDay();
      // 如果是新的一周，则新增一周
      if (week == 0) {
        weekIndex++;
        dateList[weekIndex] = [];
      }
      // 如果是第一行，则将该行日期倒序，以便配合样式居右显示
      if (weekIndex == 0) {
        dateList[weekIndex].unshift({
          value: y + '-' + (mon + 1) + '-' + (i + 1),
          date: i + 1,
          week: week
        });
      } else {
        dateList[weekIndex].push({
          value: y + '-' + (mon + 1) + '-' + (i + 1),
          date: i + 1,
          week: week
        });
      }
    }
    // console.log('本月日期', dateList);
    that.setData({
      dateList: dateList
    });
  },
  selectDate: function(e) {
    var that = this;
    // console.log('选中', e.currentTarget.dataset.date.value);
    that.setData({
      selectedDate: e.currentTarget.dataset.date.value,
      selectedWeek: that.data.weekArr[e.currentTarget.dataset.date.week]
    });


    if (that.data.typ == 1) {
      that.getSugarList()  //血糖统计
    } else if (that.data.typ == 2) {
      that.getPressureList()  //血压统计
    } else if (that.data.typ == 3) {
      that.getWeightList()  //体重统计
    } else if (that.data.typ == 4) {
      that.getDietList()//饮食统计
    } else if (that.data.typ == 5) {
      that.getSportList() //运动统计
    }

  },
  preMonth: function() {
    // 上个月
    var that = this;
    var curYear = that.data.curYear;
    var curMonth = that.data.curMonth;
    curYear = curMonth - 1 ? curYear : curYear - 1;
    curMonth = curMonth - 1 ? curMonth - 1 : 12;
    // console.log('上个月', curYear, curMonth);
    that.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    that.getDateList(curYear, curMonth - 1);

  },
  nextMonth: function() {
    // 下个月
    var that = this;
    var curYear = that.data.curYear;
    var curMonth = that.data.curMonth;
    curYear = curMonth + 1 == 13 ? curYear + 1 : curYear;
    curMonth = curMonth + 1 == 13 ? 1 : curMonth + 1;
    // console.log('下个月', curYear, curMonth);
    that.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    that.getDateList(curYear, curMonth - 1);
  },








  // 第二个

  getDateList2: function(y, mon) {
    var that = this;
    //如果是否闰年，则2月是29日
    var daysCountArr2 = this.data.daysCountArr2;
    if (y % 4 == 0 && y % 100 != 0) {
      this.data.daysCountArr2[1] = 29;
      this.setData({
        daysCountArr2: daysCountArr2
      });
    }
    //第几个月；下标从0开始实际月份还要再+1  
    var dateList2 = [];
    // console.log('本月', that.data.daysCountArr[mon], '天');
    dateList2[0] = [];
    var weekIndex = 0; //第几个星期
    for (var i = 0; i < that.data.daysCountArr2[mon]; i++) {

      // console.log(new Date(y, mon, (i + 1)).getDay())
      var week = new Date(y, mon, (i + 1)).getDay();
      // 如果是新的一周，则新增一周
      if (week == 0) {
        weekIndex++;
        dateList2[weekIndex] = [];
      }
      // 如果是第一行，则将该行日期倒序，以便配合样式居右显示
      if (weekIndex == 0) {
        dateList2[weekIndex].unshift({
          value: y + '-' + (mon + 1) + '-' + (i + 1),
          date: i + 1,
          week: week
        });
      } else {
        dateList2[weekIndex].push({
          value: y + '-' + (mon + 1) + '-' + (i + 1),
          date: i + 1,
          week: week
        });
      }
    }
    // console.log('本月日期', dateList);
    that.setData({
      dateList2: dateList2
    });
  },
  selectDate2: function(e) {
    var that = this;
    // console.log('选中', e.currentTarget.dataset.date.value);
    that.setData({
      selectedDate2: e.currentTarget.dataset.date.value,
      selectedWeek2: that.data.weekArr2[e.currentTarget.dataset.date.week]
    });

    if (that.data.typ == 1) {
      that.getSugarList()  //血糖统计
    } else if (that.data.typ == 2) {
      that.getPressureList()  //血压统计
    } else if (that.data.typ == 3) {
      that.getWeightList()  //体重统计
    } else if (that.data.typ == 4) {
      that.getDietList()//饮食统计
    } else if (that.data.typ == 5) {
      that.getSportList() //运动统计
    }
    
  },
  preMonth2: function() {
    // 上个月
    var that = this;
    var curYear2 = that.data.curYear2;
    var curMonth2 = that.data.curMonth2;
    curYear2 = curMonth2 - 1 ? curYear2 : curYear2 - 1;
    curMonth2 = curMonth2 - 1 ? curMonth2 - 1 : 12;
    // console.log('上个月', curYear, curMonth);
    that.setData({
      curYear2: curYear2,
      curMonth2: curMonth2
    });

    that.getDateList2(curYear2, curMonth2 - 1);

  },
  nextMonth2: function() {
    // 下个月
    var that = this;
    var curYear2 = that.data.curYear2;
    var curMonth2 = that.data.curMonth2;
    curYear2 = curMonth2 + 1 == 13 ? curYear2 + 1 : curYear2;
    curMonth2 = curMonth2 + 1 == 13 ? 1 : curMonth2 + 1;
    // console.log('下个月', curYear, curMonth);
    that.setData({
      curYear2: curYear2,
      curMonth2: curMonth2
    });

    that.getDateList2(curYear2, curMonth2 - 1);
  },










  // 弹框1
  shareShare: function() {
    var that = this;
    let menu = that.data.shareMenu
    that.setData({
      shareMenu: !menu,
    })

  },

  hideCover: function() {
    let menu = this.data.shareMenu
    this.setData({
      shareMenu: !menu,
    })
  },




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








})