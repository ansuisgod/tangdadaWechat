//index.js
//获取应用实例
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
    allOtherArea:'0'
  },
  onLoad: function () {
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
    }
    var mtabW = app.globalData.mtabW / 5;
    this.setData({
      tabW: mtabW,
      platform: app.globalData.platform,
      navH: app.globalData.navHeight
    })
    this.getDataList();//获取数据
  },
  /**
   * @desc:获取数据列表信息
   * @param：size：获取数据条数 page：页数
   */
  getDataList:function(){
    var that = this,
        platForms = abstac.mobilePhoneModels(this.data.platform);//手机型号
    abstac.promptBox("数据加载中...");
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
            abstac.promptBox("没有数据！");
            //设置数据信息
            that.setData({
              otherTypeDataList: ''//没有则清空信息
            });
            return;
          }else{
            for (var j = 0; j < stres.length; j++) {
              stres[j].data = JSON.parse(stres[j].data);
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
  /**
   * @desc:点击任务触发的函数
   */
  tasks:function(){
    wx.navigateTo({
      url: '../../../task/task'
    })
  },
  /**
   * @desc:点击问专家触发的函数
   */
  bindViewTap: function () {
    wx.navigateTo({
      url: '../../../askTheExperts/askTheExperts'
    })
  },
  allClik:function(e){
    wx.navigateTo({
      url: '../../pages/blog/blogDetail/blogDetail?blogId=' + e.currentTarget.dataset.articlid
    })
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
    if ((current + 1) % 5 == 0) {

    }
    var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });
  },
})
