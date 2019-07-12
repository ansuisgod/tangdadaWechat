// pages/my/doctorText/doctorText.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    information:false,
    img:'',        //上一个页面传来的
    name:'',       //姓名
    content:'',    //详情内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey'),
      img: options.img,
    });
  },


  name: function (e) {
    let value = e.detail.value;
    this.setData({
      name: value,
    });
  },

  content: function (e) {
    let value = e.detail.value;
    this.setData({
      content: value,
    });
  },

  saveTo: function () {
    var that = this;

    if (!that.data.name.replace(/^\s+|\s+$/g, '')) {
      abstac.promptBox("亲， 姓名不能为空哦！");
      return
    }

    if (!that.data.content.replace(/^\s+|\s+$/g, '')) {
      abstac.promptBox("亲， 内容不能为空哦！");
      return
    }


    that.setData({
      information: true,
    });


   


  },


  Mynotsend: function () {
    var that = this;

    wx.showModal({
      title: '提示',
      content: '您确定取消吗，你所填写的资料将不会保存！',
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/my/ModifyMyInfo/ModifyMyInfo',
          })
        } else if (res.cancel) {
        }
      }
    })

  },
  
  MysendTo: function () {
    var that = this;
 // setDoctorInfoInfoInterfaceAddress: httpAdress + '/im/api/v1/users/set_doctor_info.json',//提交医生信息的接口


    abstac.sms_Interface(app.publicVariable.setDoctorInfoInfoInterfaceAddress,
      { wx_session_key: that.data.wxSessionKey, description: that.data.content,name:that.data.name,license_pic:that.data.img },
      function (res) {//查询成功
        //打印日志
        console.log("****************提交医生信息的接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          wx.showModal({
            title: '提示',
            content: '您的申请已提交！工作人员将在三个工作日里审核，请留意消息通知！',
            showCancel:false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/my/ModifyMyInfo/ModifyMyInfo',
                })
              } 
            }
          })


        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });



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