// pages/my/add_diet_Details/add_diet_Details.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    myFoodList: [],  //食物列表
    currentTab: 0, //预设当前项的id值，也就是第一次进入页面显示第一个食物
    op: '', //点击收藏判断

    inputValue:1,



    windowHeight:'',
    winHeight: "",//窗口高度
    scrollLeft: 0, //tab标题的滚动条位置


    currentTabIndex:0,


    FoodInfoId:-1, //食物重量选择id
    FoodInfoname:'',
    // FoodYesNo:'',// 判断该食物是否收藏 0为未收藏

    
    myFoodIds:'',  //我的食物的id列表  
    foodArr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;


      let ids = options.ids
      var arr = ids.split(',');
      that.setData({
        myFoodIds: arr,
        wxSessionKey: wx.getStorageSync('sessionKey')
      });
    

    if (options.foodInfos != undefined) {   //点击修改进入携带的数据信息
      console.log('-=-=-===-=-=-=-=')
      that.setData({
        foodArr: JSON.parse(options.foodInfos)
      });
    }

    that.setData({
      // myFoodList: JSON.parse(options.myFoodList),
      platform: app.globalData.platform,
    })

    // that.setData({
    //   currentTab: that.data.myFoodList[0].id,
    // })

    wx.getSystemInfo({   //手机设备信息
      success: function (res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight * 2  - 340
        })
      }
    })

    that.foodInfo()
    


  },





  /**
* @desc:我的饮食详情的接口
* @date:2019.06.17
* @auther:li
*/
  // foodInfo: function () {
  //   var that = this;
  //   let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

  //     abstac.sms_Interface(app.publicVariable.foodInfoInterfaceAddress,
  //       { platform: platform, id: that.data.currentTab },
  //       function (res) {//查询成功
  //         //打印日志
  //         console.log("****************饮食详情***************");
  //         console.log(res);
  //         //判断是否有数据，有则取数据
  //         if (res.data.result.code == '2000') {
  //           var data = res.data.data.units;


  //           that.setData({
  //             foodInfo: data,
  //           });
  //         } else {
  //           abstac.promptBox(res.data.result.message);
  //         }
  //       },
  //       function (error) {//查询失败
  //         console.log(error);
  //       });
  // },







// 
  foodInfo: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号


     var arrList = []
    for (var i = 0; i < that.data.myFoodIds.length; i++) {
      var list = that.data.myFoodIds[i];


    abstac.sms_Interface(app.publicVariable.foodInfoInterfaceAddress,
      { platform: platform, id: list },
      function (res) {//查询成功
        //打印日志
        console.log("****************饮食详情***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;




          for (var i = 0; i < that.data.foodArr.length; i++) {
            var foodStates = that.data.foodArr[i];
            if (foodStates.food_id == data.food.id){
              data.food.unit_id = foodStates.unit_id,
                data.food.weight = foodStates.weight
            }
          }


          

          for (var k = 0; k < data.units.length; k++) {
            var foodChoose = data.units[k];
            foodChoose.sureid = false
          }





          arrList.push(data)

          that.setData({
            myFoodList: arrList,
          });
          that.FoodYesNo()
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });






    }



  },
