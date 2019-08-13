// pages/my/share/share.js
var abstac = require('../../../commonmethod/abstract.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // http://api.prod.tangdada.com.cn/im/item/integral_rule.html
    // optionsurl:'https://sit.tangdadatech.com/im/activities/register/index.jsp',


    introduce: false,
    introduce2: false,


    test: [{
        'name': 'asda'
      },
      {
        'name': 'assafdda'
      },
      {
        'name': 'asdaaa'
      },
      {
        'name': 'asaada'
      },
      {
        'name': 'aasda'
      },
      {
        'name': 'affsda'
      },
    ],

listInviteList:'',










    shareBounced: false, //分享的弹框
    share: '',//分享的标题
    shareImg: false,  //分享卡片图时的背景幕

    pixelRatio: '',//设备像素比 dpr
    shareBjImgs: 'https://sit.tangdadatech.com/h5/cs.png',  //分享的页面背景图
    // shareBjImgs: '',  //分享的页面背景图

    qrcodeImg: '',   //分享的页面二维码


    ImgWidth: '',      //分享的页面宽
    Imgheigght: '',    //分享的页面高

    UserId:'',         //用户id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      wxSessionKey: wx.getStorageSync('sessionKey')
    });


    wx.getSystemInfo({   //获取手机屏幕参数
      success(res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight * 2,
          windowWidth: res.windowWidth * 2,
          // ImgWidth: res.windowWidth * 0.8,
          // Imgheigght: res.windowHeight * 0.8,
          pixelRatio: res.pixelRatio, //设备像素比 dpr
        })
      },
    });

    that.setData({
      ImgWidth: 300,
      Imgheigght: 500,
    });

    that.qrcode()
    that.listInviteList()
  },




  /**
   * @desc:获取我的邀请人员列表的接口
   * @date:2019.07.11
   * @auther:li
   */
  listInviteList: function() {
    var that = this;
    abstac.sms_Interface(app.publicVariable.listInviteInfoInfoInterfaceAddress, {
        wx_session_key: that.data.wxSessionKey
      },
      function(res) { //查询成功
        //打印日志
        console.log("****************获取我的邀请人员列表的接口***************");
        console.log(res);

        //判断是否有数据，有则取数据
        if (res.data.result.code == '2000') {
          var data = res.data.data;
          that.setData({
            listInviteList: data,
          });
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function(error) { //查询失败
        console.log(error);
      });
  },




  myCatchTouch: function() { //防止弹窗页面穿透
    console.log('stop user scroll it!');
    return;
  },


  rules: function() {
    var that = this;
    that.setData({
      introduce: true
    })
  },

  shut: function() {
    this.setData({
      introduce: false
    })
  },

  ruternTo: function () {
    wx.switchTab({
      url: '/pages/my/my'
    })
  },




  // 我的邀请
  MyInvitation: function() {
    var that = this;
    that.setData({
      introduce2: true
    })
  },

  shut2: function() {
    this.setData({
      introduce2: false
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
  onShareAppMessage: function (res) {
    console.log("------ onShareAppMessage ------")
    console.log(res)
    console.log('inviterid=' + this.data.UserId);
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log("转发来自业内按钮")
      return {
        title: '糖大大',
        // imageUrl: '/images/icons/tri.png',
        imageUrl: 'http://shop-visit.oss-cn-hangzhou.aliyuncs.com/file/2017/12/06/13/54/34/1512539674217-1494425123.jpg',
        path: '/pages/login/login?inviterid=' + that.data.UserId,
        success(res) {
          this.setData({
            shareBounced: false,
          })
        }
      }
    } else {
      // 来自右上角转发
      console.log("转发首页")
      return {
        title: '糖大大',
        // imageUrl: '/images/icons/tri.png',
        imageUrl: 'http://shop-visit.oss-cn-hangzhou.aliyuncs.com/file/2017/12/06/13/54/34/1512539674217-1494425123.jpg',
        path: '/pages/login/login?inviterid=' + that.data.UserId,
        success(res) {
          this.setData({
            shareBounced: false,
          })
        }
      }


    }
  },








  // 分享弹框

  showBounced: function () {
    var that = this;

    if (wx.getStorageSync('UserId')){
      var UserId = wx.getStorageSync('UserId')
      let menu = that.data.shareBounced
      that.setData({
        shareBounced: !menu,
        UserId: UserId,
      })
    }else(
      abstac.promptBox("请先登录哦！")
    )

  },



  hideBounced: function () {
    let menu = this.data.shareBounced
    this.setData({
      shareBounced: !menu,
    })
  },






  // 生成分享图
  // 分享弹框

  showShareImg: function () {
    var that = this;

    wx.showLoading({
      title: '绘制海报中..'
    })

    that.setData({
      shareImg: true,
      shareBounced: false,
    })

    //需要注意的是：我们展示图片的域名需要在后台downfile进行配置，并且画到canvas里面前需要先下载存储到data里面
    //先下载下来，比如我们的logo
    wx.downloadFile({
      url: this.data.shareBjImgs,
      success: function (res) {
        console.log(res)
        that.setData({
          shareBjImg: res.tempFilePath
        });
        that.canvasImg()
      }
    })

  },

// im/api/v1/users/list_invite_user.json
  
  qrcode: function () {
    console.log("------ 获取二维码 ------")
    let that = this
    wx.request({
      url: 'https://tangapp.tangdadatech.com/im/api/v1/share/getwxacodeunlimit?page=pages/login/login',
      // method: "GET",
      // responseType: 'arraybuffer',
      data: {
        scene:  that.data.UserId + "&123",
      },
      header: {
        'content-type': 'application/octet-stream',
      },
      success: function (res) {
        console.log("------ 获取二维码成功 ------")
        console.log(res)

        that.setData({
          // qrcodeImg: "data:image/png;base64," + res.data.data
          qrcodeImg: res.data.data  //要想画在base64上得要没修饰过的纯base64
        })

      },
      complete: function (e) { }
    })
  },



  //////////////////////////cavans绘图
  canvasImg() {
    var that = this;

    // 这里是用base64 转成可以写在canvas上的方法，要用原base64
    const fsm = wx.getFileSystemManager();

    var showImgData = that.data.qrcodeImg

    showImgData = showImgData.replace(/\ +/g, ""); //去掉空格方法

    showImgData = showImgData.replace(/[\r\n]/g, "");

    const buffer = wx.base64ToArrayBuffer(showImgData);

    const fileName = wx.env.USER_DATA_PATH + '/share_img.png'

    fsm.writeFileSync(fileName, buffer, 'binary')
    // 这里是用base64 转成可以写在canvas上的方法，要用原base64  END


    const ctx = wx.createCanvasContext('myCanvas');
    const grd = ctx.createLinearGradient(0, 0, this.data.ImgWidth, 0);//创建了一个线性的渐变颜色 前两个参数起点横纵坐标，后两个参数终点横纵坐标
    grd.addColorStop(0, '#000');
    grd.addColorStop(1, '#fff');
    ctx.setFillStyle(grd);                             //为创建的canvans上下文添充颜色  如果没有设置 fillStyle，默认颜色为 black。
    ctx.fillRect(0, 0, this.data.ImgWidth, this.data.Imgheigght);
    ctx.drawImage(this.data.shareBjImg, 0, 0, this.data.ImgWidth, this.data.Imgheigght);   //里面的参数无非就是图片放置的位置即图片的横纵坐标，图片的宽高

    var avatarurl_width = 60;    //绘制的头像宽度
    var avatarurl_heigth = 60;   //绘制的头像高度
    var avatarurl_x = 120;   //绘制的头像在画布上的位置
    var avatarurl_y = 30;   //绘制的头像在画布上的位置

    var qrcode_width = 90;    //绘制的二维码宽度
    var qrcode_heigth = 90;   //绘制的二维码高度
    //绘制的二维码在画布上的位置
    var qrcode_x = (this.data.ImgWidth - qrcode_width) / 2;
    var qrcode_y = this.data.Imgheigght - 120;   //绘制的二维码在画布上的位置  

    // var qrcode_x = 65;
    // var qrcode_y = this.data.Imgheigght - 130;   //绘制的二维码在画布上的位置

    ctx.save();

    ctx.beginPath(); //开始绘制
    //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    // ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);

    // ctx.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因

    // ctx.drawImage(this.data.sharehdImg, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);

    // ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制

    // ctx.setFillStyle("#fff");
    // ctx.setFontSize(15);                               //字大小
    // ctx.setTextAlign('center');                        //是否居中显示，参考点画布中线         
    // ctx.fillText(this.data.shareName, 150, this.data.Imgheigght - 15);    //150:canvas画布宽300，取1/2，中间，100：纵向位置

    // 绘制二维码
    // ctx.drawImage(this.data.qrcodeImg, qrcode_x, qrcode_y, qrcode_width, qrcode_heigth)

    // ctx.drawImage(fileName, qrcode_x, qrcode_y, qrcode_width, qrcode_heigth)

    //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    ctx.arc(qrcode_width / 2 + qrcode_x, qrcode_heigth / 2 + qrcode_y, qrcode_width / 2, 0, Math.PI * 2, false);

    ctx.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因

    ctx.drawImage(fileName, qrcode_x, qrcode_y, qrcode_width, qrcode_heigth);

    ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
    //--------->>>>>>>>>>>>>>>


    // ctx.restore();

    // ctx.setFillStyle("#fff");
    // ctx.setFontSize(25);
    // ctx.setTextAlign('center');
    // ctx.fillText('avsddfgb', 150, 195)

    // ctx.setFillStyle("#000");
    // ctx.setFontSize(10);
    // ctx.setTextAlign('center');
    // ctx.fillText('vsdfvasdf', 125, 366)

    ctx.draw();

    wx.hideLoading()
  },

  saveImg() {    //保存已绘制的卡片



    // //获取相册授权
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.writePhotosAlbum']) {
    //       wx.authorize({
    //         scope: 'scope.writePhotosAlbum',
    //         success() {
    //           console.log('授权成功')
    //         }
    //       })
    //     }
    //   }
    // })


    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.data.ImgWidth,                     //画布宽高
      height: this.data.Imgheigght,

      destWidth: this.data.ImgWidth * this.data.pixelRatio,                 //画布宽高*dpr 以iphone6为准
      destHeight: this.data.Imgheigght * this.data.pixelRatio,

      fileType: 'png',
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath) //生成的临时图片路径
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('123-=-=-=-=-=-=')
            console.log(res);
            wx.showToast({
              title: '保存成功',
            })

            that.setData({
              shareImg: false,
              // shareBounced:false,
            })

          }
        })
      }
    })
  },



  cancelImg() {    //取消已绘制的卡片
    var that = this;
    wx.hideLoading();
    that.setData({
      shareImg: false,
    })
  }

  //////////////////////////cavans绘图





})