// pages/login/login.js
var abstac = require('../../commonmethod/abstract.js'),
    inviterid = '';//邀请人的id
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber:'',
    regPhoneNumber: '',//注册验证码输入框的值
    pwdLoginNumber:'',//密码登陆的电话号码
    pwdNumber:'',//手机验证码登录的验证码
    pwdLoginCode: '',//密码登陆的用户输入的密码
    regPwdNumber:'',
    regGetCode:'',
    loginBackgroundColr:'#e5e5e5',
    pwdLoginBackgroundColr: '#e5e5e5',//密码登陆的登录按钮背景初始化颜色
    regBackgroundColr: '#e5e5e5',
    stacodeColortuses:'#a8a5a5',
    getcodeColortuses:'#a8a5a5',//获取验证码按钮的字体的颜色
    getCodeBackground: '#e5e5e5',//获取验证码按钮的背景的颜色
    regGetCodeColor:'#a8a5a5',//注册获取验证码按钮的字体颜色
    regGetCodeBackground: '#e5e5e5',//注册获取验证码按钮的背景颜色
    regBtnColor:'#a8a5a5',//注册页面注册按钮的初始字体颜色
    loginBtnFontColor:'#a8a5a5',//登录按钮初始化字体颜色
    pwdLoginBtnFontColor: '#a8a5a5',//密码登陆的登录按钮字体初始化颜色
    currentTabb:0,//tab切换下标
    getInfo:'发送验证码',//登录页面发送验证码按钮的字体
    getInfoReg: '发送验证码',//注册页面发送验证码按钮的字体
    timer: '',//登录页面发送验证码倒计时
    timerReg: '',//注册页面发送验证码倒计时
    countDownNum: '60',//登录页面发送验证码倒计时初始值
    countDownNumReg: '60',//注册页面发送验证码倒计时初始值
    disableCode:false,//登录页面获取验证码按钮状态
    disableCodeReg: false,//注册页面获取验证码按钮状态
    disableLoginBtn:false,//登录页面的登录按钮的状态按
    disableRegBtn: false//注册页面的注册按钮的状态按
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     *@desc:判断是不是从外面的分享页面进来注册，如果是从邀请赚积分进来的就会带上inviterid参数,否则inviterid为空
     *@auther:an
     *@date:20190723
     */
    if (options.inviterid) {
      inviterid = options.inviterid;
    }
  },
   /**
   * 获取电话号码的输入框的值
   */
  phoneInput:function(e){
    let phoneNum = e.detail.value.length;
    if (phoneNum == '11' || (/^1[34578]\d{9}$/.test(phoneNum))){
      this.setData({
        phoneNumber: e.detail.value,
        getcodeColortuses: '#fff',
        getCodeBackground: '#ff7382'
      });
    }else{
      this.setData({
        phoneNumber: e.detail.value,
        getcodeColortuses: '#a8a5a5',
        getCodeBackground: '#e5e5e5'
      });
    }  
  },
  /**
   * 注册输入框的电话号码
   */
  regPhoneInput:function(e){
    let regPhoneNumLength = e.detail.value.length;
    if (regPhoneNumLength == '11' && (/^1[34578]\d{9}$/.test(e.detail.value)) && this.data.regPwdNumber != '') {
      this.setData({
        regPhoneNumber: e.detail.value,
        regGetCodeColor: '#fff',
        regGetCodeBackground: '#ff7382'
      });
    } else {
      this.setData({
        regPhoneNumber: e.detail.value,
        regGetCodeColor: '#a8a5a5',
        regGetCodeBackground: '#e5e5e5'
      });
    }
  },
  /**
   * 密码输入框触发函数
   */
  pwdInput:function(e){
    let pwdNum = e.detail.value.length;
    if (pwdNum == '4') {
      this.setData({
        loginBackgroundColr: '#ff7382',
        loginBtnFontColor: '#fff',
        pwdNumber: e.detail.value
      });
    } else {
      this.setData({
        loginBackgroundColr: '#e5e5e5',
        loginBtnFontColor: '#a8a5a5',
        pwdNumber: e.detail.value
      });
    } 
  },
  /**
   * 注册密码输入框触发函数
   */
  regPwdInput:function(e){
    let regPwdNumLength = e.detail.value.length;
    if (regPwdNumLength >= '6' && (/^1[34578]\d{9}$/.test(this.data.regPhoneNumber))  ){
      this.setData({
        regPwdNumber: e.detail.value,
        regGetCodeColor: '#fff',
        regGetCodeBackground: '#ff7382'
      });
    }else{
      this.setData({
        regPwdNumber: e.detail.value,
        regGetCodeColor: '#a8a5a5',
        regGetCodeBackground: '#e5e5e5'
      });
    }
  },
  /**
   * 注册中获取验证码的输入框触发的函数
   */
  regCodeInput: function (e) {
    let regCodeLength = e.detail.value.length;
    if (regCodeLength == '4' && this.data.regPwdNumber != '' && this.data.regPhoneNumber != ''){
      this.setData({
        regGetCode: e.detail.value,
        regBackgroundColr: '#ff7382',
        regBtnColor: '#fff'
      });
    }else{
      this.setData({
        regGetCode:'',
        regBackgroundColr: '#e5e5e5',
        regBtnColor: '#a8a5a5'
      });
    }
  },
  /**
   * 密码登录电话号码设置输入值
   */
  pwdLoginPhoneInput:function(e){
    this.setData({
      pwdLoginNumber: e.detail.value
    });
  },
  /**
   * 密码登录密码输入框的值
   */
  pwdLoginPwdInput:function(e){
    this.setData({
      pwdLoginCode: e.detail.value
    });
  },
  /**
   * 密码登录页面电话号码输入框失去焦点触发的函数
   */
  pwdLoginUserBlur:function(){
    let pwdLoginNu = this.data.pwdLoginNumber,
        pwdLoginCode = this.data.pwdLoginCode;
    //打印日志
    console.log("密码登录页面电话号码======" + pwdLoginNu + "密码登录页面密码====" + pwdLoginCode);
    //对验证码和电话号码进行校验
    if (pwdLoginNu == '' || !(/^1[34578]\d{9}$/.test(pwdLoginNu)) || pwdLoginCode == ''){
      return;
    }else{
      this.setData({
        pwdLoginBackgroundColr: '#ff7382',
        pwdLoginBtnFontColor: '#fff'
      });
    }
  },
  /**
   * 密码登录中密码输入框失去焦点时触发的函数
   */
  pwdLoginPwdBlur:function(){
    let pwdLoginCode_p = this.data.pwdLoginCode,
        pwdLoginNu_p = this.data.pwdLoginNumber;
    console.log("密码登录页面电话号码======" + pwdLoginNu + "密码登录页面密码====" + pwdLoginCode);
    if (pwdLoginCode_p == '' || pwdLoginNu_p == '' || !(/^1[34578]\d{9}$/.test(pwdLoginNu_p))){
      return;
    }else{
      this.setData({
        pwdLoginBackgroundColr: '#ff7382',
        pwdLoginBtnFontColor: '#fff'
      });
    }
  },
  /**
   * 当焦点失去焦点的时候校验输入的内容
   */
  userBlur:function(){
    let valPhone = this.data.phoneNumber;
        //pwd = this.data.pwdNumber;
    console.log("电话号码======"+valPhone);
    if (!(/^1[34578]\d{9}$/.test(valPhone)) || valPhone == ''){
      this.setData({
        getcodeColortuses: '#a8a5a5',
        getCodeBackground: '#e5e5e5'
      });
    }else{
      this.setData({
        getcodeColortuses: '#fff',
        getCodeBackground: '#ff7382'
      });
    }
  },
  /**
   * 登陆页面点击获取验证码触发的函数
   */
  getCodeFunc:function(){
    console.log("注册输入框的电话号码====" + this.data.phoneNumber);
    if (this.data.phoneNumber == '') {
      return;
    }else{
      //登录页面获取短信验证码的接口
      let that = this,
          countDownNum = that.data.countDownNum;
      //封装网络请求接口
      /**
       * 校验是否已经注册接口地址
      */
      abstac.sms_Interface(app.publicVariable.isRegisteredInterfaceAddress, { phone: that.data.phoneNumber}, 
      function(res){
        console.log("****************校验是否已经注册接口返回的数据***************");
        console.log(res);
        if (res.data.result.code == '2000'){
          abstac.sms_Interface(app.publicVariable.smsInterface, { phone: that.data.phoneNumber, type: '4' },
            function (res) {//调用短信接口成功时返回函数
              console.log("****************调用短信接口成功时返回函数***************");
              console.log(res);
              if (res.data.result.code == 2000) {
                abstac.promptBox('发送成功');//提示框
                /*显示倒计时的数字*/
                that.setData({
                  timer: setInterval(function () {
                    countDownNum--;
                    that.setData({
                      countDownNum: countDownNum,
                      getInfo: '(' + countDownNum + 's)再次获取',
                      getcodeColortuses: '#a8a5a5',
                      getCodeBackground: '#e5e5e5',
                      disableCode:true
                    });
                    if (countDownNum == 0) {
                      clearInterval(that.data.timer);
                      that.setData({
                        countDownNum: '60',
                        getcodeColortuses: '#fff',
                        getCodeBackground: '#ff7382',
                        getInfo: '发送验证码',
                        disableCode:false
                      });
                    }
                  }, 1000)
                });
              } else {
                abstac.promptBox(res.data.result.message);//提示框
              }
            }, function (res) {//调用短信接口失败时返回函数
              console.log(res);
              abstac.promptBox(res.result.errMsg);//提示框
            });
        }else{
          abstac.promptBox(res.data.result.message);//提示框
        }
      },
      function(res){
        console.log(res);
      });
    }
  },
  /**
   * 点击获取验证码触发的函数
   */
  regGetCodeFunc:function(){
    console.log("注册密码======" + this.data.regPwdNumber + "注册输入框的电话号码====" + this.data.regPhoneNumber + "注册验证码===" + this.data.regGetCode);
    if (this.data.regPhoneNumber == ''){
      return;
    }else{
      let that = this,
          countDownNumReg = that.data.countDownNumReg;
      //封装网络请求接口
      /**
       * 校验是否已经注册接口地址
      */
      abstac.sms_Interface(app.publicVariable.isRegisteredInterfaceAddress, { phone: that.data.regPhoneNumber}, 
      function(res){//成功
        console.log("****************校验是否已经注册接口成功时返回函数***************");
        console.log(res);
        if (res.data.result.code == '2000'){//没有注册过
          abstac.sms_Interface(app.publicVariable.smsInterface, { phone: that.data.regPhoneNumber, type: '1' },
            function (res) {//调用短信接口成功时返回函数
              console.log("****************调用短信接口成功时返回函数***************");
              console.log(res);
              if (res.data.result.code == 2000) {
                abstac.promptBox('发送成功');//提示框
                /*显示倒计时的数字*/
                that.setData({
                  timerReg: setInterval(function () {
                    countDownNumReg--;
                    that.setData({
                      countDownNumReg: countDownNumReg,
                      getInfoReg: '(' + countDownNumReg + 's)再次获取',
                      regGetCodeColor: '#a8a5a5',//获取验证码按钮的字体的颜色
                      regGetCodeBackground: '#e5e5e5',
                      disableCodeReg:true
                    });
                    if (countDownNumReg == 0) {
                      clearInterval(that.data.timerReg);
                      that.setData({
                        countDownNumReg: '60',
                        regGetCodeColor: '#fff',//获取验证码按钮的字体的颜色
                        regGetCodeBackground: '#ff7382',
                        getInfoReg: '发送验证码',
                        disableCodeReg:false
                      });
                    }
                  }, 1000)
                });
              } else {
                abstac.promptBox(res.data.result.message);//提示框
              }
            },
            function (res) {//调用短信接口失败时返回函数
              console.log(res);
              abstac.promptBox(res.result.errMsg);//提示框
            });
        }else{
          abstac.promptBox(res.data.result.message);//提示框
        }
      },
      function(res){//失败
        console.log(res);
      });
      return;
    }
  },
  /**
   * 点击注册按钮触发函数
   */
  regFunc:function(){
    console.log("注册密码======" + this.data.regPwdNumber + "&注册输入框的电话号码====" + this.data.regPhoneNumber + "&注册验证码===" + this.data.regGetCode + "&邀请人的id=" + inviterid);
    if (this.data.regPwdNumber == '' || this.data.regPhoneNumber == '' || this.data.regGetCode == ''){
      abstac.promptBox('请您检查输入的内容是否正确');//提示框
      return;
    }else{
      wx.navigateTo({
        url: '/pages/login/inputNickName/inputNickName?regCode=' + this.data.regPwdNumber + '&regPhone=' + this.data.regPhoneNumber + '&verificationCode=' + this.data.regGetCode + '&inviterid=' + inviterid,
      })
    }
  },
  /**
   * 密码登录页面登录按钮触发的函数
   */
  pwdLoginFunc:function(){
    console.log("密码登录页面电话号码=====" + this.data.pwdLoginNumber + "密码登录页面密码=====" + this.data.pwdLoginCode);
    let pwdLoginNumber = this.data.pwdLoginNumber,
        pwdLoginCode = this.data.pwdLoginCode;
    if (pwdLoginNumber == '' || pwdLoginCode == ''){
      return;
    }else{}
  },
  /**
   * 提交按钮的执行的方法
   */
  loginFunc:function(e){
    console.log("电话号码=====" + this.data.phoneNumber + "验证码=====" + this.data.pwdNumber);
    if (this.data.phoneNumber == '' || this.data.pwdNumber == ''){
      this.setData({
        disableLoginBtn: false
      })
      return;
    }else{
      // 封装微信登录
      var that = this;
      that.setData({
        disableLoginBtn: true
      })
      abstac.weChat_Login(function(res){
        console.log(res);
        if (res.code){
          let weCode = res.code;
          //封装网络请求接口
          abstac.promptBox('登录中......');//提示框
          abstac.sms_Interface(app.publicVariable.loginInterfaceAddress, { code: weCode, phone: that.data.phoneNumber, v_code: that.data.pwdNumber },
            function (res) {//成功时返回函数
              console.log("****************手机号、验证码登录接口成功时返回函数***************");
              console.log(res);
              if (res.data.result.code == '2000') {
                let wx_session_key = res.data.data.wx_session_key,
                    nickname = res.data.data.user.nickname,
                    uPhone = res.data.data.user.phone;
                /**
                 * 将用户信息存储，方便后面使用用户的信息
                 */
                wx.setStorageSync('sessionKey', wx_session_key);
                wx.setStorageSync('wxnickname', nickname);
                wx.setStorageSync('wxuPhone', uPhone);
                wx.switchTab({
                  url: '../../pages/index/index'
                })
              } else {
                abstac.promptBox(res.data.result.message);//提示框
                console.log(res.data.result.message);
              }
            },
            function (res) {//失败时返回函数
              console.log(res);
              abstac.promptBox(res.result.errMsg);//提示框
            });
        }else{
          console.log(res.errMsg);
        }
      });
    }
  },
  /**
   * tab的切换
   */
  clickTabb:function(e){
    var that = this;
    if (this.data.currentTabb === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTabb: e.target.dataset.current,
      })
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
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})