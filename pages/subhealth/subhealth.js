// pages/index/task/task.js
import { $wuxButton } from '../../components/wux'
var app = getApp(),
    abstac = require('../../commonmethod/abstract.js'),
    sizes = '20',
    mtabW = '',
    tagIdx = '97';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["肥胖", "女性健康","康复理疗"],
    activeIndex: 0,
    slideOffset: 0,
    tabW: 0,
    pages: '1',
    imgSrcs: '',
    obesity:'',//肥胖的数据标签
    womensHealth:'',//女性健康数据标签
    rehabilitationTherapy: '',//康复理疗数据标签
    // types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    index: 3,
    opened: !1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mtabW = app.globalData.mtabW / 3.5;
    this.setData({
      tabW: mtabW,
      platform: app.globalData.platform,
      navH: app.globalData.navHeight,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    /*进入页面分别加载完三个标签的默认数据*/
    this.getDataInfo('97');//调用亚健康下面的肥胖类型的数据接口方法
    this.getDataInfo('98');//调用亚健康下面的女性健康类型的数据接口方法
    this.getDataInfo('99');//调用亚健康下面的康复理疗类型的数据接口方法
    this.initButton();
  },
  /**
   * @func：getDataInfoMore()
   * @desc:调用加载下一页数据接口的方法
   * @param:page[页数]、platform【设备id】、size【请求数据的数量】、tag_id【类型id】、wx_session_key【微信的code值】
   */
  getDataInfoMore: function (tagIdx) {
    var that = this;
    //打印参数日志
    console.log('page=' + this.data.pages + '&platform=' + abstac.mobilePhoneModels(this.data.platform) + '&size=' + sizes + '&wx_session_key=' + this.data.wxSessionKey);
    abstac.promptBox("数据加载中...");
    abstac.sms_Interface(app.publicVariable.blogInterfaceAddress,
      { page: this.data.pages, platform: abstac.mobilePhoneModels(this.data.platform), size: sizes, tag_id: tagIdx, wx_session_key: this.data.wxSessionKey},
    function(res){
      console.log("****************亚健康滚动加载更多时接口成功时返回函数***************");
      console.log(res);
      if (res.data.result.code == '2000'){
        var strs = res.data.data.topics;
        for (var i = 0; i < strs.length; i++) {
          strs[i].summary = JSON.parse(strs[i].summary);
        }
        var totalPage = res.data.data.pages,//数据的总页数
            datas = res.data.data.topics,
            obesityBox = that.data.obesity,
            womensHealthBox = that.data.womensHealth,
            rehabilitationTherapyBox = that.data.rehabilitationTherapy;
        //实现滚动加载下一页的数据
        if (that.data.pages == 1){
          obesityBox = datas;
          womensHealthBox = datas;
          rehabilitationTherapyBox = datas;
          if (tagIdx == '97') {
            that.setData({
              obesity: res.data.data.topics
            });
          } else if (tagIdx == '98') {
            that.setData({
              womensHealth: res.data.data.topics
            });
          } else if (tagIdx == '99') {
            that.setData({
              rehabilitationTherapy: res.data.data.topics
            });
          }
        } else if (that.data.pages > totalPage){
          abstac.promptBox("没有数据了！");
          that.data.pages = 1;
          return;
        }else{
          if (tagIdx == '97') {
            that.setData({
              obesity: obesityBox.concat(datas),
              pages: that.data.pages,
              totalPage: res.data.data.pages
            });
          } else if (tagIdx == '98') {
            that.setData({
              womensHealth: womensHealthBox.concat(datas),
              pages: that.data.pages,
              totalPage: res.data.data.pages
            });
          } else if (tagIdx == '99') {
            that.setData({
              rehabilitationTherapy: rehabilitationTherapyBox.concat(datas),
              pages: that.data.pages,
              totalPage: res.data.data.pages
            });
          }
        }
        that.data.pages++;
      }else{
        abstac.promptBox(res.data.result.message);
      }
    },function(error){
      console.log(error);
    });
  },
  /**
   * @func：getDataInfo()
   * @desc:默认进入页面加载数据的方法
   * @param:page[页数]、platform【设备id】、size【请求数据的数量】、tag_id【类型id】、wx_session_key【微信的code值】
   */
  getDataInfo: function (tagIdx){
    var that = this;
    //打印参数日志
    console.log('page=' + this.data.pages + '&platform=' + abstac.mobilePhoneModels(this.data.platform) + '&size=' + sizes + '&wx_session_key=' + this.data.wxSessionKey);
    abstac.sms_Interface(app.publicVariable.blogInterfaceAddress,
      { page: this.data.pages, platform: abstac.mobilePhoneModels(this.data.platform), size: sizes, tag_id: tagIdx, wx_session_key: this.data.wxSessionKey },
      function (res) {
        console.log("****************亚健康接口成功时返回函数***************");
        console.log(res);
        if (res.data.result.code == '2000') {
          var strs = res.data.data.topics;
          for (var i = 0; i < strs.length; i++) {
            strs[i].summary = JSON.parse(strs[i].summary);
          }
          if (tagIdx == '97') {
            that.setData({
              obesity: res.data.data.topics
            });
          } 
          if (tagIdx == '98') {
            that.setData({
              womensHealth: res.data.data.topics
            });
          } 
          if (tagIdx == '99') {
            that.setData({
              rehabilitationTherapy: res.data.data.topics
            });
          }
        } else if (res.data.result.code == '4000') {//如果出现用户会话过期就跳转到登录页面让用户重新登录
          wx.navigateTo({
            url: '/pages/login/login'
          });
        }else {
          abstac.promptBox(res.data.result.message);
        }
      }, function (error) {
        console.log(error);
      });
  },
  /**
   * @func：tabClick()
   * @desc:tab的切换
   */
  tabClick: function (e) {
    var that = this;
    var idIndex = e.currentTarget.id;
    var offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离
    console.log(idIndex);
    this.setData({
      activeIndex: idIndex,
      slideOffset: offsetW
    });
  },
  bindChange: function (e) {
    var current = e.detail.current;
    if ((current + 1) % 4 == 0) {}
    var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });
  },
  /**
   * @func：goDetailInfo()
   * @desc:进入详情的方法
   * @param:blogId【帖子的id用于查询帖子的详情信息】
   */
  goDetailInfo:function(e){
    //跳转到帖子的详情页面
    wx.navigateTo({
      url: '../../pages/blog/blogDetail/blogDetail?blogId=' + e.currentTarget.dataset.articlid
    })
  },
  /**
   * @desc:点击搜索的图标
   */
  search:function(){
    wx.navigateTo({
      url: '../../pages/blog/search/search'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDataInfo('97');//调用亚健康下面的肥胖类型的数据接口方法
    this.getDataInfo('98');//调用亚健康下面的女性健康类型的数据接口方法
    this.getDataInfo('99');//调用亚健康下面的康复理疗类型的数据接口方法
  },
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
    if (this.data.activeIndex == '0') {
      this.getDataInfoMore('97');
    } else if (this.data.activeIndex == '1') {
      this.getDataInfoMore('98');
    } else if (this.data.activeIndex == '2') {
      this.getDataInfoMore('99');
    }
    wx.stopPullDownRefresh();
  },
  /**
   * @func:onReachBottom()
   * @desc:页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底事件的处理函数,页数" + this.data.pages);
    //判断是否超过了总页数，如果超过了则没有下一页，否则还有下一页的数据
    if (this.data.totalPage < this.data.pages) {
      abstac.promptBox("没有数据了！");
      return;
    } else {
      if (this.data.activeIndex == '0') {
        this.getDataInfoMore('97');
      } else if (this.data.activeIndex == '1') {
        this.getDataInfoMore('98');
      } else if (this.data.activeIndex == '2') {
        this.getDataInfoMore('99');
      }
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  /**
  * @desc:悬浮的按钮动画的效果隐藏和显示菜单
  * @date：20190704
  */
  initButton(position = 'bottomRight') {
    this.setData({
      opened: !1,
    })
    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '发图文',
          icon: "http://pic.51yuansu.com/pic2/cover/00/36/41/5811d43c85d48_610.jpg",
        },
        {
          label: '发视频',
          icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562236755743&di=15a335a3203646dfbe5faf2b3dcdd19a&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F14%2F63%2F59043def1e433_610.jpg",
        }
      ],
      buttonClicked(index, item) {
        index === 0 && wx.navigateTo({
          url: '/pages/blog/releaseTag/releaseTag'
        })

        index === 1 && wx.navigateTo({
          url: '/pages/blog/sendVideo/sendVideo?flags=2'
        })
        return true
      },
      callback(vm, opened) {
        vm.setData({
          opened,
        })
      },
    })
  }
})