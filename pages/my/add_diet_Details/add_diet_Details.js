// pages/my/add_diet_Details/add_diet_Details.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currents: '',
    myFoodList: [],  //食物详情列表
    myFoodIds: '',  //我的食物的id列表  
    currentTab: '', //预设当前项的id值，也就是第一次进入页面显示第一个食物
    op: '', //点击收藏判断

    inputValue: 1,



    windowHeight: '',  //窗口宽度
    winHeight: "",//窗口高度
    scrollLeft: 0, //tab标题的滚动条位置


    currentTabIndex: '0',
    nowDataTime: '', //当前时间

    foodArr: [],

    category: '', //时间段分类id
    lock: false, //防止多次点击按钮
    record: '',  //是否显示提交健康记录加分提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;


    let ids = options.ids
    var arr = ids.split(',');
    that.setData({
      myFoodIds: arr,  //我的食物的id列表  
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey'),
      category: options.category
    });

    if (options.foodInfos != undefined) {   //点击修改进入携带的数据信息
      console.log('-=-=-===-=-=-=-=')
      that.setData({
        foodArr: JSON.parse(options.foodInfos)
      });
    }

    wx.getSystemInfo({   //手机设备信息
      success: function (res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight * 2 - 340
        })
      }
    })

    that.foodInfo()
    that.getNowFormatDate()
    that.userTaskList()
  },



  /**
 * @desc:用户完成任务列表的接口
 * @date:2019.06.18
 * @auther:li
 */
  userTaskList: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.userTaskInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey },
      function (res) {//查询成功
        //打印日志
        console.log("****************用户任务列表的接口***************");
        console.log(res);
        if (res.data.result.code == '2000') {

          let record = [];
          let lists = res.data.data.tasks;
          for (let u = 0; u < lists.length; u++) {
            var listsId = lists[u];
            if (listsId.task_id == 15) {
              record.push(listsId)
            }

          }
          that.setData({
            record: record,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },


  getNowFormatDate: function () {//获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
    // return currentdate;
    this.setData({
      nowDataTime: currentdate, //获取当前时间
    });
  },




  /**
* @desc:我的饮食详情的接口
* @date:2019.06.17
* @auther:li
*/

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





            data.units.unshift({
              name: "克",
              weight: "1.0",
              eat_weight: "1.0",
              id: "-1",
            })

            for (var k = 0; k < data.units.length; k++) {   //每个食物的可选单位，循环加入sureid
              var foodChoose = data.units[k];
              foodChoose.sureid = false
            }


            data.food.inputValue = ''
            data.food.unitsName = ''
            data.food.disabled = true
            data.food.unit_id = ''
            data.food.energyDetail = ''
            data.food.energy = ''




            // if (that.data.foodArr.length != '') {
            //   for (var v = 0; v < that.data.foodArr.length; v++) {  //处理点击修改进入携带的数据信息
            //     var foodStates = that.data.foodArr[v];
            //     if (foodStates.food_id == data.food.id) {
            //       data.food.disabled = false
            //       data.food.inputValue = foodStates.data.weight
            //       data.food.unitsName = foodStates.data.unit_name
            //       data.food.unit_id = foodStates.data.unit_id
            //       // data.food.energyDetail = foodStates.data.energy
            //       data.food.energy = foodStates.data.energy
            //     }
            //   }
            // }


            arrList.push(data)   //循环push入所有食物进入列表

            that.setData({
              myFoodList: arrList, //食物详情列表
              currentTab: arrList[0].food.id,
            });

            that.FoodYesNo() //循环判断每个食物是否收藏

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
    for (var i = 0; i < that.data.myFoodList.length; i++) {
      var list = that.data.myFoodList[i];
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
                listId.food.collect = data   //给没给食物信息里加入是否收藏的判断信息 collect=0为未收藏
              }
            }

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
      currentTabIndex: index,  //获取当前页食物下标
      currents: index,  //获取当前页食物下标
      currentTab: this.data.myFoodList[index].food.id,  //获取当前页食物id
    });
    this.checkCor();
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



  //关键处理 //关键处理 //关键处理

  chooseFood: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.info.id;

    let unitsList = this.data.myFoodList[this.data.currentTabIndex].units
    let foodList = this.data.myFoodList[this.data.currentTabIndex].food
    let unitsName = this.data.myFoodList[this.data.currentTabIndex].food.unitsName
    for (var j = 0; j < unitsList.length; j++) {
      var list = unitsList[j];
      if (id == list.id) {
        list.sureid = true;
        this.data.myFoodList[this.data.currentTabIndex].food.unitsName = list.name
        this.data.myFoodList[this.data.currentTabIndex].food.disabled = false
        this.data.myFoodList[this.data.currentTabIndex].food.unit_id = list.id
        this.data.myFoodList[this.data.currentTabIndex].food.energyDetail = list.weight
        // this.data.myFoodList[this.data.currentTabIndex].food.inputValue = ''
      } else {
        list.sureid = false;
      }
    }


    this.setData({
      myFoodList: this.data.myFoodList,  //把修改的数据作用在数据里
    })

  },


  // 输入数量
  bindInput: function (e) {
    console.log(e)

    if (!(this.data.myFoodList[this.data.currentTabIndex].food.disabled)) {

      let id = e.currentTarget.dataset.info.food.id;
      let foodList = this.data.myFoodList[this.data.currentTabIndex].food;

      for (var j = 0; j < this.data.myFoodList.length; j++) {
        var list = this.data.myFoodList[j];
        if (id == list.food.id) {
          list.food.inputValue = e.detail.value;
          this.data.myFoodList[this.data.currentTabIndex].food.energy = parseInt(Number(foodList.energyDetail) / 100 * Number(foodList.calory) * Number(e.detail.value))
        }
      }

      this.setData({
        myFoodList: this.data.myFoodList,  //必须全局改变才能渲染页面？
      })

      // this.setData({
      //   inputValue: e.detail.value
      // })

    } else {
      abstac.promptBox('请先选择食物单位');
    }

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

    for (var i = 0; i < this.data.myFoodList.length; i++) {
      var list = this.data.myFoodList[i];
      if (list.food.inputValue == '') {
        abstac.promptBox('请完成信息填写');
        return
      }
    }

    console.log('-=-=-=-=-=-')

    let InfoDetail = []
    for (var j = 0; j < this.data.myFoodList.length; j++) {
      var list = this.data.myFoodList[j];
      InfoDetail.push({
        category: that.data.category,
        inspect_at: that.data.nowDataTime,
        food_id: list.food.id,
        food_name: list.food.name,
        unit_id: list.food.unit_id,
        unit_name: list.food.unitsName,
        weight: list.food.inputValue,
        energy: list.food.energy,
      })
    }
    console.log(InfoDetail)




    abstac.sms_Interface(app.publicVariable.newDietInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, diet_list: InfoDetail },
      function (res) {//查询成功
        //打印日志
        console.log("****************添加食物记录到列表的的接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          that.setData({
            lock: true,
          })

          if (that.data.record == '') {
            wx.showToast({
              title: '新增成功',
              icon: 'success',
              duration: 500
            })
          } else if (Number(that.data.record[0].times) == 5) {
            wx.showToast({
              title: '新增成功',
              icon: 'success',
              duration: 500
            })
          } else {
            wx.showToast({
              title: '添加健康记录成功，积分加1！',
              icon: 'none',
              duration: 500
            })
          }

          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/my/diet_records/diet_records'
            })
          }, 600)

          // try {
          //   wx.removeStorageSync('foodsList')
          // } catch (e) {
          //   // Do something when catch error
          // }
          wx.setStorageSync('foodsList', [])
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