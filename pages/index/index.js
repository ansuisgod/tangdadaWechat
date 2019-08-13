//index.js
//获取应用实例
import { $wuxButton } from '../../components/wux'
var abstac = require('../../commonmethod/abstract.js'),
    app = getApp(),
    sizess = '20';
Page({
  data: {
    tabs: ["全部", "涨知识", "糖活动", "糖友荟", "养生糖"],
    activeIndex: 0,
    slideOffset: 0,
    tabW: 0,
    pages:'1',
    dataListInfo:'',
    increaseknowledge:'',
    otherTypeDataList:'',
    typesId:'0',
    allOtherArea:'0',
    // types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    index: 3,
    opened: !1
  },
  onLoad: function (options) {
    /**
     *@desc:判断是不是从外面的分享页面进来的
     *@auther:an
     *@date:20190704
     */
    if (options.come && options.come == 'share') {
      wx.navigateTo({
        url: '/pages/blog/blogDetail/blogDetail?blogId=' + options.blogId
      });
    }
    /**
     * 开始从本地缓存中查找sessionKey 和 appendid
     * 注释: 如果找到了这个sessionKey值则说明已经注册的用户，就向跳转到首页
     *       如果没找到这个sessionKey值则说明没有注册，就跳转到注册的页面
     */
    var sessinKey = wx.getStorageSync('sessionKey') || [];
    if (sessinKey == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      });
    }else{
      this.autoSign();//调用自动签到接口
    }
    var mtabW = app.globalData.mtabW / 5;
    this.setData({
      tabW: mtabW,
      platform: app.globalData.platform,
      navH: app.globalData.navHeight,
      pages:'1'
    })
    this.initButton();
  },
  /**
   * @desc:自动签到接口
   * @param：wx_session_key： 微信cide值，id：80固定写死了
   */
  autoSign:function(){
    var that = this;
    abstac.sms_Interface(app.publicVariable.siginsInterfaceAddress,
      { id: '1', wx_session_key: wx.getStorageSync('sessionKey')},
      function (res) {
        console.log("**********自动签到的接口**********");
        console.log(res);
        if (res.data.result.code == '2000') {
          if (res.data.ext_data == undefined){}else{
            abstac.promptBox("完成签到任务,获取2积分");
          }
        } else {
          abstac.promptBox(res.data.result.message);
        }
      },
      function (error) {
        console.log(error);
      });
  },
  /**
   * @desc:获取数据列表信息
   * @param：size：获取数据条数 page：页数
   */
  getDataList:function(){
    var that = this,
        platForms = abstac.mobilePhoneModels(this.data.platform);//手机型号
    var taggId = this.data.typesId,
        ajaxUrl = '',
        parm = '',
        taggsId = '',
        placess = '0';
    if (taggId == '0'){//全部类型
      ajaxUrl = app.publicVariable.indexGetDataInterfaceAddress;
      parm = { size: sizess, page: this.data.pages };
      this.setData({
        allOtherArea: '0'
      });
      this.getAllData(ajaxUrl, parm);//调用获取查询全部数据信息
      return;
    } else if (taggId == '1') {//涨知识 返回数据接口不一样重新构造方法
      taggId = '0';
      //其他类别查询数据方法
      ajaxUrl = app.publicVariable.increaseknowledgeInterfaceAddress;
      parm = { size: sizess, page: this.data.pages, tag_id: taggId, place: '0', platform: platForms};
      this.getAllData(ajaxUrl, parm);
      this.setData({
        allOtherArea: '2'
      });
    } else if (taggId == '2') {//糖活动 返回数据和全部的接口返回数据不一样重新构造方法
      taggsId = '4';
      //其他类别查询数据方法
      ajaxUrl = app.publicVariable.indexOtherTypeGetDataInterfaceAddress;
      parm = { size: sizess, page: this.data.pages, tagId: taggsId, place: '0' };
      this.otherTypeGetData(taggsId, ajaxUrl, parm);
      this.setData({
        allOtherArea:'1'
      });
      return;
    } else if (taggId == '3') {//糖友荟 返回数据和全部的接口返回数据不一样重新构造方法
      taggsId = '3';
      //其他类别查询数据方法
      ajaxUrl = app.publicVariable.indexOtherTypeGetDataInterfaceAddress;
      parm = { size: sizess, page: this.data.pages, tagId: taggsId, place: '0' };
      this.otherTypeGetData(taggsId, ajaxUrl, parm);
      this.setData({
        allOtherArea: '1'
      });
      return;
    } else if (taggId == '4') {//养生糖 返回数据和全部的接口返回数据不一样重新构造方法
      taggsId = '7';
      //其他类别查询数据方法
      ajaxUrl = app.publicVariable.indexOtherTypeGetDataInterfaceAddress;
      parm = { size: sizess, page: this.data.pages, tagId: taggsId, place: '0' };
      this.otherTypeGetData(taggsId, ajaxUrl, parm);
      this.setData({
        allOtherArea: '1'
      });
      return;
    }
  },
  /**
   * @desc:默认全部查询数据的函数
   * @param:taggsId[传入的类别的id]
   */
  getAllData: function (ajaxUrl, parm){
    var that = this;
    console.log("pages="+this.data.pages);
    //访问接口
    abstac.sms_Interface(ajaxUrl, parm,
      function (res) {
        console.log("*********首页获取信息接口返回的数据*************");
        console.log(res);
        //有则获取数据
        if (res.data.result.code == '2000') {
          //将data字段转化成为json格式
          var str = res.data,
              strLength = res.data.data.length,
              knowledge = res.data.data.list,//涨知识
              newList = that.data.dataListInfo,
              increaseknowledge = that.data.increaseknowledge,
              dataKnowledge = res.data.data.list,
              datas = res.data.data;
            //判断涨知识是否有数据
            if (knowledge == undefined) {
              for (var i = 0; i < strLength; i++) {
                str.data[i].data = JSON.parse(str.data[i].data);
                //desc: 判断阅读次数、分享数、点赞数是否大于一千后面，大于一千后面就加k
                str.data[i].view_size = abstac.judgeGreater(str.data[i].view_size);
                str.data[i].share_num = abstac.judgeGreater(str.data[i].share_num);
                if (str.data[i].topic == undefined){}else{
                  str.data[i].topic.like_num = abstac.judgeGreater(str.data[i].topic.like_num);
                }
              }
              //实现滚动加载数据
              if (that.data.pages == '1'){
                newList = datas;
                //设置数据信息
                that.setData({
                  dataListInfo: datas,
                  increaseknowledge: ''
                });
              }else{
                //设置数据信息
                that.setData({
                  dataListInfo: newList.concat(datas),
                  increaseknowledge: '',
                  pages: that.data.pages
                });
              }
            } else {
              if (that.data.pages == '1'){
                increaseknowledge = dataKnowledge;
                //设置数据信息
                that.setData({
                  dataListInfo: '',
                  increaseknowledge: dataKnowledge
                });
              }else{
                //设置数据信息
                that.setData({
                  dataListInfo: '',
                  increaseknowledge: increaseknowledge.concat(dataKnowledge),
                  pages: that.data.pages
                });
              }
            }
            that.data.pages++;
        } else {
          abstac.promptBox(res.data.result.message);
        }
      }, function (error) {
        console.log(error);
      });
  },
  /**
   * @desc:涨知识、养生糖、糖友荟、糖活动查询数据的函数
   * @param:taggsId[传入的类别的id]
   */
  otherTypeGetData: function (taggsIds, ajaxUrl, parms){
    var that = this;
    //访问接口
    abstac.sms_Interface(ajaxUrl, parms,
      function (res) {
        console.log("*********养生糖、糖友荟、糖活动接口返回的数据*************");
        console.log(res);
        //有则获取数据
        if (res.data.result.code == '2000'){
          var stres = res.data.data[taggsIds].data.topics;
          // 判读是否查到了数据信息
          if (stres == undefined){
            //abstac.promptBox("没有数据！");
            //设置数据信息
            // that.setData({
            //   otherTypeDataList: ''//没有则清空信息
            // });
            return;
          }else{
            for (var j = 0; j < stres.length; j++) {
              stres[j].data = JSON.parse(stres[j].data);
              //desc: 判断阅读次数是否大于一千后面，大于一千后面就加k
              stres[j].topic.view_size = abstac.judgeGreater(stres[j].topic.view_size);
            }
            var otherTy = that.data.otherTypeDataList,
                otherData = res.data.data[taggsIds].data.topics;
            if(that.data.pages == '1'){
              otherTy = otherData;
              //设置数据信息
              that.setData({
                otherTypeDataList: otherData
              });
            }else{
              //设置数据信息
              that.setData({
                otherTypeDataList: otherTy.concat(otherData),
                pages:that.data.pages
              });
            }
            that.data.pages++;
          }
        }else{
          abstac.promptBox(res.data.result.message);
        }
      }, function (error) {
        console.log(error);
      });
  },
  allClik:function(e){
    var topicId = e.currentTarget.dataset.topicid,
        url = e.currentTarget.dataset.html,
        articlid = e.currentTarget.dataset.articlid,
        ids = e.currentTarget.dataset.ids,
        recommend = e.currentTarget.dataset.recommend;
    if (topicId == '-1'){
      console.log(topicId);
      wx.navigateTo({
        url: '../../pages/index/indexOutHtmlPage/indexOutHtmlPage?url=' + url
      })
    } else if (recommend == '1'){
      wx.navigateTo({
        url: '../../pages/index/indexOutHtmlPage/indexOutHtmlPage?url=' + url
      })
    } else if (articlid == '-1'){
      wx.navigateTo({
        url: '../../pages/blog/blogDetail/blogDetail?blogId=' + topicId
      })
    }else{
      wx.navigateTo({
        url: '../../pages/blog/blogDetail/blogDetail?blogId=' + ids
      })
    }
  },
  /**
   * @desc:页面的下拉刷新操作
   */
  onPullDownRefresh:function(){
    this.setData({
      pages: '1'
    });
    this.getDataList();//获取数据
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function(){
    console.log("触底事件的处理函数,页数" + this.data.pages);
    this.getDataList();
  },
  /**
   * @func：tabClick()
   * @desc:tab的切换
   */
  tabClick: function (e) {
    var that = this,
        idIndex = e.currentTarget.id,
        offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离
    console.log(idIndex);

    this.setData({
      activeIndex: idIndex,
      typesId: idIndex,
      slideOffset: offsetW,
      pages: '1'
    });
    this.getDataList();//获取数据
  },
  bindChange: function (e) {
    var current = e.detail.current;
    if ((current + 1) % 5 == 0) {}
    var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });
  },
  /**
   * @desc:重置浮动按钮，优化点击背景隐藏效果
   * @date：20190723
   */
  hidenss: function (){
    this.setData({
      opened: !1,
    });
    this.button = $wuxButton.init('br', {
      buttons: [
        {
          label: '任务',
          icon: "../../static/tasks.png",
        },
        {
          label: '问专家',
          icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562236532578&di=1dbd5447533e8dea28ab5a6419776c23&imgtype=0&src=http%3A%2F%2Fwww.zhongoudoctor.com%2Fimages%2Fupload%2Fimage%2F20150728%2F20150728080306_40888.png",
        }
      ],
      buttonClicked(index, item) {
        index === 0 && wx.navigateTo({
          url: '/pages/index/task/task'
        })

        index === 1 && wx.navigateTo({
          url: '/pages/index/askTheExperts/askTheExperts'
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
  /**
   * @desc:悬浮的按钮动画的效果隐藏和显示菜单
   * @date：20190704
   */
  initButton(position = 'bottomRight') {
    this.setData({
      opened: !1,
    })
    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '任务',
          icon: "../../static/tasks.png",
        },
        {
          label: '问专家',
          icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562236532578&di=1dbd5447533e8dea28ab5a6419776c23&imgtype=0&src=http%3A%2F%2Fwww.zhongoudoctor.com%2Fimages%2Fupload%2Fimage%2F20150728%2F20150728080306_40888.png",
        }
      ],
      buttonClicked(index, item) {
        index === 0 && wx.navigateTo({
          url: '/pages/index/task/task'
        })

        index === 1 && wx.navigateTo({
          url: '/pages/index/askTheExperts/askTheExperts'
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDataList();//获取数据
  },
})
