// pages/blog/release/release.js
var src_array = [],
    src_array1 = [],
    arrya1 = [],
    arryaPic = [],
    abstac = require('../../../commonmethod/abstract.js'),
    app = getApp(),
    sizes = '20',
    noteId = '',
    pagess = '1';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseImgSrc:[],
    title:'',
    contentTitle:'',
    interfaceData: '',
    imgDisplay:'none',
    articalTilte:'',//文章的标题
    content:'',//文本域
    disableLoginBtn: false,//发布按钮的状态按
    draftBoxNumber: '',//草稿箱的草稿条数
    statuss:'',//标记是从草稿箱进来的
    saveDraftBoxColor:'#a9a9a9'//动态改变存入草稿箱文字的颜色
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.drafbox == '1'){
      this.setData({
        drafBoxData: JSON.parse(options.info),
        statuss:'1'
      });
      noteId = this.data.drafBoxData.id;
      console.log(this.data.drafBoxData);
    } else{
      this.setData({
        drafBoxData: '',
        statuss:'0'
      });
    }
    console.log("statuss="+this.data.statuss);
    this.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    //判断手机是否连接网络
    if (app.globalData.netWorkType == '4g' || app.globalData.netWorkType == 'wifi' || app.globalData.netWorkType == '3g') {
      this.getDrafBoxNumber(options.drafbox);//获取草稿箱的条数的接口
    } else {
      abstac.promptBox('请检查你的网络是否正常');//提示框
    }
  },
  /**
   * @desc:删除预览图片
   */
  delPic:function(e){
    var imgArr = this.data.chooseImgSrc,
        picIndex = e.currentTarget.dataset.ids;
    if (picIndex == '0'){
      imgArr.splice(0, picIndex + 1);
    }else{
      imgArr.splice(picIndex, picIndex);
    }
    this.setData({
      chooseImgSrc:''
    });
    arrya1 = [];
    src_array = [];
    src_array1 = [];
    console.log(imgArr);
    let imgLength = this.data.chooseImgSrc.length;
    //动态改变存入草稿箱的文字的颜色
    if (imgLength == '0') {
      this.setData({
        saveDraftBoxColor: '#a9a9a9'
      });
    } else {
      this.setData({
        saveDraftBoxColor: '#ff7584'
      });
    }
  },
  /**
   * @desc:获取草稿箱的条数
   */
  getDrafBoxNumber: function (drafBbox){
    let that = this;
    abstac.sms_Interface(app.publicVariable.getDraftBoxNumberInterfaceAddress,
      { page: pagess, wx_session_key: this.data.wxSessionKey, size: sizes},
    function(res){//接口返回成功
      console.log("****************获取草稿箱的条数的接口返回函数***************");
      console.log(res);
      //有则获取数据
      if (res.data.result.code == '2000'){
        that.setData({
          draftBoxNumber: res.data.data.count
        });
        //判断草稿箱里条数是否有，如果有则弹出提示框
        if (that.data.draftBoxNumber > '0'){
          if (drafBbox == '1'){
            var cc = that.data.drafBoxData;
            cc.content = JSON.parse(cc.content);
            that.setData({
              title: cc.title,
              contentTitle: cc.content.text,
              articalTilte: cc.title,
              content: cc.content.text
            });
            console.log(cc);
          }else{
            that.confirmationBox();//调用弹出提示框
          }
        }
      }else{
          abstac.promptBox(res.data.result.message);
      }
    },
    function(error){//接口返回失败
      console.log(error);
    });
  },
  /**
   * @desc:弹出提示框
   */
  confirmationBox:function(){
    wx.showModal({
      title: '提示',
      content: '您的草稿箱中还有' + this.data.draftBoxNumber+'封草稿！',
      confirmText:'前往',
      cancelText:'取消',
      success:function(res){
        if(res.confirm){
          console.log('确认');
          //跳转草稿箱的页面
          wx.navigateTo({
            url: '../../../pages/my/draft_box/draft_box'
          });
        }
        if(res.cancel){
          console.log('取消');
        }
      }
    })
  },
  /**
   * @desc:点击相片的图标触发的函数
   */
  choosePhotos:function(){
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
          let imgLength = that.data.chooseImgSrc.length;
          //动态改变存入草稿箱的文字的颜色
          if (imgLength == '0') {
            that.setData({
              saveDraftBoxColor: '#a9a9a9'
            });
          } else {
            that.setData({
              saveDraftBoxColor: '#ff7584'
            });
          }
        }
      },
    })
  },
  /**
   * @desc:点击存入草稿箱触发的函数
   */
  saveDraftBox:function(){
    //打印日志
    console.log("存入草稿箱操作");
    //循环动态的拼装参数的字符串的格式
    var parmLength = this.data.interfaceData.length,
        arrya1 = [];
    for (var j = 0; j <= parmLength - 1; j++) {
      arrya1.push({ 'url': src_array1[j] });
    }
    var tagIds = '0',
        contents = {
          "text": this.data.content,
          'images': arrya1
        };
    abstac.sms_Interface(app.publicVariable.storageDraftBoxFrendInterfaceAddress,
      { content: contents, wx_session_key: this.data.wxSessionKey, tag_id: tagIds, title: this.data.articalTilte },
    function(res){
      console.log("****************存入草稿箱的接口返回函数***************");
      console.log(res);
      //有则获取数据
      if (res.data.result.code == '2000'){
        wx.switchTab({
          url: '../../../pages/blog/blog'
        });
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },function(error){
      console.log(error);
    });
    arrya1 = [];
  },
  /**
   * @desc:点击发布按钮触发的函数
   */
  releaseBtn:function(){
    if (this.data.articalTilte == ''){
      abstac.promptBox("标题不能为空！");
    } else if (this.data.content.length <= 20){
      abstac.promptBox("正文内容不能少于20个字！");
    }else{
      this.setData({
        disableLoginBtn: true
      })
      //循环动态的拼装参数的字符串的格式
      var parmLength = this.data.interfaceData.length;
      for (var j = 0; j <= parmLength - 1; j++){
        arrya1.push({ 'url': src_array1[j] });
        arryaPic.push('<img src='+src_array1[j]+' />');
      }
      console.log(arryaPic);
      //调接口
      var tagId = '0',
          that = this,
          ajaxUrl = '',
          platform = abstac.mobilePhoneModels(this.data.platform),
          html = '1',
          title = this.data.articalTilte,
          contents = {
            'text': this.data.content + arryaPic,
            'images': arrya1
          };
      //从草稿箱进来的就要叫一个参数note_id
      if (this.data.statuss == '1') {
        ajaxUrl = { platform: platform, html: html, title: title, content: contents, wx_session_key: this.data.wxSessionKey, tag_id: tagId, note_id: noteId};
      }
      if (this.data.statuss == '0') {
        ajaxUrl = { platform: platform, html: html, title: title, content: contents, wx_session_key: this.data.wxSessionKey, tag_id: tagId };
      }
      //打印日志
      console.log("tagId=" + tagId + "&platform=" + platform + "&html=" + html + "&title=" + title + "&wxSessionkey=" + this.data.wxSessionKey + "&content=" + contents);
      abstac.sms_Interface(app.publicVariable.postBlogInterfaceAddress, ajaxUrl,
      function(res){
        console.log("****************发布帖子接口返回函数***************");
        console.log(res);
        if (res.data.result.code == '2000'){
          abstac.promptBox("发布成功！");
          that.setData({
            content: '',
            articalTilte:'',
            chooseImgSrc:'',
            interfaceData:''
          });
          wx.switchTab({
            url: '../../../pages/blog/blog'
          })
        }else{
          abstac.promptBox(res.data.result.message);
        }
      },function(error){
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
  uploadFile: function (tempFilePaths){
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
          if (res.statusCode == '200'){
            var dataResult = res;
            dataResult.data = JSON.parse(dataResult.data);
            that.setData({
              interfaceData: src_array1.push(res.data.data.urls.origin),
              imgDisplay: 'block',
              disableLoginBtn: false
            });
            that.setData({
              interfaceData: src_array1
            });
          }else{}
        }
      })
  },
  /**
   * @desc：获取标题输入框的值
   */
  articalTilte:function(e){
    this.setData({
      articalTilte: e.detail.value
    });
    //动态改变存入草稿箱的文字的颜色
    if (e.detail.value.length == '0'){
      this.setData({
        saveDraftBoxColor:'#a9a9a9'
      });
    }else{
      this.setData({
        saveDraftBoxColor: '#ff7584'
      });
    }
  },
  /**
   * @desc：获取文本域的值
   */
  content: function (e) {
    this.setData({
      content: e.detail.value
    });
    //动态改变存入草稿箱的文字的颜色
    if (e.detail.value.length == '0') {
      this.setData({
        saveDraftBoxColor: '#a9a9a9'
      });
    } else {
      this.setData({
        saveDraftBoxColor: '#ff7584'
      });
    }
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