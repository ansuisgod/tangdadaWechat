// pages/blog/search/search.js
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp(),
    version = '1',
    tag_ids = '25',
    sizes = '4';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',//输入框的值
    pages:'1',
    searchDataAskQuestion:'',//搜索的问答部分
    searchDataTopics:'',
    gender:'0',
    city:'0',
    searchFriend:'',
    moreF:'block',
    showAsking:'none',
    showBlogg:'none',
    showFriend: 'none',
    friendTitle:'none'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.queryUserInformation();//查询用户的信息接口
  },
  /**
   * @desc：查询用户的信息接口用于搜索好友的时候需要
   * @parm:platform[判断是什么系统]、wx_session_key【微信code值】
   */
  queryUserInformation:function(){
    let platForm = abstac.mobilePhoneModels(this.data.platform),//手机型号
        that = this;
    abstac.sms_Interface(app.publicVariable.queryUserInformationInterfaceAddress,
      { platform: platForm, wx_session_key: this.data.wxSessionKey},
    function(res){
      //打印日志
      console.log("*********查询用户信息的接口返回的数据****************");
      console.log(res);
      if (res.data.result.code == '2000'){
        that.setData({
          gender: res.data.data.gender
        });
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },function(error){
      console.log(error);
    });
  },
  /**
   * @desc：搜索输入框点击确认键触发的函数
   * @parm:platform[判断是什么系统]、size【数据数量】、wx_session_key【微信code值】、page【页数】、keyword【搜索的内容】、tag_id
   */
  searchInputBoxConfirm: function(e) {
    console.log("keyword=" + e.detail.value.length);
    //判断搜索的内容是否为空
    if (e.detail.value.length == 0){
      this.setData({
        showAsking: 'none',
        showBlogg: 'none',
        showFriend: 'none'
      });
      return;
    }else{
      let platform = abstac.mobilePhoneModels(this.data.platform),//手机型号
        that = this;
      abstac.sms_Interface(app.publicVariable.searchArticalInterfaceAddress,
        { platform: platform, size: sizes, wx_session_key: this.data.wxSessionKey, page: this.data.pages, keyword: e.detail.value, tag_id: tag_ids },
        function (res) {
          //打印日志
          console.log("*********搜索接口返回的数据*****************");
          console.log(res);
          //有则取数据
          if (res.data.result.code == '2000') {
            if (res.data.data.topics == undefined) {
              that.setData({
                showAsking: 'none'
              });
              return;
            } else {
              var exchangeContents = res.data.data.topics;
              for (var i = 0; i < exchangeContents.length; i++) {
                exchangeContents[i].summary = JSON.parse(exchangeContents[i].summary);
              }
              //是否显示更多按钮
              if (exchangeContents.length > 3) {
                that.setData({
                  moreAsk: 'block'
                });
              } else {
                that.setData({
                  moreAsk: 'none'
                });
              }
              that.setData({
                searchDataTopics: exchangeContents,
                showAsking: 'block'
              });
            }
          } else {
            abstac.promptBox(res.data.result.message);
          }
        }, function (error) {
          console.log(error);
        });
      this.setData({
        searchValue: e.detail.value
      });
      this.searchBlogg();//搜索帖子的函数
    }
  },
  /**
   * @desc：搜索帖子的函数
   * @parm:platform[判断是什么系统]、size【数据数量】、wx_session_key【微信code值】、page【页数】、keyword【搜索的内容】
   */
  searchBlogg:function(){
    let platforms = abstac.mobilePhoneModels(this.data.platform),//手机型号
        that = this;
    abstac.sms_Interface(app.publicVariable.searchArticalInterfaceAddress,
      { platform: platforms, size: sizes, wx_session_key: this.data.wxSessionKey, page: this.data.pages, keyword: this.data.searchValue},
      function (res) {
        //打印日志
        console.log("*********搜索帖子的接口返回的数据*****************");
        console.log(res);
        //有则取数据
        if (res.data.result.code == '2000') {
          if (res.data.data.topics == undefined) {
            abstac.promptBox("没有搜索到数据信息");
            that.setData({
              showBlogg: 'none'
            });
            return;
          } else {
            var exchangeContents = res.data.data.topics;
            for (var i = 0; i < exchangeContents.length; i++) {
              exchangeContents[i].summary = JSON.parse(exchangeContents[i].summary);
            }
            //是否显示更多按钮
            if (exchangeContents.length > 3){
              that.setData({
                moreBlog: 'block'
              });
            }else{
              that.setData({
                moreBlog: 'none'
              });
            }
            that.setData({
              searchDataAskQuestion: exchangeContents,
              showBlogg:'block'
            });
          }
        } else {
          abstac.promptBox(res.data.result.message);
        }
      }, function (error) {
        console.log(error);
      });
      this.searchGoodFriend();//搜索好友函数
  },
  /**
   * @desc：搜索好友的接口
   * @parm:platform[判断是什么系统]、size【数据数量】、gender【性别代码】、city=0【城市】、wx_session_key【微信code值】、page=【页数】、keyword【搜索内容】
   * platform=&gender=0&city=0&size=&wx_session_key=&page=&keyword=
   */
  searchGoodFriend:function(){
    let platForms = abstac.mobilePhoneModels(this.data.platform),//手机型号
        that = this;
    abstac.sms_Interface(app.publicVariable.searchGoodFrendInterfaceAddress,
      { platform: platForms, size: sizes, gender: this.data.gender, city: this.data.city, wx_session_key: this.data.wxSessionKey, page: this.data.pages, keyword: this.data.searchValue},
    function(res){
      //打印日志
      console.log("*********搜索好友的接口返回的数据*****************");
      console.log(res);
      //有则取数据
      if (res.data.result.code == '2000'){
        if (res.data.data.users == undefined){
          that.setData({
            showFriend: 'none',
            friendTitle:'none'
          });
        }else{
          var userLength = res.data.data.users.length;
          //是否显示更多按钮
          if (userLength > '3') {
            that.setData({
              moreF: 'block'
            });
          } else if (userLength == '0'){
            that.setData({
              moreF: 'none',
              friendTitle: 'none'
            });
          }else {
            that.setData({
              moreF: 'none',
              friendTitle: 'block'
            });
          }
          that.setData({
            searchFriend: res.data.data.users,
            showFriend: 'block'
          });
        }
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },function(error){
      console.log(error);
    });
  },
  /**
   * @desc：输入框输入触发的函数
   */
  searchBox:function(e){
    this.setData({
      searchValue: e.detail.value
    });
  },
  /**
   * @desc:当搜索的好友超过了三条消息就显示更多，点击更多触发的函数
   */
  moreFriends:function(){
    wx.navigateTo({
      url: '../../../pages/blog/moreFriend/moreFriend?searchContent=' + this.data.searchValue + '&gender=' + this.data.gender + '&city=' + this.data.city
    })
  },
  /**
   * @desc:点击搜索出来的帖子进入详情页面
   */
  blogInfo: function (e) {
    wx.navigateTo({
      url: '../../../pages/blog/blogDetail/blogDetail?blogId=' + e.currentTarget.dataset.blogid
    })
  },
  /**
   * @desc:当搜索的帖子数量超过了三条消息就显示更多，点击更多触发的函数
   */
  searchMoreBlog: function () {
    wx.navigateTo({
      url: '../../../pages/blog/searchBlogMoreInfo/searchBlogMoreInfo?keyWords='+this.data.searchValue
    })
  },
  /**
   * @desc:点击搜索的好友列表触发的函数
   */
  friendInfo:function(e){
    console.log("frid=" + e.currentTarget.dataset.frid);
    wx.navigateTo({
      url: '../../../pages/homePage/homePage?friendid=' + e.currentTarget.dataset.frid
    })
  },
  /**
   * @desc:点击专家的跳转到详情页面
   */
  askExports:function(e){
    wx.navigateTo({
      url: '../../../pages/index/expertsReply/expertsReply?replyAtircalId=' + e.currentTarget.dataset.ids
    })
  },
  /**
   * @desc:当搜索的问答的数量超过了三条消息就显示更多，点击更多触发的函数
   */
  queryMoreAskInfo:function(){
    wx.navigateTo({
      url: '../../../pages/index/askList/askList?keyWords=' + this.data.searchValue
    })
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