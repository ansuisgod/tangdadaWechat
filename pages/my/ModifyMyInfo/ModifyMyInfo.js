// pages/my/ModifyMyInfo/ModifyMyInfo.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    queryUserInfo: '',  //用户信息

    noSelect: '../../../images/personal/checkbox_big_remind.png',
    hasSelect: '../../../images/personal/checkbox_selected_big_remind.png',

    woman: '../../../images/personal/woman.png',
    man: '../../../images/personal/man.png',

    nick_name: '',  //姓名

    sexIndex: 2, //性别选择
    sex: '女',


    // 角色类型
    roleList: ['1型糖尿病', '2型糖尿病', '糖友亲友', '医生', '其它'],
    roleIndex: '',

    time: "", // 出生日期选择器

    // 糖尿病类型
    typeList: ['1型糖尿病', '2型糖尿病', '妊娠糖尿病', '特殊糖尿病'],
    typeIndex: '',


    diagnosis: '', //确诊日期

    //起病方式
    wayList: ['急性', '慢性'],
    wayIndex: '',



    //您的并发症
    selectIndex: [{
      sureid: false,
      selected: "2",
      name: "糖尿病足病"
    },
    {
      sureid: false,
      selected: "3",
      name: "糖尿病肾病"
    },
    {
      sureid: false,
      selected: "4",
      name: "糖尿病视网膜病变"
    },
    {
      sureid: false,
      selected: "5",
      name: "糖尿病心脑血管病"
    },
    {
      sureid: false,
      selected: "6",
      name: "下肢静脉栓塞"
    },
    {
      sureid: false,
      selected: "7",
      name: "高尿酸血症"
    },
    {
      sureid: false,
      selected: "8",
      name: "脂肪肝"
    },
    {
      sureid: false,
      selected: "9",
      name: "急性并发症"
    },
    ],



    //您的并发症
    selectIndex2: [{
      sureid: false,
      selected: "1",
      name: "多饮"
    },
    {
      sureid: false,
      selected: "2",
      name: "多食"
    },
    {
      sureid: false,
      selected: "3",
      name: "多尿"
    },
    {
      sureid: false,
      selected: "4",
      name: "体重减轻"
    },
    {
      sureid: false,
      selected: "5",
      name: "疲劳乏力"
    },
    {
      sureid: false,
      selected: "6",
      name: "视力减退"
    },
    {
      sureid: false,
      selected: "7",
      name: "酮症酸中毒"
    },
    {
      sureid: false,
      selected: "8",
      name: "胃肠道反应"
    },
    {
      sureid: false,
      selected: "9",
      name: "脱水症"
    },
    {
      sureid: false,
      selected: "10",
      name: "泡沫尿"
    },
    {
      sureid: false,
      selected: "11",
      name: "口干"
    },
    {
      sureid: false,
      selected: "12",
      name: "饥饿"
    },
    {
      sureid: false,
      selected: "13",
      name: "皮肤感染"
    },
    {
      sureid: false,
      selected: "14",
      name: "浮肿"
    },
    {
      sureid: false,
      selected: "15",
      name: "手足麻木"
    },
    {
      sureid: false,
      selected: "16",
      name: "手抖"
    },
    {
      sureid: false,
      selected: "17",
      name: "低血糖昏迷"
    },
    {
      sureid: false,
      selected: "18",
      name: "体检发现"
    },
    ],



    shareMenu: false, //第一个弹框
    arr: '', //其它并发症选项值
    arrText: '', ////其它并发症选项文字

    noChoose: false, // 无并发症是否点击


    // 起病症状
    shareMenu2: false, //第二个弹框
    arr2: '', //其它并发症选项值
    arrText2: '', ////其它并发症选项文字

    noChoose2: false, // 无并发症是否点击


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





  },


  inputValue: function (e) {
    this.setData({
      nick_name: e.detail.value
    })
  },

  chooseSex: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.choose)
    let sexIndex = e.currentTarget.dataset.choose;
    let sexwoman = '女',
      sexman = '男';
    if (sexIndex == 1) {
      that.setData({
        sexIndex: sexIndex,
        sex: sexman,
      });
    } else {
      that.setData({
        sexIndex: sexIndex,
        sex: sexwoman,
      });
    }

  },




  // 角色类型
  changeRole(e) {
    this.setData({
      roleIndex: e.detail.value,
    });
  },


  // 出生日期选择器
  changeAge(e) {
    let time = e.detail.value;
    this.setData({
      time: time,
    });
  },

  //确诊日期
  changeDiagnosis(e) {
    let diagnosis = e.detail.value;
    this.setData({
      diagnosis: diagnosis,
    });
  },


  // 糖尿病类型
  changeType(e) {
    this.setData({
      typeIndex: e.detail.value,
    });
  },



  //起病方式
  changeWay(e) {
    this.setData({
      wayIndex: e.detail.value,
    });
  },







  // 选择病史
  chooseNo: function () { //单选的
    var that = this;
    that.setData({
      noChoose: true,
      noTrigger: true,
    })

    if (that.data.noChoose == true) {
      let arrlist = this.data.selectIndex
      for (let i = 0; i < arrlist.length; i++) {
        arrlist[i].sureid = false
      }
      this.setData({
        arr: '1',
        arrText: '无其它并发症',
        selectIndex: arrlist, //将已改变属性的json数组更新
      })
    }
  },



  chooseHistory: function (e) { //多选的

    this.setData({
      noTrigger: true,
    })
    let index = e.currentTarget.dataset.selectindex; //当前点击元素的自定义数据，这个很关键
    let selectIndex = this.data.selectIndex; //取到data里的selectIndex
    selectIndex[index].sureid = !selectIndex[index].sureid; //点击就赋相反的值

    let arr = [];
    let arrText = [];
    let arrlist = this.data.selectIndex
    for (let i = 0; i < arrlist.length; i++) {
      if (arrlist[i].sureid == true) {
        arr.push(arrlist[i].selected)
        arrText.push(arrlist[i].name)
      }
    };

    this.setData({
      selectIndex: selectIndex, //将已改变属性的json数组更新
      arr: arr.join(','),
      arrText: arrText,
      noChoose: false,
    })

  },




  // 弹框
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

  myCatchTouch: function () {
    console.log('stop user scroll it!');
    return;
  },






  // 起病症状
  chooseNo2: function () { //单选的
    var that = this;
    that.setData({
      noChoose2: true,
      noTrigger2: true,
    })

    if (that.data.noChoose2 == true) {
      let arrlist = this.data.selectIndex2
      for (let i = 0; i < arrlist.length; i++) {
        arrlist[i].sureid = false
      }
      this.setData({
        arr2: '',
        arrText2: '',
        selectIndex2: arrlist, //将已改变属性的json数组更新
      })
    }
  },



  chooseHistory2: function (e) { //多选的

    this.setData({
      noTrigger2: true,
    })
    let index = e.currentTarget.dataset.selectindex2; //当前点击元素的自定义数据，这个很关键
    let selectIndex = this.data.selectIndex2; //取到data里的selectIndex
    selectIndex[index].sureid = !selectIndex[index].sureid; //点击就赋相反的值

    let arr = [];
    let arrText = [];
    let arrlist = this.data.selectIndex2
    for (let i = 0; i < arrlist.length; i++) {
      if (arrlist[i].sureid == true) {
        arr.push(arrlist[i].selected)
        arrText.push(arrlist[i].name)
      }
    };

    this.setData({
      selectIndex2: selectIndex, //将已改变属性的json数组更新
      arr2: arr.join(','),
      arrText2: arrText,
      noChoose2: false,
    })

  },

  //   // 起病症状
  shareShare2: function () {
    var that = this;
    let menu = that.data.shareMenu2
    that.setData({
      shareMenu2: !menu,
    })

  },

  hideCover2: function () {
    let menu = this.data.shareMenu2
    this.setData({
      shareMenu2: !menu,
    })
  },






  /**
   * @desc:修改用户信息的接口
   * @date:2019.06.20
   * @auther:li
   */
  setUserInf: function () {
    var that = this;


    if (!that.data.nick_name.replace(/^\s+|\s+$/g, '')) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000
      })
      return
    }

    wx.showLoading({
      title: '请求中..',
    });

    abstac.sms_Interface(app.publicVariable.setUserInfoInterfaceAddress, {
      wx_session_key: this.data.wxSessionKey,
      nick_name: that.data.nick_name,  //姓名
      gender: that.data.sexIndex,    //男1女2
      role: Number(that.data.roleIndex) + 1,  //角色
      birthday: that.data.time,   //出生日期

      disease_type: Number(that.data.typeIndex) + 1,  //糖尿病类型
      confirmed_at: that.data.diagnosis,   //确诊日期
      mode_of_onset: Number(that.data.wayIndex) + 1,  //起病方式
      symptoms_of_onset: that.data.arr2,  //起病症状
      complications: that.data.arr,   //并发症
    },
      function (res) { //查询成功
        //打印日志
        console.log("****************修改用户信息的接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        wx.hideLoading();
        if (res.data.result.code == '2000') {
          var data = res.data.data;

          abstac.promptBox("保存成功!");

          wx.reLaunch({
            url: '/pages/my/my?refreshState=1'
          })

        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) { //查询失败
        console.log(error);
        wx.hideLoading();
      });
  },



  /**
* @desc:查询用户信息接口
* @date:2019.06.17
* @auther:li
*/
  queryUserInfo: function () {
    var that = this;
    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号

    abstac.sms_Interface(app.publicVariable.queryUserInformationInterfaceAddress,
      { wx_session_key: this.data.wxSessionKey, platform: platform, },
      function (res) {//查询成功
        //打印日志
        console.log("****************查询用户信息接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {

          var data = res.data.data;
          that.setData({
            queryUserInfo: data,
            nick_name: data.nick_name,  //姓名
            sexIndex: data.gender,   //男1女2
            roleIndex: Number(data.role) - 1,  //角色
          });

          if (data.gender == '1') {
            that.setData({
              sex: '男',   //男1女2
            });
          }else{
            that.setData({
              sex: '女',   //男1女2
            });
          }

          if (data.birthday) {
            that.setData({
              time: data.birthday,   //出生日期  //? 
            });
          }

          if (data.disease_type) {
            that.setData({
              typeIndex: Number(data.disease_type) - 1, //糖尿病类型   //?
            });
          }

          if (data.confirmed_at) {
            that.setData({
              diagnosis: data.confirmed_at,  //确诊日期  //?
            });
          }

          if (data.mode_of_onset) {
            that.setData({
              wayIndex: Number(data.mode_of_onset) - 1,  //起病方式
            });
          }

          if (data.symptoms_of_onset) {



            var str = data.symptoms_of_onset.split(',');
            console.log(str)

            var arrText2 = []
            for (let i = 0; i < str.length; i++) {
              let strId = str[i];


              for (let j = 0; j < that.data.selectIndex2.length; j++) {
                if (strId == that.data.selectIndex2[j].selected) {
                  that.data.selectIndex2[j].sureid = true;
                  arrText2.push(that.data.selectIndex2[j].name)
                }
              }


            };

            that.setData({
              selectIndex2: that.data.selectIndex2,
              arr2: data.symptoms_of_onset, //起病症状
              arrText2: arrText2,
            });


          }

          if (data.complications) {

            var str = data.complications.split(',');
            console.log(str)

            var arrText = []
            for (let i = 0; i < str.length; i++) {
              let strId = str[i];


              for (let j = 0; j < that.data.selectIndex.length; j++) {
                if (strId == that.data.selectIndex[j].selected) {
                  that.data.selectIndex[j].sureid = true;
                  arrText.push(that.data.selectIndex[j].name)
                }
              }


            };

            that.setData({
              selectIndex: that.data.selectIndex,
              arr: data.complications, //并发症
              arrText: arrText,
            });
          }


        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//查询失败
        console.log(error);
      });
  },






  /**
   * @desc:修改用户信息的接口(此处用于专门头像上传)
   * @date:2019.06.20
   * @auther:li
   */
  setUserInfHeadImg: function (head_Image) {
    var that = this;

    let platform = abstac.mobilePhoneModels(that.data.platform);//手机型号
    if (!that.data.nick_name.replace(/^\s+|\s+$/g, '')) {
      abstac.promptBox("亲， 姓名不能为空哦！");
      return
    }

    wx.showLoading({
      title: '请求中..',
    });

    abstac.sms_Interface(app.publicVariable.setUserInfoInterfaceAddress, {
      wx_session_key: this.data.wxSessionKey,
      nick_name: that.data.nick_name,  //姓名
      gender: that.data.sexIndex,    //男1女2
      role: Number(that.data.roleIndex) + 1,  //角色
      birthday: that.data.time,   //出生日期

      disease_type: Number(that.data.typeIndex) + 1,  //糖尿病类型
      confirmed_at: that.data.diagnosis,   //确诊日期
      mode_of_onset: Number(that.data.wayIndex) + 1,  //起病方式
      symptoms_of_onset: that.data.arr2,  //起病症状
      complications: that.data.arr,   //并发症

      head_Image: head_Image,    //头像
      platform: platform,  //手机型号
      title: '',  //不晓得干嘛的
      areas_of_expertise: '',//不晓得干嘛的
      professional: '',  //不晓得干嘛的
    },
      function (res) { //查询成功
        //打印日志
        console.log("****************修改用户信息的接口***************");
        console.log(res);
        //判断是否有数据，有则取数据
        wx.hideLoading();
        if (res.data.result.code == '2000') {
          var data = res.data.data;

          abstac.promptBox("头像上传成功!");
          that.queryUserInfo()

        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) { //查询失败
        console.log(error);
        wx.hideLoading();
      });
  },


  
    // 以下為跳转业务
  ModifyMyInfo: function() {  //跳转入头像修改页
    wx.navigateTo({
      url: '/pages/my/headImage/headImage',
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
    that.queryUserInfo()

    
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    console.log(json)//为传过来的值
    if (json != undefined) {
      that.setUserInfHeadImg(json)
    }




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