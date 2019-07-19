// pages/blog/releaseTag/releaseTag.js
var src_array = [],
  src_array1 = [],
  arrya1 = [],
  arryaPic = [],
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
    title: '',
    contentTitle: '',
    btnActives: 'fant',
    tagId: '97',
    interfaceData: '',
    imgDisplay: 'none',
    disableLoginBtn: false,//发布按钮的状态按
    articalTilte: '',//文章的标题
    content: ''//文本域
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
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
      chooseImgSrc: ''
    });
    console.log(imgArr);
    src_array = [];
    src_array1 = [];
    arrya1 = [];
  },
  /**
   * @desc:点击相片的图标触发的函数
   */
  choosePhotos: function () {
    var that = this;
    wx.chooseImage({
      count: 2,
      sizeType: ['compressed'],
      sourceType: ['album','camera'],
      success: function (res) {
        console.log(res);
        let picSize = res.tempFiles[0].size;
        if (picSize > '500000'){
          abstac.promptBox('图片太大了，请重新选择小于5M图片');
          return;
        }else{
          //将所有的图片路径放在对象里面
          for (var k = 0; k <= res.tempFilePaths.length - 1; k++) {
            src_array.push(res.tempFilePaths[k]);
            that.uploadFile(res.tempFilePaths[k]);
          }
          that.setData({
            chooseImgSrc: src_array,
            imgDisplay: 'block'
          });
        }
      },
    })
  },
  /**
   * @desc:点击发布按钮触发的函数
   */
  releaseBtn: function () {
    if (this.data.articalTilte == '') {
      abstac.promptBox("标题不能为空！");
    } else if (this.data.content.length <= 20) {
      abstac.promptBox("正文内容不能少于20个字！");
    } else {
      this.setData({
        disableLoginBtn: true
      })
      //循环动态的拼装参数的字符串的格式
      var parmLength = this.data.interfaceData.length;
      for (var j = 0; j <= parmLength - 1; j++) {
        arrya1.push({ 'url': src_array1[j] });
        arryaPic.push('<img src=' + src_array1[j] + ' />');
      }
      //调接口
      var tagId = this.data.tagId,
        that = this,
        platform = abstac.mobilePhoneModels(this.data.platform),
        html = '1',
        title = this.data.articalTilte,
        contents = {
          'text': this.data.content + arryaPic,
          'images': arrya1
        };
      //打印日志
      console.log("tagId=" + tagId + "&platform=" + platform + "&html=" + html + "&title=" + title + "&wxSessionkey=" + this.data.wxSessionKey + "&content=" + contents);
      abstac.sms_Interface(app.publicVariable.postBlogInterfaceAddress,
        { platform: platform, html: html, title: title, content: contents, wx_session_key: this.data.wxSessionKey, tag_id: tagId },
        function (res) {
          console.log("****************亚健康发布图文帖子接口返回函数***************");
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
          console.log(error);
        });
      arrya1 = [];
      src_array = [];
      src_array1 = [];
    }
  },
  /**
   *  @desc：调用图片上传服务器的地址
   */
  uploadFile: function (tempFilePaths) {
    this.setData({
      disableLoginBtn: true
    })
    let that = this,
      platformS = abstac.mobilePhoneModels(this.data.platform),
      file_category = '2';
    //将图片的路径上传服务器的地址
    wx.uploadFile({
      url: app.publicVariable.fileUploadPicInterfaceAddress + '?file_category=' + file_category + '&wx_session_key=' + that.data.wxSessionKey + '&platform=' + platformS,
      filePath: tempFilePaths,
      name: 'file',
      success: res => {
        console.log("****************上传图片的接口返回函数***************");
        console.log(res);
        if (res.statusCode == '200') {
          var dataResult = res;
          dataResult.data = JSON.parse(dataResult.data);
          that.setData({
            interfaceData: src_array1.push(res.data.data.urls.origin),
            imgDisplay: 'block'
          });
          that.setData({
            interfaceData: src_array1,
            disableLoginBtn: false
          });
        } else {}
      }
    })
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
  selectedPinche: function (e) {
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
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})