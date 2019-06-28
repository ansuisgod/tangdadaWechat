// pages/my/ProductIdeas/ProductIdeas.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpAdress: 'https://sit.tangdadatech.com',//接口的域名地址
    files: [],//暂存的图片
    imgs: [],
    content: '',//内容文字
    lang: '',

    chooseImgSrc:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });

  },

  

  // createFeedbackInterfaceAddress: httpAdress + '/im/api/v1/others/create_feedback.json',//提交意见的接口
  // http://api.prod.tangdada.com.cn/im/api/v1/others/create_feedback.json
  releaseDynamic: function () {

    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    if (that.data.content == '') {
      wx.showToast({
        title: '请输入内容！',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (!that.data.content.replace(/^\s+|\s+$/g, '')) {
      wx.showToast({
        title: '请输入正确内容！',
        icon: 'none',
        duration: 1500
      })
      return
    }


    // if (that.data.files.length != 0) {
    //   that.releaseDynamicUpimg()
    // }


    // wx.showLoading({ title: '提交信息中。。' })



    // var imgList = '';
    // if (that.data.lang != '') {
    //   var imgs = that.data.lang;

    //   //添加动态
    //   imgList = imgs.substring(0, imgs.length - 1);
    //   console.log(imgList)
    // }


    if (that.data.files == ''){
      let content = { 'text': that.data.content }
      console.log(content)
      that.setData({
        MYcontent: content
      })
    }else{


      that.releaseDynamicUpimg()

      setTimeout(function () {  
      // 处理数据
      let imgArr = [];
      let imglist = that.data.chooseImgSrc
      console.log(imglist)
      for (var i = 0; i < imglist.length; i++) {
        var imgs = imglist[i];
        imgArr.push({ 'url': imgs })
      }
      let content = { 'text': that.data.content, "images": imgArr }
      console.log(content)
      that.setData({
        MYcontent: content
      })
      }, 1500)

    }
    
    setTimeout(function () {  
console.log('-=-==-=-=')
    console.log(that.data.MYcontent)
    console.log(platform)

    wx.request({
      url: that.data.httpAdress + '/im/api/v1/others/create_feedback.json',

      data: {
        content: that.data.MYcontent,//描述
        wx_session_key: that.data.wxSessionKey,
        platform: platform,
        msg_type: 'normal'
        // img: imgList,//商品图片
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
          wx.showToast({
            title: '提交成功！',
            icon: 'none',
            duration: 1000
          })
          wx.navigateBack({
          });
        
      },
      fail: function (res) {
        wx.hideLoading()
      }
    })
    }, 1700)


  },





  releaseDynamicUpimg: function () {  //上传图片，采用循环上传
    var that = this
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    let file_category = '2';

    var src_array = [];
    for (var i = 0; i < that.data.files.length; i++ ){

    wx.uploadFile({
      url: that.data.httpAdress + '/im/api/v1/others/file_upload.json?file_category=' + file_category + '&wx_session_key=' + that.data.wxSessionKey + '&platform=' + platform,
      filePath: that.data.files[i],
      name:'file',
 
      success: function (res) {
        console.log("-=-=-=-=-=-=-=-=")
        wx.hideLoading()
        console.log(res)
        if (res.statusCode == '200') {

        var dataResult = res;
          dataResult.data = JSON.parse(dataResult.data)
          // wx.navigateBack({
          // });
          console.log(res.data.data.urls.origin)

          src_array.push(res.data.data.urls.origin)
          console.log(src_array)
          that.setData({
            chooseImgSrc: src_array,
          });
          console.log(that.data.chooseImgSrc)
        } else {
          abstac.promptBox(res.data.result.message);
        }


      },
      fail: function (res) {
        wx.hideLoading()
      }
    })

    }

  },







 

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },

  previewImages: function (e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.index, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  // 删除本地缓存用户选择的图片
  delImg: function (e) {
    var imageList = this.data.files;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    imageList.splice(index, 1);
    this.setData({
      files: imageList
    });
  },














  content: function (e) {//文字
    this.setData({
      content: e.detail.value
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