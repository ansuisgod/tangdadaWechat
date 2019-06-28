// pages/my/add_diet/add_diet.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp(),
  session_key = wx.getStorageSync('sessionKey');


Page({

  /**
   * 页面的初始数据
   */
  data: {

    foodCategoryList: '', //大分类列表



    curNav: 0,
    curIndex: 0,




    // 测试数据
    testData: [
      {
        name: "早餐", num: "0", img: "https://fakeimg.pl/200x100/?retina=1&text=占位图&font=noto"
      },
      {
        name: "上午加餐", num: "0", img: "https://fakeimg.pl/200x100/?retina=1&text=占位图&font=noto"
      },
      {
        name: "中餐", num: "1", img: "https://fakeimg.pl/200x100/?retina=1&text=占位图&font=noto"
      },
      {
        name: "下午加餐", num: "0", img: "https://fakeimg.pl/200x100/?retina=1&text=占位图&font=noto"
      },
      {
        name: "晚餐", num: "0", img: "https://fakeimg.pl/200x100/?retina=1&text=占位图&font=noto"
      },
      {
        name: "夜宵", num: "0", img: "https://fakeimg.pl/200x100/?retina=1&text=占位图&font=noto"
      },
    ],

    addFoodsList: [], //选中的食物

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 处理显示消除，重新拉取数据
    let addFoodsList = wx.getStorageSync('foodsList')
    this.setData({
      addFoodsList: addFoodsList,
    })
  },







  /**
* @desc:获取我的饮食记录大分类的接口
* @date:2019.06.10
* @auther:li
*/
  foodCategoryList: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    abstac.sms_Interface(app.publicVariable.foodCategoryInterfaceAddress,
      { platform: platform },
      function (res) {//查询成功
        //打印日志
        console.log("****************饮食大分类列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data.food_groups;
          that.setData({
            foodCategoryList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },












  // 左侧按钮

  left: function (e) {

    var that = this;

    var index = e.currentTarget.dataset.index;

    console.log(index, "左侧按钮")

    that.setData({

      curNav: index,

      curIndex: index,

    })

  },


  
  del: function (e) {
    var that = this;
    console.log(e)

    // 点击删除缓存数组

    app.deleteFoodsList(e.currentTarget.dataset.info.id)
    let addFoodsList = wx.getStorageSync('foodsList')
    that.setData({
      addFoodsList: addFoodsList,
    })


  },
    // 以下為跳转业务

  goAdd: function (e) {  //跳转入跳转入饮食记录列表
    console.log(e.currentTarget.dataset.id)
    let toId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/my/add_diet_list/add_diet_list?id=' + toId,
    })
  },
  
  goAddFavorite: function () {  //跳转入跳转入饮食收藏列表
    wx.navigateTo({
      url: '/pages/my/favoriteFood/favoriteFood',
    })
  },

  goDetails: function () {  //跳转入跳转入饮食记录详情
    var that = this;
    let infos = that.data.addFoodsList;

    let idsList = []
    for (var k = 0; k < infos.length; k++) {
      var infosIds = infos[k];
      idsList.push(infosIds.id)
    }
    let ids = idsList.join(',')
    console.log(ids)

    wx.navigateTo({
      url: '/pages/my/add_diet_Details/add_diet_Details?ids=' + ids,
    })
  },

  goAdds: function () {  //跳转入饮食搜索列表
    wx.navigateTo({
      url: '/pages/my/searchFood/searchFood',
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
    var that = this;
    // 处理显示消除，重新拉取数据
    let addFoodsList = wx.getStorageSync('foodsList')
    this.setData({
      addFoodsList: addFoodsList,
    })

    that.foodCategoryList()
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