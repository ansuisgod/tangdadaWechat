// pages/my/my_points/my_points.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();



var start = 0,//悬浮按钮相关信息
  end = 0,
  timer = null; //悬浮按钮相关信息



Page({

  /**
   * 页面的初始数据
   */
  data: {

    iSscroll: false, //悬浮按钮判断n    `
    woman: '../../../images/personal/woman.png',
    man: '../../../images/personal/man.png',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    });

    that.queryIntegral();//查询用户的积分
    that.userTaskList();//用户任务列表的接口

    // setTimeout(function () {
    that.listTask()
    that.queryUserInfo()
    // }, 800)

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight + "px",
        })
      }
    })
  },

  /**
* @desc:查询用户信息接口
* @date:2019.06.17
* @auther:li
*/
  queryUserInfo: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    abstac.sms_Interface(app.publicVariable.queryUserInformationInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, platform: platform, },
      function (res) {//查询成功
        //打印日志
        console.log("****************查询用户信息接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          var data = res.data.data;
          that.setData({
            queryUserInfo: data,
            refreshState: '0',
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
 * @desc:查询当前的用户的积分
 * @date:2019.06.18
 * @auther:li
 */
  queryIntegral: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.queryPointsInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey },
      function (res) {//查询成功
        //打印日志
        console.log("****************查询当前的用户的积分***************");
        console.log(res);
        if (res.data.result.code == '2000') {
          var userName = wx.getStorageSync('wxnickname');
          that.setData({
            userIntegral: res.data.data.points,
            userName: userName
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
 * @desc:任务列表的接口
 * @date:2019.06.18
 * @auther:li
 */
  listTask: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.listTaskInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey },
      function (res) {//查询成功
        //打印日志
        console.log("****************任务列表的接口***************");
        console.log(res);
        if (res.data.result.code == '2000') {


          // 合并接口数据
          let listTask = res.data.data.tasks;

          for (var i = 0; i < that.data.userTaskList.length; i++) {
            var userTaskList = that.data.userTaskList[i];
  

            let listTask = res.data.data.tasks;
            for (var j = 0; j < listTask.length; j++) {
              var listTasks = listTask[j];

              if (userTaskList.task_id == listTasks.id) {
                listTasks.times = userTaskList.times;
                listTasks.status = userTaskList.status;
              } else{
                listTasks.times = 0;
                listTasks.status = 1;
              }

            }


          }
 
          that.setData({
            listTask: listTask,
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
 * @desc:用户任务列表的接口
 * @date:2019.06.18
 * @auther:li
 */
  userTaskList: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.userTaskInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey },
      function (res) {//查询成功
        //打印日志
        console.log("****************用户任务列表的接口***************");
        console.log(res);
        if (res.data.result.code == '2000') {
          that.setData({
            userTaskList: res.data.data.tasks,
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
   * 滚动监听
   */
  handleScroll: function(e) {
    console.log('滚动时', e)
    start = e.detail.scrollTop
    this.setData({
      iSscroll: true
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
      end = e.detail.scrollTop;
      if (end == start) {
        console.log('停止滚动了');
        this.setData({
          iSscroll: false
        })
      }
    }, 800);
  },



  // 以下為跳转业务
  goIntegralRules: function() { //跳转入积分规则
    wx.navigateTo({
      url: '/pages/my/Integral_rules/Integral_rules',
    })
  },


  goMyBadge: function () { //跳转入我的徽章
    wx.navigateTo({
      url: '/pages/my/my_badge/my_badge',
    })
  },

  forRecord: function () { //跳转到积分详细列表页面
    wx.navigateTo({
      url: '/pages/shopping/forRecord/forRecord'
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