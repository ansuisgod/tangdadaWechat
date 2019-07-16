// pages/blogDetail/blogDetail.js
var WxParse = require('../../../plugin/wxParse/wxParse.js');
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp(),
    src_array = [],
    src_array1 = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseImgSrc: [],
    interfaceData: '',
    content: [],
    blogId: '',//文章的id
    imageArr: [],//内容的文章
    commentList: [],//评论的列表
    replyContent: '',//回复的内容
    platform: app.globalData.platform,//设备id
    dynamicPlaceHolderValue: '说点什么...',//动态设置输入框的placeholder
    quoteId: '',//回复评论人的id
    noReplyFlag: '0',//标识是评论还是回复，默认是评论0，当用户点击回复图标就标识为1
    size:'60',
    page:'1',
    dynamicLikedPicSrc: '',//默认点赞图片的路径【新增加的代码】
    likeFlag: '',//显示是否已经点赞的标志【新增加的代码】
    plicesShow:'none',
    showHiden:'block',
    thumbnailShow:false,
    imgDisplay: 'none',
    sendsOrHiden:'none',
    videoSrc:'',
    hideContens:'block',
    wechat: 'none'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("**********从帖子列表页传入的参数**********");
    console.log(options);
    this.setData({
      blogId: options.blogId,
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.getBlogDetail();
  },
  /**
   * 获取帖子的数据
   */
  getBlogDetail: function () {
    let localplatform = abstac.mobilePhoneModels(this.data.platform),
        that = this;
    //打印日志
    console.log("session_key=" + this.data.wxSessionKey + "&topic_id=" + this.data.blogId + "&platform=" + localplatform);
    abstac.sms_Interface(app.publicVariable.blogDetailInterfaceAddress,
      { html: '1', page: this.data.page, platform: localplatform, size: this.data.size, topic_id: this.data.blogId, wx_session_key: this.data.wxSessionKey },
      function (res) {//请求成功
        console.log("**********帖子详情返回的数据开始日志**********");
        console.log(res);
        //判断是否有数据，有则取数据  
        if (res.data.result.code == '2000') {
          /**
           * 将后台返回的数据中的summary、content字符串转化为json格式
           */
          var exchangeContents = res.data.data.topic,
              like = res.data.data.topic.liked,//点赞的状态
              likedPicSrc = '',//点赞图片的路径变量 【新增加的代码】
              likeFlagss = '',//点赞图片的路径变量 【新增加的代码】
              replies = res.data.data.replies;//回复列表
              exchangeContents.content = JSON.parse(exchangeContents.content);
           var imagesS = '';
          /**
           * @desc:循环回复列表里面的回复字段，将其转化为JSON格式。新增加了判断replies是否是undefien的判断
           */
          if (replies == undefined){
            replies = '';
          }else{
            for (var i = 0; i < replies.length; i++) {
              if (replies[i].quote_content == '' || replies[i].quote_content == undefined) {
                replies[i].quote_content = '';
              } else {
                replies[i].quote_content = JSON.parse(replies[i].quote_content);
              }
            }
            that.setData({
              plicesShow:'block'
            });
          }
          /**
           * @desc:判断图片是否为undefined,如果不判断会报错
           */
          if (res.data.data.topic.content.images == undefined){
            imagesS = '';
          }else{
            imagesS = res.data.data.topic.content;
          }
          /**
           * @desc：判断是否已经点过赞，已经点赞就显示已经点赞的图片否则就显示未点赞的图片
           * @note：新增加的代码
           * @date：20190606
           */
          if (like == '0'){
            likedPicSrc = "../../../static/like.png";
            likeFlagss = '0';
          }else{
            likedPicSrc = "../../../static/liked.png";
            likeFlagss = '1';
          }
          /*
          * @desc：判断数据中是否有视频的字段,如果mp4字段不为空则调用judgeVideo，否则不调用judgeVideo方法
          */
          if (exchangeContents.content.mp4 == 'true'){
            that.setData({
              wechat: 'block'
            });
            that.judgeVideo(exchangeContents.content);
          }
          that.setData({
            content: exchangeContents,
            imageArr: imagesS,
            commentList: replies,
            dynamicLikedPicSrc: likedPicSrc,
            likeFlag: likeFlagss
          });
          WxParse.wxParse('wxParse', 'html', res.data.data.topic.content_text, that, 5);
        } else {//就弹出提示框
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//请求失败
        console.log(error);
      });
  },
  /**
   * @desc：视频处理的方法
   * @date：20190624
   */
  judgeVideo:function(videoInfo){
    if (videoInfo.images[1] == undefined){
      this.setData({
        videoSrc: videoInfo.images[0].url
      });
    }else{
      this.setData({
        videoSrc: videoInfo.images[1].url
      });
    }
  },
  /**
   * @desc:评论输入框触发的函数
   */
  inputFunc: function (e) {
    this.setData({
      replyContent: e.detail.value
    });
    //判断是否显示发送的按钮
    if (e.detail.value.length == '0'){
      this.setData({
        showHiden:'block',
        sendsOrHiden:'none'
      });
    }else{
      this.setData({
        showHiden: 'none',
        sendsOrHiden:'block'
      });
    }
  },
  /**
   * @desc:评论输入框输入内容，点击确认键发送评论的内容
   * @param：content：内容、platform：是安卓还是苹果、topic_id：文章的id、wx_session_key：微信值
   */
  commentsSent: function () {
    let localplatform = abstac.mobilePhoneModels(this.data.platform),
        requUrl = '';
    //循环动态的拼装参数的字符串的格式
    var parmLength = this.data.interfaceData.length,
        arrya1 = [],
        contents = '';
    if (parmLength == '0'){
      contents = {
        'text': this.data.replyContent
      };
      arrya1 = { "text": this.data.replyContent };
      var titleStr = this.hasSensitiveWords(this.data.replyContent);
      if (titleStr){
        console.log('包含了违法的词汇');
        abstac.promptBox("包含了违法的词汇，请重新输入");
        return;
      }
    }else{
      for (var j = 0; j <= parmLength - 1; j++) {
        arrya1.push({ 'url': src_array1[j] });
      }
      contents = {
        'text': this.data.replyContent,
        'images': arrya1
      };
    }
    //通过标识判断是评论还是回复的操作
    if (this.data.noReplyFlag == '0') {
      console.log("评论");
      requUrl = { content: contents, platform: localplatform, topic_id: this.data.blogId, wx_session_key: this.data.wxSessionKey };
    }
    if (this.data.noReplyFlag == '1') {
      console.log("回复评论人");
      requUrl = { content: contents, platform: localplatform, topic_id: this.data.blogId, quote_id: this.data.quoteId, wx_session_key: this.data.wxSessionKey};
    }
    //打印日志
    console.log("replyContent=" + this.data.replyContent + "&topic_id=" + this.data.blogId + "&wx_session_key=" + this.data.wxSessionKey + "&platform=" + localplatform);
    var that = this;
    abstac.sms_Interface(app.publicVariable.commentsInterfaceAddress, requUrl,
      function (res) {//成功
        console.log("********************评论发送接口返回数据***********************");
        console.log(res);
        if (res.data.result.code == '2000') {
          abstac.promptBox("+5积分,需等待审核");
          that.setData({
            replyContent: '',
            showHiden: 'block',
            sendsOrHiden: 'none',
            thumbnailShow: false,
            chooseImgSrc:'',
            interfaceData: ''
          });
          arrya1 = [];
          src_array = [];
          src_array1 = [];
        } else {
          abstac.promptBox("评论失败！");
        }
      },
      function (error) { //失败
        abstac.promptBox(error.errMsg);
        console.log(error);
      }
    );//调用发送评论的内容的接口
  },
  /**
   * @desc：简单的过滤一些敏感词，后面估计要换成请求接口来过滤敏感词
   * @date：20190708
   * @auther：an
   */
  hasSensitiveWords:function(str) {
    if(str == '' || str == undefined) return false;
    var words = '台独,藏独,色情,淫荡,法轮功,淫秽,打到共产党,反党,胸部,裸体,傻逼,傻屌,funck,他妈的,操你妈,操你妹,操你';
    var array = words.split(','), len = array.length;
    for (var i = 0; i < len; i++) {
      var item = array[i];
      if (str.indexOf(item) >= 0 && item != '') {
        return item;
      }
    }
    return false;
  },
  /**
   * @desc:点击评论列表的回复图标触发的函数
   */
  replyReviewer: function (e) {
    this.setData({
      dynamicPlaceHolderValue: "@" + e.target.dataset.nickname,
      quoteId: e.target.dataset.quoteid,
      noReplyFlag: '1'
    });
    //打印日志
    console.log("quote_id=" + e.target.dataset.quoteid + "&placeHolder=" + e.target.dataset.nickname + "&noReplyFlag=" + this.data.noReplyFlag);
  },
  /**
   * @desc:点击用户的头像进入用户的主页
   */
  homePage: function (e) {
    console.log("帖友id=" + e.target.dataset.friendid);
    //跳转到用户的主页
    wx.navigateTo({
      url: '../../../pages/homePage/homePage?friendid=' + e.target.dataset.friendid
    })
  },
  /**
   * @desc：点击更多的图标触发的函数
   */
  mores:function(e){
    var that = this,
        copyContent = e.target.dataset.copycontent,
        otherBlogId = e.target.dataset.topicid;
    wx:wx.showActionSheet({
      itemList: ['点赞','举报','复制'],
      itemColor: '#000',
      success: function(res) {
        console.log(res.tapIndex);
        if (res.tapIndex == '0'){
          console.log("点赞");
          that.giveALikeMethdss(otherBlogId);//执行点赞的方法
        }else if (res.tapIndex == '1'){
          console.log("举报");
          that.toReport();//点击举报触发的函数
        } else if (res.tapIndex == '2'){
          that.copyFunc(copyContent);//复制触发的函数
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * @desc:点击复制触发的函数
   * @param:[copyContent]复制的内容
   */
  copyFunc: function (copyContent){
    //调用微信的复制的数据
    wx.setClipboardData({
      data: copyContent,
      success: function (res) {
        abstac.promptBox("复制成功！");
      }
    });
  },
  /**
   * @desc:点击举报触发的函数
   */
  toReport:function(){
    var that = this;
    wx:wx.showActionSheet({
      itemList: ['骚扰信息', '色情相关', '资料不当', '盗用他人资料', '垃圾广告'],
      itemColor: '#000',
      success:res => {
        let contents = res.tapIndex;
        if (contents == '0'){
          contents = '骚扰信息';
        } else if (contents == '1'){
          contents = '色情相关';
        } else if (contents == '2') {
          contents = '资料不当';
        } else if (contents == '3') {
          contents = '盗用他人资料';
        } else if (contents == '4') {
          contents = '垃圾广告';
        }
        //打印日志
        console.log("content=" + contents + '&report_user_id=' + that.data.quoteId + "&topic_id=" + that.data.blogId + "&wx_session_key=" + that.data.wxSessionKey+"&type=2");
        /**
         * @desc:调用举报的接口
         */
        abstac.sms_Interface(app.publicVariable.toReportInterfaceAddress,
          { content: contents, report_user_id: that.data.quoteId, topic_id: that.data.blogId, wx_session_key: that.data.wxSessionKey, type:'2'},
        function(res){//举报成功
          console.log("********************举报接口返回数据***********************");
          console.log(res);
          if (res.data.result.code == '2000'){
            abstac.promptBox("举报成功！");
          }else{
            abstac.promptBox("举报失败！");
          }
        },
        function(error){//举报失败
          console.log(res);
        });
      }
    })
  },
  /**
   * @desc：点赞执行的方法
   * @note：新增加的代码
   * @date：20190606
   * @param:id：帖子id、wx_session_key：微信的code值、op：cancel 取消点赞是传递 点赞则不传op这个参数
   */
  giveALikeMethdss:function(replyIds){
    //打印参数的日志
    console.log("id=" + replyIds + "&wx_session_key=" + this.data.wxSessionKey);
    abstac.sms_Interface(app.publicVariable.likeInterfaceAddress, 
      { id: replyIds, wx_session_key: this.data.wxSessionKey },
    function (res) {//点赞成功
      console.log("********点赞评论的接口返回的数据**************");
      console.log(res);
      if (res.data.result.code == '2000') {
        abstac.promptBox("点赞成功！");
      } else {
        abstac.promptBox(res.data.result.message);
      }
    },
    function (error) {//点赞失败
      console.log(error);
    });
  },
  giveALikeMethd: function (){
    //打印参数的日志
    console.log("id=" + this.data.blogId + "&wx_session_key=" + this.data.wxSessionKey);
    /**
     * @desc:调用举报的接口
     */
    var likesParms = '',
        that = this;
    /*判断是点赞还是取消点赞的参数传递*/
    if (this.data.likeFlag == '0'){//点赞传的参数
      likesParms = { id: this.data.blogId, wx_session_key: this.data.wxSessionKey}
    } else if (this.data.likeFlag == '1') {//取消点赞传的参数
      likesParms = { id: this.data.blogId, wx_session_key: this.data.wxSessionKey, op:'cancel' }
    }
    abstac.sms_Interface(app.publicVariable.likeInterfaceAddress, likesParms,
    function(res){//点赞成功
      console.log("********点赞接口返回的数据**************");
      console.log(res);
      if(res.data.result.code == '2000'){
        if (that.data.likeFlag == '0') {//点赞传的参数
          abstac.promptBox("点赞成功！");
          that.setData({
            likeFlag:'1',
            dynamicLikedPicSrc: "../../../static/liked.png"
          });
        } else if (that.data.likeFlag == '1') {//取消点赞传的参数
          abstac.promptBox("取消点赞");
          that.setData({
            likeFlag: '0',
            dynamicLikedPicSrc: "../../../static/like.png"
          });
        }
        that.getBlogDetail();
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },
    function (error) {//点赞失败
      console.log(error);
    });
  },
  /**
   * @desc:增加图片按钮实现隐藏和显示的效果
   */
  addImages:function(){
    //实现隐藏和显示的效果
    let that = this,
        thumbnailShowss = that.data.thumbnailShow;
    this.setData({
      thumbnailShow: !thumbnailShowss
    });
  },
  /**
   * @desc:点击相片的图标触发的函数
   */
  choosePhotos: function () {
    var that = this,
        picArrLength = this.data.chooseImgSrc.length + 1;
    console.log(picArrLength);
    if (picArrLength <= '2'){
      wx.chooseImage({
        count: 2,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          //将所有的图片路径放在对象里面
          src_array = src_array.concat(res.tempFilePaths);
          that.setData({
            chooseImgSrc: src_array,
            imgDisplay: 'block'
          });
          //调用图片上传的接口
          var tempFilePaths = res.tempFilePaths
          that.uploadFile(tempFilePaths);
        },
      });
    }else{
      abstac.promptBox('最多选择两张图片！');
    }
    this.setData({
      sendsOrHiden:'block',
      showHiden:'none'
    });
  },
  /**
   *  @desc：调用图片上传服务器的地址
   */
  uploadFile: function (tempFilePaths) {
    let that = this,
      platformS = abstac.mobilePhoneModels(this.data.platform),
      file_category = '2';
      //将图片的路径上传服务器的地址
      wx.uploadFile({
        url: app.publicVariable.fileUploadPicInterfaceAddress + '?file_category=' + file_category + '&wx_session_key=' + that.data.wxSessionKey + '&platform=' + platformS,
        filePath: tempFilePaths[0],
        name: 'file',
        success: res => {
          console.log("****************上传图片的接口返回函数***************");
          console.log(res);
          if (res.statusCode == '200') {
            var dataResult = res;
            dataResult.data = JSON.parse(dataResult.data);
            //src_array = src_array.concat(res.tempFilePaths);
            that.setData({
              interfaceData: src_array1.push(res.data.data.urls.origin),
              imgDisplay: 'block'
            });
            that.setData({
              interfaceData: src_array1
            });
          } else {

          }
        }
      })
  },
  /**
   * @desc:删除预览图片
   */
  delPic: function (e) {
    console.log(e.currentTarget.dataset.ids);
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
    //动态显示发送
    if (imgArr.length == '0'){
      this.setData({
        sendsOrHiden: 'none',
        showHiden:'block'
      });
    }else{
      this.setData({
        sendsOrHiden: 'block',
        showHiden: 'none'
      });
    }
  },
  /**
   * @desc:点击回复的图片预览大图的效果
   */
  largerPreview:function(event){
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    });
  },
  /**
   * @desc:正文图片预览大图的效果
   */
  largerPreview1: function (e) {
    var imgList = e.currentTarget.dataset.list;//获取data-list
    var index = e.currentTarget.dataset.index;
    var cc = [];
    for (var j = 0; j < imgList.length; j++){
      cc.push(imgList[j].url);
    }
    //图片预览
    wx.previewImage({
      current: cc[index], // 当前显示图片的http链接
      urls: cc // 需要预览的图片http链接列表
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
  onPullDownRefresh: function () {
    this.getBlogDetail();
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    //调用后台分享的接口
    this.shareInterfaces();
    if(res.form === 'menu'){
      console.log(res.target, res);
    }
    return {
      title: this.data.content.title,
      path: '/pages/index/index?come=share&blogId=' + this.data.blogId,
      imageUrl:'https://wx.qlogo.cn/mmhead/Q3auHgzwzM4INibMaWvVambKxpcRkq8IIlF89NiaORtZicQPW2icEDtcUg/0',
      success: function (res) {
        console.log(res);
      },
      fail: function (error) {
        console.log(error);
      }
    }
  },
  /**
   * 调用后台分享的接口
   */
  shareInterfaces:function(){
    var that = this;
    abstac.sms_Interface(app.publicVariable.shareInterfaceAddress,
      { topic_id: that.data.blogId, wx_session_key: that.data.wxSessionKey },
      function (res) {//成功
        console.log("********分享后调用接口返回的数据**************");
        console.log(res);
      },
      function (error) {//失败
        console.log(error);
      });
  }
})