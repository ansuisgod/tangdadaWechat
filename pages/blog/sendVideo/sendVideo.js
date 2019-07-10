var src_array = [],
  src_array1 = [],
  abstac = require('../../../commonmethod/abstract.js'),
  app = getApp(),
  sizes = '20',
  pagess = '1';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseImgSrc: [],
    interfaceData: '',
    tagId:'97',
    imgDisplay: 'none',
    btnActives:'fant',
    articalTilte: '',//文章的标题
    content: '',//文本域
    draftBoxNumber: ''//草稿箱的草稿条数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey'),
      flaggs: options.flags
    });
    //如果从帖子里面进入就会加上标识，表明是从帖子进入发视频，tagId=0隐藏肥胖、女性健康、康复理疗标签，否则tagId=97，98，99
    if (this.data.flaggs == '1'){
      this.setData({
        tagId:'0',
        tagShow:false
      });
    }else{
      this.setData({
        tagShow: true
      });
    }
  },
  /**
   * @desc:删除预览图片
   */
  delPic: function (e) {

    var imgArr = this.data.chooseImgSrc,
      picIndex = e.currentTarget.dataset.ids;
    if (picIndex == '0') {
      imgArr.splice(0, picIndex + 1);
    } else {
      imgArr.splice(picIndex, picIndex);
    }

    this.setData({
      chooseImgSrc: imgArr
    });
    console.log(imgArr);
  },
  /**
   * @desc:点击发布按钮触发的函数
   */
  releaseBtn: function () {
    if (this.data.articalTilte == '') {
      abstac.promptBox("标题不能为空！");
    } else if (this.data.content.length <= 20) {
      abstac.promptBox("正文内容不能少于20个字！");
    } else if (this.data.interfaceData.length == '0'){
      abstac.promptBox("请选择上传视频");
    }else{
      //循环动态的拼装参数的字符串的格式
      var parmLength = this.data.interfaceData.length,
        arrya1 = [];
      for (var j = 0; j <= parmLength - 1; j++) {
        arrya1.push({ 'url': src_array1[j] });
      }

      //调接口
      var that = this,
          platform = abstac.mobilePhoneModels(this.data.platform),
          html = '1',
          title = this.data.articalTilte,
          contents = {
            'text': this.data.content,
            'mp4':'true',
            'images': arrya1
          };

      //打印日志
      console.log("tagId=" + this.data.tagId + "&platform=" + platform + "&html=" + html + "&title=" + title + "&wxSessionkey=" + this.data.wxSessionKey + "&content=" + contents);
      abstac.sms_Interface(app.publicVariable.postBlogInterfaceAddress,
        { platform: platform, html: html, title: title, content: contents, wx_session_key: this.data.wxSessionKey, tag_id: this.data.tagId },
        function (res) {
          console.log("****************发布帖子接口返回函数***************");
          console.log(res);
          if (res.data.result.code == '2000') {
            abstac.promptBox("发布成功！");
            that.setData({
              content: '',
              articalTilte: '',
              chooseImgSrc: '',
              interfaceData: ''
            });
            
            wx.switchTab({
              url: '../../../pages/subhealth/subhealth'
            })
          } else {
            abstac.promptBox(res.data.result.message);
          }

        }, function (error) {

        });
      arrya1 = [];
      src_array = [];
      src_array1 = [];
    }
  },
  /**
   * @desc:点击相片的图标触发的函数
   */
  chooseVideo: function () {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      success: function (res) {
        var tempFilePaths = res.tempFilePath;
        console.log(res);
        //将所有的图片路径放在对象里面
        src_array = src_array.concat(res.tempFilePaths);
        that.setData({
          chooseImgSrc: src_array,
          imgDisplay: 'block'
        });
        //调用视频上传的接口
        that.uploadFile(tempFilePaths);
        //视频的缩略图的上传
        that.thumbUploadFile();
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  /**
   *  @desc：调用视频上传服务器的地址
   */
  uploadFile: function (tempFilePaths) {
    abstac.promptBox('正在上传中....');
    let that = this,
        platformS = abstac.mobilePhoneModels(this.data.platform),
        file_category = '2';
    //将图片的路径上传服务器的地址
    wx.uploadFile({
      url: app.publicVariable.fileUploadPicInterfaceAddress + '?file_category=' + file_category + '&wx_session_key=' + this.data.wxSessionKey + '&platform=' + platformS,
      filePath: tempFilePaths,
      name: 'file',
      success: res => {
        console.log("****************上传视频的接口返回函数***************");
        console.log(res);
        if (res.statusCode == '200') {
          var dataResult = res;
          dataResult.data = JSON.parse(dataResult.data);
          that.setData({
            interfaceData: src_array1.push(res.data.data.urls.origin),
            imgDisplay: 'block'
          });
          that.setData({
            interfaceData: src_array1
          });
          console.log(that.data.interfaceData);
        } else {

        }
      }
    })

  },
  thumbUploadFile: function (thumbTempFilePath){
    this.setData({
      interfaceData: src_array1.push('http://hbimg.b0.upaiyun.com/1e3ead27ad747c7c92e659ac5774587a680bb8d25252-mRVFlu_fw658'),
      imgDisplay: 'block'
    });
    this.setData({
      interfaceData: src_array1
    });
    //微信小程序真机上面获取不到视频的封面图，用一张静态的图片代替视频的封面图
    // let that = this,
    //   platformS = abstac.mobilePhoneModels(this.data.platform),
    //   file_category = '2';
    // wx.uploadFile({
    //   url: app.publicVariable.fileUploadPicInterfaceAddress + '?file_category=' + file_category + '&wx_session_key=' + this.data.wxSessionKey + '&platform=' + platformS,
    //   filePath: thumbTempFilePath,
    //   name: 'file',
    //   success: res => {
    //     console.log("****************上传缩略图的接口返回函数***************");
    //     console.log(res);
    //     if (res.statusCode == '200') {
    //       var dataResult = res;
    //       dataResult.data = JSON.parse(dataResult.data);
    //       that.setData({
    //         interfaceData: src_array1.push(res.data.data.urls.origin),
    //         imgDisplay: 'block'
    //       });
    //       that.setData({
    //         interfaceData: src_array1
    //       });
    //       console.log(that.data.interfaceData);
    //     } else {

    //     }
    //   }
    // })
  },
  /**
   * @desc：获取标题输入框的值
   */
  articalTilte: function (e) {
    this.setData({
      articalTilte: e.detail.value
    });
  },
  /**
   * @desc：获取文本域的值
   */
  content: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  /**
   * @desc:设置按钮的选中状态
   */
  selectedPinche:function(e){
    var typees = e.currentTarget.dataset.active;
    console.log(typees);
    this.setData({
      btnActives: typees,
      tagId: e.currentTarget.dataset.tagid
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