// 




  /**
   * @desc:获取我的食物是否收藏的接口
   * @date:2019.06.17
   * @auther:li
   */
  FoodYesNo: function () {
    var that = this;
console.log('cscscscscscscscsscscscsc')

    for (var i = 0; i < that.data.myFoodList.length; i++) {
      var list = that.data.myFoodList[i];
      console.log(list)
      let id = list.food.id
      console.log(id)

    abstac.sms_Interface(app.publicVariable.favoriteFoodInterfaceAddress, {
      id: id,
      wx_session_key: this.data.wxSessionKey,
    },
      function (res) { //查询成功
        //打印日志
        console.log("****************是否收藏***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;


console.log(id)

          for (var j = 0; j < that.data.myFoodList.length; j++) {
            var listId = that.data.myFoodList[j];
            if (id == listId.food.id) {
              listId.food.collect = data
            }
          }
          console.log(that.data.myFoodList)


          // if (data == 1) {
          //   that.setData({
          //     op: "remove",
          //   });
          // } else {
          //   that.setData({
          //     op: "add",
          //   });
          // }

          that.setData({
            myFoodList: that.data.myFoodList,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) { //查询失败
        console.log(error);
      });


    }

  },


  /**
   * @desc:点击食物收藏取消的接口
   * @date:2019.06.17
   * @auther:li
   */
  addCollect: function (e) {
    var that = this;

    console.log(e.currentTarget.dataset.info.collect)
    let collect = e.currentTarget.dataset.info.collect;

        if (collect == 1) {
            that.setData({
              op: "remove",
            });
          } else {
            that.setData({
              op: "add",
            });
          }

    abstac.sms_Interface(app.publicVariable.favoriteFoodInterfaceAddress, {
      op: that.data.op,
      id: that.data.currentTab,
      wx_session_key: this.data.wxSessionKey,
    },
      function (res) { //查询成功
        //打印日志
        console.log("****************食物收藏取消的接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          that.FoodYesNo()
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) { //查询失败
        console.log(error);
      });
  },







  // 滚动切换标签样式
  switchTab: function (e) {
    console.log(e)
    let index = e.detail.current;
    this.setData({
      currentTabIndex: index,
      currentTab: this.data.myFoodList[index].food.id
    });
    this.checkCor();
    // this.foodInfo()
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    console.log(e)
    var cur = e.currentTarget.dataset.info.id;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur,
        currentTabIndex: e.currentTarget.dataset.index
      })
      // this.foodInfo()
    }






  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTabIndex > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },


  // infoFood: function (e) {
  //   console.log(e)
  //   var that = this;
  //   for (var j = 0; j < that.data.myFoodList.length; j++) {
  //     var listId = that.data.myFoodList[j];
  //     if (e.currentTarget.dataset.info.id == listId.id) {
  //       listId.unit_id = that.data.FoodInfoId;
  //       listId.unit_name = that.data.FoodInfoname;
  //       listId.weight = '1';

  //       for (var i = 0; i < that.data.units.length; i++) {
  //         var units = that.data.units[i];
  //         if (units.id = that.data.FoodInfoId){
  //           units.states = that.data.FoodInfostates;
  //         }else{
  //           units.states = !that.data.FoodInfostates;
  //         }
  //       }

  //       this.setData({
  //         myFoodList: that.data.myFoodList,
  //       })

        
  //     }
  //   }


  //   listId.unit_id = data.units[0].id;
  //   listId.unit_name = data.units[0].name;
  //   listId.weight = '1';
  //   data.units[0].states = true;


  // },



  chooseFoods: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.info;
    var name = '克';
    // var states = e.currentTarget.dataset.info.states;
    this.setData({
      FoodInfoId: id,
      FoodInfoname: name,
      // FoodInfostates: states
    })
  },

  chooseFood: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.info.id;
    var name = e.currentTarget.dataset.info.name;
    var sureid = e.currentTarget.dataset.info.sureid;
    // var states = e.currentTarget.dataset.info.states;
    this.setData({
      FoodInfoId: id,
      FoodInfoname: name,
      // FoodInfostates: states
    })
  },


  // 输入数量
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },


  // 以下為跳转业务

  goadd: function () {  //跳转入饮食记录详情估算
    wx.navigateTo({
      url: '/pages/my/add_diet_estimate/add_diet_estimate',
    })
  }, 









 
  /**
* @desc:添加食物记录到列表的的接口
* @date:2019.06.19
* @auther:li
*/
  newDiet: function () {
    var that = this;





    var param = [
      // {
      //   "category": "1",
      //   "inspect_at": "2019-06-20 16:11:39",
      //   "food_id": "16395",
      //   "food_name": "牛奶",
      //   "unit_id": "150",
      //   "unit_name": "杯",
      //   "weight": "10",
      //   "energy": "1240"
      // },
      // {
      //   "category": "1",
      //   "inspect_at": "2019-06-20 16:11:39",
      //   "food_id": "16801",
      //   "food_name": "酸奶(中脂)",
      //   "unit_id": "-1",
      //   "unit_name": "克",
      //   "weight": "155",
      //   "energy": "111"
      // },



    {
        "category": "5",
        "inspect_at": "2019-06-21 17:57:26",
        "food_id": "16400",
        "food_name": "面条(生)",
        "unit_id": "-1",
        "unit_name": "克",
        "weight": "1000",
        "energy": "2890"
      },
      {
        "category": "5",
        "inspect_at": "2019-06-21 17:57:26",
        "food_id": "16463",
        "food_name": "包子（猪肉馅）",
        "unit_id": "-1",
        "unit_name": "克",
        "weight": "80",
        "energy": "190"
      },
      {
        "category": "5",
        "inspect_at": "2019-06-21 17:57:26",
        "food_id": "16397",
        "food_name": "马铃薯",
        "unit_id": "118",
        "unit_name": "个(小)",
        "weight": "3",
        "energy": "331"
      }



    ]









    abstac.sms_Interface(app.publicVariable.newDietInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, diet_list: param},
        function (res) {//查询成功
          //打印日志
          console.log("****************添加食物记录到列表的的接口***************");
          console.log(res);
          //判断是否有数据，有则取数据
          if (res.data.result.code == '2000') {

            that.setData({
            });
          } else {
            abstac.promptBox(res.data.result.message);
          }
        },
        function (error) {//查询失败
          console.log(error);
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