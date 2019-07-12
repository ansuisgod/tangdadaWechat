// pages/my/add_diet_estimate/add_diet_estimate.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp(),
  session_key = wx.getStorageSync('sessionKey');



Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      platform: app.globalData.platform
    });

    that.foodCategoryList();
  },





  /**
   * @desc:获取食物热量估算的接口
   * @date:2019.06.10
   * @auther:li
   */
  foodCategoryList: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    abstac.sms_Interface(app.publicVariable.foodCategoryInterfaceAddress,
      { platform: platform, },
      function (res) {//查询成功
        //打印日志
        console.log("****************查询食物热量估算的列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          /**
           * 判断当前的页数是否超过了总页数
           */

          var datas = res.data.data.food_groups;
          that.setData({
            foodCategoryLists: datas,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },


  // 以下為跳转业务

  estimateDetails: function (e) {  //跳转入饮食记录估算详情

    console.log(e.currentTarget.dataset.info.id)
    let index = e.currentTarget.dataset.info.id




    var listA = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_03.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_04.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_05.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_06.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_07.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_08.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_09.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_10.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_11.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_12.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_13.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_14.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_15.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_16.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_17.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_18.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_19.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_20.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_21.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_A_22.jpg',
      ]

    var listB = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_03.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_04.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_05.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_06.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_07.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_08.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_09.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_10.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_B_11.jpg',
    ]

    var listC = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_C_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_C_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_C_03.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_C_04.jpg',
    ]

    var listD = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_03.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_04.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_05.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_06.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_07.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_08.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_09.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_10.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_11.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_12.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_13.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_14.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_15.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_16.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_17.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_18.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_19.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_20.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_21.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_22.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_D_23.jpg',
    ]

    var listE = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_E_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_E_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_E_03.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_E_04.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_E_05.jpg',
    ]

    var listF = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_03.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_04.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_05.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_06.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_07.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_08.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_09.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_F_10.jpg',
    ]

    var listG = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_G_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_G_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_G_03.jpg',
    ]

    var listH = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_H_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_H_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_H_03.jpg',
    ]

    var listI = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_I_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_I_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_I_03.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_I_04.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_I_05.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_I_06.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_I_07.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_I_08.jpg',
    ]

    var listJ = [
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_J_01.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_J_02.jpg',
      'https://showyu.oss-cn-hangzhou.aliyuncs.com/tang/food_images/food_estimate_J_03.jpg',
    ]


    let listImg = []
    if (index == '1') {
      listImg.push(listA)
    }

    if (index == '2') {
      listImg.push(listB)
    }

    if (index == '3') {
      listImg.push(listC)
    }

    if (index == '4') {
      listImg.push(listD)
    }

    if (index == '5') {
      listImg.push(listE)
    }

    if (index == '6') {
      listImg.push(listF)
    }

    if (index == '7') {
      listImg.push(listG)
    }

    if (index == '8') {
      listImg.push(listH)
    }

    if (index == '9') {
      listImg.push(listI)
    }

    if (index == '10') {
      listImg.push(listJ)
    }

    wx.navigateTo({
      url: '/pages/my/add_diet_estimateDetails/add_diet_estimateDetails?listImg=' + JSON.stringify(listImg),
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