// pages/my/Remind_set/Remind_set.js
import { $wuxButton } from '../../../components/wux'
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareMenu: false,  //第一个弹框


    delId:'', //选择项id

    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    index: 3,
    opened: !1, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    that.setData({
      platform: app.globalData.platform,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    that.initButton()

    that.listAlarmList()
  },








  /**
   * @desc:获取提醒记录列表的接口
   * @date:2019.06.25
   * @auther:li
   */
  listAlarmList: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform); //手机型号

    abstac.sms_Interface(app.publicVariable.listAlarmInfoInterfaceAddress, {
      platform: platform, wx_session_key: this.data.wxSessionKey,
    },
      function (res) { //查询成功
        //打印日志
        console.log("****************获取提醒记录列表的接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data.alarms;


          for (var i = 0; i < data.length; i++) {
            var dataList = data[i];
            if (dataList.time.length > 10) {
              dataList.newtime = dataList.time.slice(11, 16)
            }else{
              dataList.newtime = dataList.time
            }
          }

          for (var k = 0; k < data.length; k++) {
            var dataLists = data[k];
            dataLists.categoryArr = dataLists.category.split(',')

            let arrList = []
            let arrImg = []
            for (var u = 0; u < dataLists.categoryArr.length; u++) {
              var arr = dataLists.categoryArr[u];

              switch (arr) {
                case '1':
                  arrList.push('测血糖')
                  arrImg.push('../../../images/health/xuetang@3x.png')
                  break;
                case '2':
                  arrList.push('测血压')
                  arrImg.push('../../../images/health/cexueya@3x.png')
                  break;
                case '3':
                  arrList.push('打胰岛素')
                  arrImg.push('../../../images/health/dayidaosu@3x.png')
                  break;
                case '4':
                  arrList.push('检查')
                  arrImg.push('../../../images/health/jiancha@3x.png')
                  break;
                case '5':
                  arrList.push('运动')
                  arrImg.push('../../../images/health/yundong.png')
                  break;
                case '6':
                  arrList.push('服药')
                  arrImg.push('../../../images/health/fuyao@3x.png')
                  break;
                case '7':
                  arrList.push('其他')
                  arrImg.push('../../../images/health/qita.png')
                  break;
                default:
              }

            }

            console.log(arrList)
            let arrLists = arrList.join('+')
            dataLists.arrInfo = arrLists
            dataLists.arrInfoArr = arrList
            dataLists.arrImgs = arrImg

          }

          that.setData({
            listAlarmList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) { //查询失败
        console.log(error);
      });
  },


  /**
* @desc:删除提醒信息的接口
* @date:2019.06.25
* @auther:li
*/
  deleteAlarm: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    abstac.sms_Interface(app.publicVariable.deleteAlarmInfoInterfaceAddress,
      { platform: platform,wx_session_key: this.data.wxSessionKey, id: that.data.delId },
      function (res) {//查询成功
        //打印日志
        console.log("****************删除提醒信息的接口***************");
        console.log(res);


        that.listAlarmList()
        that.setData({
          delBounced: false
        });
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          wx.hideLoading()
          // that.listAlarmList()
          // that.setData({
          //   delBounced: false
          // });
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





  // 弹框1
  shareShare: function () {
    var that = this;
    let menu = that.data.shareMenu
    that.setData({
      shareMenu: !menu,
    })

  },

  hideCover: function () {
    let menu = this.data.shareMenu
    this.setData({
      shareMenu: !menu,
    })
  },

  

  // 以下為跳转业务
  goSMS: function () {  //跳转入短信提醒设置页
    wx.navigateTo({
      url: '/pages/my/SMS_alerts/SMS_alerts',
    })
  },
  



  hideCoverss: function () {
    let menu = this.data.$wux.button.bt.opened;
    let mytypes = $wux.button.bt.opened
    this.setData({
      mytypes: !menu,
    })
  },

// 
// 
  initButton(position = 'bottomRight') {
    this.setData({
      opened: !1,
    })

    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '短信提醒',
          icon: "data:image/png;base64,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",
        },
        {
          label: '微信提醒',
          icon: "data:image/png;base64,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",
        }
      ],
      buttonClicked(index, item) {
        index === 0 && wx.navigateTo({
          url: '/pages/my/SMS_alerts/SMS_alerts'
        })

          index === 1 && wx.showModal({
            title: 'Thank you for your 使用!',
            showCancel: !1,
          })

        return true
      },
      callback(vm, opened) {
        vm.setData({
          opened,
        })
      },
    })
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
    that.deleteAlarm()

  },
  ////删除事件end

  // 以下為跳转业务
  goAdd: function (e) {  //跳转入血糖记录填写


    if (this.endTime - this.startTime < 350) {   //按压时间小于350毫秒跳转

      console.log(e.currentTarget.dataset.info)
        let toId = e.currentTarget.dataset.info.id;
      let arrInfoArr = e.currentTarget.dataset.info.arrInfoArr;
      //   let value = e.currentTarget.dataset.info.value; //cal值
      //   let category = e.currentTarget.dataset.info.category; //测量时段
      //   let status = e.currentTarget.dataset.info.status; // 个人状态
      //   let inspect_at = e.currentTarget.dataset.info.inspect_at;
        wx.navigateTo({
          url: '/pages/my/Modify_SMS_alerts/Modify_SMS_alerts?toId=' + toId + '&arrInfoArr=' + JSON.stringify(arrInfoArr),
        })
      

    }

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
    that.listAlarmList()
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