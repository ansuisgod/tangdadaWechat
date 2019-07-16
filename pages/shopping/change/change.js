// pages/shopping/change/change.js
var abstac = require('../../../commonmethod/abstract.js'),
    app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    aGoodsId: '',//商品的id
    goodsDeInfo: '',//存放商品信息
    consinName:'',//收货人姓名
    consinPhone: '',//收货人电话
    consinAdress: '',//收货人地址
    subBackgroundColor:'#e5e5e5',
    subFontColor:'#a5a5a5'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      aGoodsId: options.goodsid,
      wxSessionKey: wx.getStorageSync('sessionKey')
    });
    var nameSessionKey = wx.getStorageSync('consinNameSessionKey') || [];
    var phoneSessionKey = wx.getStorageSync('consinPhoneSessionKey') || [];
    var addressSessinKeys = wx.getStorageSync('consinAdressSessionKey') || [];
    console.log('nameSessionKey=' + nameSessionKey + '&phoneSessionKey=' + phoneSessionKey + '&addressSessinKeys=' + addressSessinKeys);
    if (phoneSessionKey != '' || nameSessionKey != '' || addressSessinKeys != ''){
      this.setData({
        aGoodsId: options.goodsid,
        consinName: nameSessionKey,//收货人姓名
        consinPhone: phoneSessionKey,//收货人电话
        consinAdress: addressSessinKeys//收货人地址
      });
    }
    //我要兑换页面查询商品详情
    this.enquiryForDetails();
  },
  /**
   * @desc:我要兑换页面查询商品详情
   * @date:2019.06.04
   * @auther:an
   */
  enquiryForDetails: function () {
    var that = this;
    //打印日志
    console.log("商品id" + this.data.aGoodsId);
    abstac.sms_Interface(app.publicVariable.goodsListfaceAddress,
      { id: this.data.aGoodsId },
      function (res) {//成功
        //打印日志
        console.log("****************我要兑换页面查询商品详情返回的数据***************");
        console.log(res);
        if (res.data.result.code == '2000') {
          that.setData({
            goodsDeInfo: res.data.data.items[0]
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//失败
        //打印日志
        console.log(error);
      });
  },
  /**
   * @desc:点击提交按钮触发事件
   * @date:2019.06.04
   * @auther:an
   */
  submitInfo:function(){
    console.log("consinName=" + this.data.consinName + "&consinPhone=" + this.data.consinPhone + "&consinAdress=" + this.data.consinAdress);

    var consinName = this.data.consinName,//收货人姓名
        consinPhone = this.data.consinPhone,//收货人的电话
        consinAdress = this.data.consinAdress,//收货人的地址
        that = this,
        goodsLength = '1.0';
    if (!(/^1[34578]\d{9}$/.test(consinPhone)) || consinName == '' || consinAdress == ''){
      abstac.promptBox("请检查重新填写");
      this.setData({
        subBackgroundColor:'#e5e5e5',
        subFontColor:'#a5a5a5'
      });
    }else{
      //调用接口在提交地址信息
      this.setData({
        subBackgroundColor: '#fd7380',
        subFontColor: '#fff'
      });
      abstac.sms_Interface(app.publicVariable.contactInformationInterfaceAddress,
        { name: that.data.goodsDeInfo.name, receive_address: consinAdress, discount: goodsLength, id: this.data.aGoodsId, contact_method: consinPhone, contact_person: consinName, wx_session_key: this.data.wxSessionKey},
      function(res){//接口调用成功
        console.log("****************查询商品兑换记录接口返回函数***************");
        console.log(res);
        if (res.data.result.code == '2000'){
          wx.showModal({
            title: '提示',
            content: '亲，你已成功兑换了<' + that.data.goodsDeInfo.name+'>，请静候佳音，我们的工作人员会尽快送出您兑换的奖品',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                //跳转草稿箱的页面
                wx.switchTab({
                  url: '../../../pages/shopping/shopping'
                });
              }
            }
          })
        }else{
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {//接口调用失败
        abstac.promptBox(res.data.result.message);
      });
      wx.setStorageSync('consinNameSessionKey', consinName);
      wx.setStorageSync('consinPhoneSessionKey', consinPhone);
      wx.setStorageSync('consinAdressSessionKey', consinAdress);
    }
  },
  /**
   * @desc:收货人的姓名
   * @date:2019.06.04
   * @auther:an
   */
  nameOfConsignee:function(e){
    this.setData({
      consinName: e.detail.value
    });
  },
  /**
   * @desc:收货人的电话
   * @date:2019.06.04
   * @auther:an
   */
  phoneOfConsignee: function (e) {
    this.setData({
      consinPhone: e.detail.value
    });
  },
  /**
   * @desc:收货人地址
   * @date:2019.06.04
   * @auther:an
   */
  adressOfConsignee: function (e) {
    this.setData({
      consinAdress: e.detail.value
    });
  },
  /**
   * @desc:收货人姓名输入框失去焦点
   * @date:2019.06.04
   * @auther:an
   */
  nameOfConsigneeBlur:function(){
    var consinName = this.data.consinName,//收货人姓名
        consinPhone = this.data.consinPhone,//收货人的电话
        consinAdress = this.data.consinAdress;//收货人的地址
    if (!(/^1[34578]\d{9}$/.test(consinPhone)) || consinName == '' || consinAdress == '') {
      this.setData({
        subBackgroundColor: '#e5e5e5',
        subFontColor: '#a5a5a5'
      });
    } else {
      this.setData({
        subBackgroundColor: '#fd7380',
        subFontColor: '#fff'
      });
    }
  },
  /**
   * @desc:收货人姓名输入框失去焦点
   * @date:2019.06.04
   * @auther:an
   */
  phoneOfConsigneeBlur: function () {
    var consinName = this.data.consinName,//收货人姓名
      consinPhone = this.data.consinPhone,//收货人的电话
      consinAdress = this.data.consinAdress;//收货人的地址
    if (!(/^1[34578]\d{9}$/.test(consinPhone)) || consinName == '' || consinAdress == '') {
      this.setData({
        subBackgroundColor: '#e5e5e5',
        subFontColor: '#a5a5a5'
      });
    } else {
      this.setData({
        subBackgroundColor: '#fd7380',
        subFontColor: '#fff'
      });
    }
  },
  /**
   * @desc:文本域失去焦点
   * @date:2019.06.04
   * @auther:an
   */
  adressOfConsigneeBlur: function () {
    var consinName = this.data.consinName,//收货人姓名
      consinPhone = this.data.consinPhone,//收货人的电话
      consinAdress = this.data.consinAdress;//收货人的地址
    if (!(/^1[34578]\d{9}$/.test(consinPhone)) || consinName == '' || consinAdress == '') {
      this.setData({
        subBackgroundColor: '#e5e5e5',
        subFontColor: '#a5a5a5'
      });
    } else {
      this.setData({
        subBackgroundColor: '#fd7380',
        subFontColor: '#fff'
      });
    }
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
    //我要兑换页面查询商品详情
    this.enquiryForDetails();
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})