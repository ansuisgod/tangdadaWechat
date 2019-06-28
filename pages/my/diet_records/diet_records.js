// pages/my/diet_records/diet_records.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getDieList: '',  //体重列表

    delBounced: false,//删除弹框

    delId: '',  //删除项id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
  },





  /**
* @desc:获取我的饮食记录列表的接口
* @date:2019.06.14
* @auther:li
*/
  getDieList: function () {
    var that = this;
    // let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.getDietInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, type: '1' },
      function (res) {//查询成功
        //打印日志
        console.log("****************饮食记录列表***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          var data = res.data.data;
          let mm, dd;
          for (var i = 0; i < data.length; i++) {
            var dataList = data[i];

            if (dataList.inspect_at != '') {
              dataList.mm = dataList.inspect_at.slice(5, 7)
              dataList.dd = dataList.inspect_at.slice(8, 10)
              dataList.time = dataList.inspect_at.slice(0, 10)
            }


            if (dataList.category == 0) {
              dataList.categoryText = "早餐"
            }
            if (dataList.category == 1) {
              dataList.categoryText = "上午加餐"
            }
            if (dataList.category == 2) {
              dataList.categoryText = "中餐"
            }
            if (dataList.category == 3) {
              dataList.categoryText = "下午加餐"
            }
            if (dataList.category == 4) {
              dataList.categoryText = "晚餐"
            }
            if (dataList.category == 5) {
              dataList.categoryText = "夜宵"
            }


          }




          // var arr = [];
          // // 处理相同时间日期的
          // for (var j = 0; j < data.length; j++) {
          //   var dataList1 = data[j];


          //   for (var k = 0; k < data.length; k++) {
          //     var dataList2 = data[k];

          //     console.log(dataList1.time == dataList2.time)
          //     console.log(dataList1.category == dataList2.category)
          //     console.log(dataList1.time == dataList2.time && dataList1.category == dataList2.category)
          //     if (dataList1.time == dataList2.time && dataList1.category == dataList2.category){
          //       arr.push(dataList1)
          //     }
          //   }


          // }
          // console.log(arr)





          var map = {},
            dest = [];
          for (var i = 0; i < data.length; i++) {
            var ai = data[i];
            // console.log(!map[ai.time])
            // console.log(!map[ai.category])
            if (!map[ai.time]) {
              dest.push({
                categoryText: ai.categoryText,
                mm: ai.mm,
                dd: ai.dd,
                time: ai.time,
                data: [ai]
              });
              map[ai.time] = ai;
              // console.log(ai)
            } else {
              for (var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if (dj.time == ai.time) {
                  dj.data.push(ai);
                  break;
                }
              }
            }
          }

          console.log(dest);


    

          that.setData({
            destList: dest,
          });

















          that.setData({
            getDieList: data,
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
* @desc:删除食物记录列表的的接口
* @date:2019.06.19
* @auther:li
*/
  deleteDiet: function () {
    var that = this;
    abstac.sms_Interface(app.publicVariable.deleteDietInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, id: that.data.delId },
      function (res) {//查询成功
        //打印日志
        console.log("****************删除食物记录列表的的接口***************");
        console.log(res);

        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          wx.hideLoading()
          that.getDieList()
          that.setData({
            delBounced: false
          });
          abstac.promptBox('操作成功');
        } else {
          wx.hideLoading()
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        wx.hideLoading()
        console.log(error);
      });
  },




  ////删除事件
  //删除弹框显示
  delBounced: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.info.id)
    let delId = e.currentTarget.dataset.info.id
    console.log("长按");
    wx.vibrateShort({
      success: function (res) {
      }
    })
    that.setData({
      delBounced: true,
      delId: delId,
    })
  },

  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },

  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },

  //删除弹框关闭
  delBounced_close: function () {

    this.setData({
      delBounced: false
    })
  },

  //弹框点击确认按钮
  delBounced_operate: function () {

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.deleteDiet()

  },
  ////删除事件end






  // 以下為跳转业务
  goAdd: function (e) {

    console.log(e)

    if (this.endTime - this.startTime < 350) {   //按压时间小于350毫秒跳转

      // let ids = '16397,16463,16400';
      let infos = e.currentTarget.dataset.info.data

      let foodArr = []
      for (var i = 0; i < infos.length; i++) {
        var foodList = infos[i];
        foodArr.push(foodList.food_id)
      }
      
      let ids = foodArr.join(',')


      wx.navigateTo({
        url: '/pages/my/add_diet_Details/add_diet_Details?ids=' + ids + '&foodInfos=' + JSON.stringify(infos),
      })

    }

  },


  goAdds: function () {  //跳转入饮食记录填写大分类
    wx.navigateTo({
      url: '/pages/my/add_diet/add_diet',
    })
  },

  goAdvice: function () {  //跳转入参考建议
    wx.navigateTo({
      url: '/pages/my/health_advice/health_advice?status=3',
    })
  },










  //去除重复数组对象
  deteleObject: function (obj) {
    // console.log(obj)
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
      var keys = Object.keys(obj[i]);
      keys.sort(function (a, b) {
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
    that.getDieList()
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