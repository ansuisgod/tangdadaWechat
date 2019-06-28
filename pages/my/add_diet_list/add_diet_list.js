// pages/my/add_diet_list/add_diet_list.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp(),
  session_key = wx.getStorageSync('sessionKey');

Page({

  /**
   * 页面的初始数据
   */
  data: {

    is_vote: 0,

    size: '20', //每页的数据条数
    page: '1', //页数
    foodList: '', //小分类列表

    food_group_id: '', //分类id

    addFoodsList: [], //选中的食物


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      platform: app.globalData.platform,
      food_group_id: options.id,
    });
    that.foodList()


    // 处理显示消除，重新拉取数据
    let addFoodsList = wx.getStorageSync('foodsList')
    this.setData({
      addFoodsList: addFoodsList,
    })

  },






  /**
   * @desc:获取我的饮食小分类列表的接口
   * @date:2019.06.10
   * @auther:li
   */
  foodList: function() {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform); //手机型号

    abstac.sms_Interface(app.publicVariable.foodListInterfaceAddress, {
        platform: platform,
        food_group_id: that.data.food_group_id,
        size: that.data.size,
        page: that.data.page
      },
      function(res) { //查询成功
        //打印日志
        console.log("****************我的饮食小分类列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data.foods;

          for (let u = 0; u < data.length; u++) {
            var dataOld = data[u];
            dataOld.sureid = false
          }


          for (let j = 0; j < that.data.addFoodsList.length; j++) {
            var FoodsList = that.data.addFoodsList[j];

            for (let i = 0; i < data.length; i++) {
              var dataList = data[i];
              if (FoodsList.id == dataList.id) {
                dataList.sureid = true
                console.log('1212121212121212')
              }
            }

          };


          that.setData({
            foodList: data,
          });


        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function(error) { //查询失败
        console.log(error);
      });
  },







  /**
  * @desc:点击选中事件
  * @date:2019.06.10
  * @auther:li
  */
  addFood: function (e) {
    var that = this;

    console.log(e)
    // 处理点击状态
    let list = that.data.foodList;
    console.log(e.currentTarget.dataset.item.id)
    let chooseId = e.currentTarget.dataset.item.id; //当前点击元素的自定义数据，这个很关键
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == chooseId) {
        list[i].sureid = !list[i].sureid
      }
    };


    // 点击添加入缓存数组中
    if (e.currentTarget.dataset.item.sureid == false) {
      let bok = true;
      if (that.data.addFoodsList.length == '') {
        app.addFoodsList(e.currentTarget.dataset.item)
        let addFoodsList = wx.getStorageSync('foodsList')
        that.setData({
          addFoodsList: addFoodsList,
        })
      } else {
        for (let j = 0; j < that.data.addFoodsList.length; j++) {
          var addFoods = that.data.addFoodsList[j]
          if (bok) {  //约束只能执行一次
            if (addFoods.id != e.currentTarget.dataset.item.id) {
              app.addFoodsList(e.currentTarget.dataset.item)
              bok = false
              let addFoodsList = wx.getStorageSync('foodsList')
              that.setData({
                addFoodsList: addFoodsList,
              })
            }
          }
        }
      }

    }

    // 点击删除缓存数组
    if (e.currentTarget.dataset.item.sureid == true) {
      app.deleteFoodsList(e.currentTarget.dataset.item.id)
      let addFoodsList = wx.getStorageSync('foodsList')
      that.setData({
        addFoodsList: addFoodsList,
      })
    }


    this.setData({
      foodList: list,
      // addFoodsList: addFoodsList,
    })


  },

  // ////////////////////////////

  del: function (e) {
    var that = this;
    console.log(e)

    // 点击删除缓存数组

    app.deleteFoodsList(e.currentTarget.dataset.info.id)
    let addFoodsList = wx.getStorageSync('foodsList')
    that.setData({
      addFoodsList: addFoodsList,
    })


    // 处理点击状态
    let list = that.data.foodList;
    let chooseId = e.currentTarget.dataset.info.id; //当前点击元素的自定义数据，这个很关键
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == chooseId) {
        list[i].sureid = false
      }
    };
    that.setData({
      foodList: list,
    })

  },





  // ///////////-=-=-=-

  //合并多个数组，去重  
  concat: function(arr1, arr2, arr3) {
    if (arguments.length <= 1) {
      return false;
    }
    var concat_ = function(arr1, arr2) {
      var arr = arr1.concat();
      for (var i = 0; i < arr2.length; i++) {
        arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
      }
      return arr;
    }
    var result = concat_(arr1, arr2);
    for (var i = 2; i < arguments.length; i++) {
      result = concat_(result, arguments[i]);
    }
    return result;
  },

  //去除重复数组对象
  deteleObject: function(obj) {
    // console.log(obj)
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
      var keys = Object.keys(obj[i]);
      keys.sort(function(a, b) {
        return (Number(a) - Number(b));
      });
      var str = '';
      for (var j = 0; j < keys.length; j++) {
        str += JSON.stringify(keys[j]);
        str += JSON.stringify(obj[i][keys[j]]);
      }
      if (!stringify.hasOwnProperty(str)) {
        uniques.push(obj[i]);
        stringify[str] = true;
      }
    }

    app.uniques = uniques
    return uniques
    return uniques.length;
  },


  // ///////////-=-=-=-

  // 以下為跳转业务
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})