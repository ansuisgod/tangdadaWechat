/**
 * 抽象出公用的方法
 */

/** 
*@desc: 网络请求封装
*@param：reqUrl：请求的地址、data：传入的需要的参数值（eg:{xxx:aaa,xxx:bbbb}）、succFunc()请求成功时回调函数、failFunc()请求失败时回调函数
*@return 描述返回值的信息
*@author an
*@version v1
*@example sms_Interface()
*/
function sms_Interface(reqUrl, data, succFunc, failFunc){
  wx.request({
    url: reqUrl,
    data: data,
    header: {
      'content-type': 'json' // 默认值
    },
    success:res => {
      succFunc(res);
    },
    fail:res => {
      failFunc(res);
    }
  })
}
/** 
*@desc: 调用微信官方的登录，获取code值
*@param：无
*@return 
*@author an
*@version v1
*@example weChatLogin()
*/
function weChat_Login(succFunc){
  wx.login({
    success:res => {
      succFunc(res);
    }
  })
}

/** 
*@desc: 弹出框
*@param：titleIn：传入的弹出的标题
*@return 描述返回值的信息
*@author an
*@version v1
*@example promptBox()
*/
function promptBox(titleIn){
  wx.showToast({
    title: titleIn,
    icon: 'none',
    duration: 2000
  });
}
/*
* @desc: 产生任意长度随机字母数字组合（伪造手机的设备id）
* @param：randomFlag：是否任意长度、min：任意长度最小位[固定位数]、max：任意长度最大位
* @author an
* @version v1
* @example randomFlag()
*/
function randomWord(randomFlag, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
/**
 * @desc：判断手机的型号的platform的值
 */
function mobilePhoneModels(platform){
  if (typeof(platform) == 'string'){
    var platt = platform.substring(0, 2).toUpperCase();//将字符串转化为大写字母
    /**
    * 判断platformSub为苹果值为1，为安卓值为2
    */
    if (platt == 'IOS') {//如果是ios
      platt = '1';
    }
    if (platt == 'AN' || platt == 'RE') {//如果是安卓
      platt = '2';
    }
    return platt;
  }else{
    return;
  }
  
}

module.exports = {
  sms_Interface: sms_Interface,
  weChat_Login: weChat_Login,
  promptBox: promptBox,
  randomWord: randomWord,
  mobilePhoneModels: mobilePhoneModels
}