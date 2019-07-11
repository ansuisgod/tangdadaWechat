// pages/blog/blog.js
import { $wuxButton } from '../../components/wux'
var abstac = require('../../commonmethod/abstract.js'),
    app = getApp(),
    size = '30',
    arry = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    conArr:[],
    page:'1',
    // types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    index: 3,
    opened: !1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      platform: app.globalData.platform,
      navH: app.globalData.navHeight,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    this.getBlogData();
    this.initButton();
  },
  /**
   * @desc:向后台请求帖子的数据信息
   * @param：无
   */
  getBlogData:function(){
    let platform = abstac.mobilePhoneModels(this.data.platform),//手机型号
        that = this;
    //打印日志
    console.log("页数=" + this.data.page + "&手机型号=" + platform + "&一页请求个数=" + size + "&tag_id=0&session_key=" + this.data.wxSessionKey);
    //访问网络
    abstac.promptBox("数据加载中...");
    abstac.sms_Interface(app.publicVariable.blogInterfaceAddress, {
      page: this.data.page, platform: platform, size: size, tag_id: '0', wx_session_key: this.data.wxSessionKey
    },
      function (res) {
        console.log("****************帖子列表返回的数据口成功时返回函数***************");
        console.log(res.data);
        //判断是否有数据，有则取数据  
        if (res.data.result.code == '2000') {
          /**
           * 将后台返回的数据中的summary字符串转化为json格式
           */
          var str = res.data.data.topics;
          for (var i = 0; i <= str.length - 1; i++) {
            str[i].summary = JSON.parse(str[i].summary);
          }
          /**
           * 将后台的数据放到数组中
           */
          var datas = res.data.data.topics;
          var newList = that.data.conArr;
          var totalPage = res.data.pages;//数据的总页数
          /**
           * 判断当前的页数是否超过了总页数
           */
          if (that.data.page == 1){
            newList = datas;
            that.setData({
              conArr: datas,
            });
          }else if (that.data.page > totalPage){
            abstac.promptBox("没有数据了！");
            that.data.page = 1;
          }else{
            abstac.promptBox("加载中...");
            that.setData({
              conArr: newList.concat(datas),
              page: that.data.page,
              totalPage: res.data.pages
            });
          }
          that.data.page++;
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {
        abstac.promptBox(error.errMsg);
        console.log(error);
      });
  },
  /**
   * @desc:点击进入文章的详情页面
   */
  clickIntoDetail:function(e){
    console.log("文章的id主键=" + e.currentTarget.dataset.articlid);//打印日志
    //跳转到帖子的详情页面
    wx.navigateTo({
      url: '../../../blogDetail/blogDetail?blogId=' + e.currentTarget.dataset.articlid
    })
  },
  /**
   * 点击搜索触发的函数
   */
  search:function(){
    //跳转到搜索
    wx.navigateTo({
      url: '../../../search/search'
    })
  },
  /**
   * @desc:点击用户的头像进入用户的主页
   */
  homePage:function(e){
    console.log("帖友id=" + e.target.dataset.friendid);
    //跳转到用户的主页
    wx.navigateTo({
      url: '../homePage/homePage?friendid=' + e.target.dataset.friendid
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
  onPullDownRefresh: function () {
    this.getBlogData();
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底事件的处理函数,页数" + this.data.page);
    //判断是否超过了总页数，如果超过了则没有下一页，否则还有下一页的数据
    if (this.data.totalPage < this.data.page) {
      abstac.promptBox("没有数据了！");
      return;
    } else {
      this.getBlogData();
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
          url: '/pages/blog/release/release'
        })

        index === 1 && wx.navigateTo({
          url: '/pages/blog/sendVideo/sendVideo?flags=1'
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