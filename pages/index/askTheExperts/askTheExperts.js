// pages/index/askTheExperts/askTheExperts.js
//创建audio控件
const myaudio = wx.createInnerAudioContext();
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp(),
    version = '1',
    tag_id = '25',
    sizes = '20';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:'',
    pages:'1',
    searchContent:'',
    //音频列表
    audioArr: [
      {
        id: '000',
        src: 'http://vd3.bdstatic.com/mda-ic7mxzt5cvz6f4y5/mda-ic7mxzt5cvz6f4y5.mp3',
        time: '1:20"',
        isplay: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.askExports();
  },
  /**
   * @desc：搜索输入框获取到焦点触发的函数
   */
  searchBoxFocus:function(){
    wx.navigateTo({
      url: '../../../pages/blog/search/search'
    })
  },
  /**
   * @desc：默认显示的信息
   * @parm:platform[判断是什么系统]、size【数据数量】、wx_session_key【微信code值】、page【页数】、version【版本号】、tag_id【类型id】
   */
  askExports:function(){
    var platform = abstac.mobilePhoneModels(this.data.platform),
        that = this;
    //参数打印日志
    console.log("platform=" + platform + "&size=" + sizes + "&wx_session_key=" + this.data.wxSessionKey + "&page=" + this.data.pages + "&version=" + version + "&tag_id=" + tag_id);
    abstac.promptBox("数据加载中...");
    abstac.sms_Interface(app.publicVariable.blogInterfaceAddress,
      { platform: platform, size: sizes, wx_session_key: this.data.wxSessionKey, page: this.data.pages, version: version, tag_id: tag_id},
    function(res){
      console.log("****************问专家默认信息接口成功时返回函数***************");
      console.log(res);
      //判断是否有数据，有则取数据  
      if (res.data.result.code == '2000'){
        /**
           * 判断当前的页数是否超过了总页数
           */
        var totalPage = res.data.data.pages,//数据的总页数
            datas = res.data.data.topics,
            newList = that.data.dataList;
        if (that.data.pages == '1') {
          newList = datas;
          that.setData({
            dataList: datas,
          });
        } else if (that.data.pages > totalPage) {
          abstac.promptBox("没有数据了！");
          that.data.pages = 1;
          return;
        } else {
          abstac.promptBox("加载中...");
          that.setData({
            dataList: newList.concat(datas),
            pages: that.data.pages,
            totalPage: res.data.data.pages
          });
        }
        that.data.pages++;
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },function(error){
      console.log(res);
    });
  },
  /**
   * @desc：点击提问跳转到发布页面
   */
  askQuestions:function(){
    wx.navigateTo({
      url: '../../../pages/blog/release/release'
    })
  },
  /**
   * @desc:音频播放
   */
  play:function(e){
    var that = this,
      id = e.currentTarget.dataset.id,
      key = e.currentTarget.dataset.key,
      audioArr = that.data.audioArr,
      vidSrc = audioArr[key].src;
    myaudio.src = vidSrc;
    myaudio.autoplay = true;
    //切换显示状态
    for (var i = 0; i < audioArr.length; i++) {
      audioArr[i].isplay = false;
    }
    var isplay = 'audioArr[' + key + '].isplay'//必须把数组变成字符串
    this.setData({
      [isplay]: true
    })
    //开始监听
    myaudio.onPlay(() => {
      that.setData({
        audioArr: audioArr
      })
    })
    //结束监听
    myaudio.onEnded(() => {
      audioArr[key].isplay = false;
      that.setData({
        audioArr: audioArr,
      })
    })
  
  },
   /**
   * @desc:音频播放停止
   */
  stop:function(e){
    var that = this,
      id = e.currentTarget.dataset.id,
      key = e.currentTarget.dataset.key,
      audioArr = that.data.audioArr,
      vidSrc = audioArr[key].src;
    myaudio.src = vidSrc;
    //切换显示状态
    for (var i = 0; i < audioArr.length; i++) {
      audioArr[i].isplay = false;
    }
    audioArr[key].isplay = false;
    myaudio.stop();
    //停止监听
    myaudio.onStop(() => {
      audioArr[key].isplay = false;
      that.setData({
        audioArr: audioArr,
      })
    })
    //结束监听
    myaudio.onEnded(() => {
      audioArr[key].isplay = false;
      that.setData({
        audioArr: audioArr,
      })
    })
  },
  /**
   * 点击推荐专家按钮触发函数
   */
  expertsRecommend: function () {
    wx.navigateTo({
      url: '../../../pages/index/expertsRecommend/expertsRecommend'
    })
  },
  /**
   * @desc:专家回复
   */
  askTheExperts:function(e){
    wx.navigateTo({
      url: '../../../pages/index/expertsReply/expertsReply?replyAtircalId=' + e.currentTarget.dataset.ids
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
    this.askExports();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底事件的处理函数,页数" + this.data.pages);
    //判断是否超过了总页数，如果超过了则没有下一页，否则还有下一页的数据
    if (this.data.totalPage < this.data.pages) {
      abstac.promptBox("没有数据了！");
      return;
    } else {
      this.askExports();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})