// pages/my/doctorImg/doctorImg.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: '',
    headImgSrc: '',
    show: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey'),
      platform: app.globalData.platform,
    });
  },

  previewImages: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        //console.log(res);
        var tempFilePaths = res.tempFilePaths
        that.setData({
          files: res.tempFilePaths
        });
      }
    })
  },


  /**
 *  @desc：调用图片上传服务器的地址
 */
  uploadFile: function () {
    let that = this,
      platformS = abstac.mobilePhoneModels(this.data.platform),
      file_category = '2';
    //将图片的路径上传服务器的地址

    if (that.data.files == '') {
      abstac.promptBox("亲， 请选择一张图片哦！");
      return
    }

    wx.showLoading({
      title: '请求中',
    });

    that.setData({
      show: false,
    });


    wx.uploadFile({
      url: app.publicVariable.fileUploadPicInterfaceAddress + '?file_category=' + file_category + '&wx_session_key=' + that.data.wxSessionKey + '&platform=' + platformS,
      filePath: that.data.files[0],
      name: 'file',
      success: res => {
        wx.hideLoading();
        console.log("****************上传图片的接口返回函数***************");
        console.log(res);
        if (res.statusCode == '200') {
          var dataResult = res;
          dataResult.data = JSON.parse(dataResult.data);
          let imgs = res.data.data.urls.origin
          that.setData({
            headImgSrc: imgs,
          });


          wx.redirectTo({
            url: '/pages/my/doctorText/doctorText?img=' + imgs,
          })


          // // 子传父参数
          // var pages = getCurrentPages();
          // var prevPage = pages[pages.length - 2]; //上一个页面
          // //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          // prevPage.setData({
          //   mydata: imgs
          // })
          // wx.navigateBack({//返回
          //   delta: 1
          // })
          // // 子传父参数END



          console.log(that.data.headImgSrc);
        } else {
          wx.hideLoading();
        }
      }
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