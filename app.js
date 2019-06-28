//app.js
  var httpAdress = 'https://sit.tangdadatech.com';//接口的域名地址
  //var httpAdress = 'http://172.16.4.58:8093';//接口的域名地址
App({
  onLaunch: function () {
    var that = this
    /**
     * 开始从本地缓存中查找sessionKey 和 appendid
     * 注释: 如果找到了这个sessionKey值则说明已经注册的用户，就向跳转到首页
     *       如果没找到这个sessionKey值则说明没有注册，就跳转到注册的页面
     */
    var sessinKey = wx.getStorageSync('sessionKey') || [];
    if (sessinKey == ''){
      console.log('sessinKey=' + sessinKey);
      wx.navigateTo({
        url: '/pages/login/login'
      });

    }else{
      console.log('index');
      wx.switchTab({
        url: '/pages/index/index'
      })
    }



    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }







    /*wx.login({
      success: res => {
        console.log(res);
      }
    })*/
    // 获取用户信息
    
    // 获取手机系统信息
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 10;
        this.globalData.platform = res.model;
        this.globalData.mtabW = res.windowWidth;
      }, fail(err) {
        console.log(err);
      }
    })


    // 初始化饮食挑选区状态
    that.initFoodsList()

  },









  // ///////////////////////////////////////  饮食挑选区

  // 饮食挑选区
  // 初始化饮食挑选区状态
  initFoodsList: function () {
    var that = this
    // 获取饮食挑选区信息
    wx.getStorage({
      key: 'foodsList',
      success: function (res) {
        console.log(res)
        if (!res) {
          wx.setStorageSync('foodsList', that.globalData.foodsList)
        } else {
          if (res.data.length > 0) {
            that.globalData.foodsList = res.data
          }
        }
      },
      fail: function (res) {
        wx.setStorageSync('foodsList', that.globalData.foodsList)
      },
      complete: function (res) {
      }
    })
  },

  // 添加食品到饮食挑选区
  addFoodsList: function (param) {
    var that = this
    let info = wx.getStorageSync('foodsList')
    info.push(param)
    that.globalData.foodsList = info
    wx.setStorageSync('foodsList', that.globalData.foodsList)
  },
  // 删除饮食挑选区的指定商品
  deleteFoodsList: function (id) {
    var that = this
    let info = wx.getStorageSync('foodsList')
    for (let i = 0; i < info.length; i++) {
      if (info[i].id === id) {
        info.splice(i, 1)
        that.globalData.foodsList = info
        wx.setStorageSync('foodsList', that.globalData.foodsList)
      }
    }
  },



// ///////////////////////////////////////  饮食挑选区END










  globalData: {
    userInfo: null,
    foodsList: [], //饮食挑选区信息
  },
  //富文本解析方法
  convertHtmlToText: function (inputText){
    var returnText = "" + inputText;
    const regex = new RegExp('<img', 'gi');
    returnText.replace(regex, '<img style="width:100%;height:auto;display:block;margin: 0 auto;" ');
    return returnText;
  },
  //全局公用变量
  publicVariable:{

    // an
    session_key: wx.getStorageSync('sessionKey'),
    smsInterface: httpAdress+'/im/api/v1/others/verification_code.json',//获取验证码的接口地址
    loginInterfaceAddress: httpAdress + '/im/api/v1/others/weixin_login.json',//登录的接口地址
    registerInterfaceAddress: httpAdress + '/im/api/v1/users/register.json',//注册的接口地址
    isRegisteredInterfaceAddress: httpAdress + '/im/api/v1/users/is_registered.json',//校验是否已经注册接口地址
    blogInterfaceAddress: httpAdress + '/im/api/v1/topics/topic_list_tag.json',//帖子的接口
    blogDetailInterfaceAddress: httpAdress + '/im/api/v1/topics/show_topic.json',//帖子详情的接口
    commentsInterfaceAddress: httpAdress + '/im/api/v1/topics/reply_topic.json',//帖子详情评论或者回复的接口
    toReportInterfaceAddress: httpAdress + '/im/api/v1/report/report_user.json',//举报评论的内容信息的接口
    queryPointsInterfaceAddress: httpAdress + '/im/api/v1/points/query_points.json',//获取当前用户的积分的接口
    goodsListfaceAddress: httpAdress + '/im/api/v1/store/list_item.json',//获取商品列表和单个商品信息，只是传的参数不同【获取商品列表后面参数带page,获取商品详情的则带id参数】
    likeInterfaceAddress: httpAdress + '/im/api/v1/topics/like_topic.json',//给帖子点赞接口
    queryBlogFriendInformationInterfaceAddress: httpAdress + '/im/api/v1/users/user_homepage.json',//查看帖子好友的用户的信息
    attentionOtherInterfaceAddress: httpAdress + '/im/api/v1/friends/follow_user.json',//关注帖友
    postBlogInterfaceAddress: httpAdress + '/im/api/v1/topics/create_topic.json',//发布帖子的接口地址
    fileUploadPicInterfaceAddress: httpAdress + '/im/api/v1/others/file_upload.json',//发布帖子的图片上传接口地址
    enquiryRecordsInterfaceAddress: httpAdress + '/im/api/v1/store/list_user_order.json',//查询商品的兑换的记录
    askTheExpertsInterfaceAddress: httpAdress + '/im/api/v1/topics/topic_list_tag.json',//首页问专家页面的接口
    exportRecommandInterfaceAddress: httpAdress + '/im/api/v1/professional/list_professional2.json',//推荐专家接口
    searchArticalInterfaceAddress: httpAdress + '/im/api/v1/topics/search_topic.json',//搜索文章的接口
    queryUserInformationInterfaceAddress: httpAdress + '/im/api/v1/users/user_info.json',//查询用户信息接口
    indexGetDataInterfaceAddress: httpAdress + '/im/api/v1/topics/list_index_recommended.json',//查询首页全部的数据信息
    indexOtherTypeGetDataInterfaceAddress: httpAdress + '/im/api/v1/topics/list_recommended_topic.json',//查询首页其他类型的数据信息
    increaseknowledgeInterfaceAddress: httpAdress + '/im/api/v1/article/article_list_by_tag.json',//涨知识类型的数据信息
    indexTaskSportsInterfaceAddress: httpAdress + '/im/api/v1/tasks/list_activity_task.json',//首页的活动/活动任务接口
    everyDayTaskInterfaceAddress: httpAdress + '/im/api/v1/tasks/list_everyday_task.json',//首页的活动/每日任务接口
    searchGoodFrendInterfaceAddress: httpAdress + '/im/api/v1/friends/search_friend.json',//搜索帖友的接口
    storageDraftBoxFrendInterfaceAddress: httpAdress + '/im/api/v1/note/create_topic_notes.json',//存入草稿箱的接口
    getDraftBoxNumberInterfaceAddress: httpAdress + '/im/api/v1/note/list_topic_notes.json',//存入草稿箱的接口
    contactInformationInterfaceAddress: httpAdress + '/im/api/v1/store/exchange_item.json',//商城兑换商品填写提交用户兑换的地址信息接口







    // li
    myBadgeInterfaceAddress: httpAdress + '/im/api/v1/badge/list_all_badges.json',//获取当前用户的徽章的接口
    followsInterfaceAddress: httpAdress + '/im/api/v1/friends/list_follows.json',//获取我的关注的接口
    fansInterfaceAddress: httpAdress + '/im/api/v1/friends/list_fans.json',//获取我的粉丝的接口
    getSugarInterfaceAddress: httpAdress + '/im/api/v1/evaluate/get_sugar_log.json',//获取我的血糖记录的接口  （也是血糖统计的接口）
    foodCategoryInterfaceAddress: httpAdress + '/im/api/v1/tang/info/food_category.json',//获取食物热量估算的接口  //获取我的饮食记录大分类的接口
    newSugarInterfaceAddress: httpAdress + '/im/api/v1/evaluate/new_sugar_log.json',//提交血糖记录的接口
    getSportInterfaceAddress: httpAdress + '/im/api/v1/evaluate/get_sport_log.json',//获取我的运动记录列表的接口
    sportCategoryInterfaceAddress: httpAdress + '/im/api/v1/tang/info/sport_category.json',//获取我的运动大分类列表的接口
    sportListInterfaceAddress: httpAdress + '/im/api/v1/tang/info/sport_list.json',//获取我的运动小分类列表的接口
    favoriteSportInterfaceAddress: httpAdress + '/im/api/v1/tang/info/favorite_sport.json',//获取我的运动记录详情是否收藏的接口
    sportInfoInterfaceAddress: httpAdress + '/im/api/v1/tang/info/sport_info.json',//获取我的运动记录详情的接口
    favoriteAddDelInterfaceAddress: httpAdress + '/im/api/v1/tang/info/favorite_sport.json',//点击运动收藏取消的接口
    newSportInterfaceAddress: httpAdress + '/im/api/v1/evaluate/new_sport_log.json',//添加新的运动记录的接口
    favoriteSportListInterfaceAddress: httpAdress + '/im/api/v1/tang/info/favorite_sport_list.json',//我的运动收藏列表的接口
    searchSportInterfaceAddress: httpAdress + '/im/api/v1/tang/info/search_sport.json',//我的运动列表搜索的接口
    getWeightInterfaceAddress: httpAdress + '/im/api/v1/evaluate/get_weight_log.json',//获取我的体重记录列表的接口
    newWeightInterfaceAddress: httpAdress + '/im/api/v1/evaluate/new_weight_log.json',//添加新的体重记录的接口

    // 以下暂未记录接口
    getPressureInterfaceAddress: httpAdress + '/im/api/v1/evaluate/get_pressure_log.json',//获取我的血压记录列表的接口
    newPressureInterfaceAddress: httpAdress + '/im/api/v1/evaluate/new_pressure_log.json',//添加新的血压记录的接口(也是修改的接口)
    doEvaluateInterfaceAddress: httpAdress + '/im/api/v1/evaluate/do_evaluate.json',//健康评测的接口
    deletePressureInterfaceAddress: httpAdress + '/im/api/v1/evaluate/delete_pressure_log.json',//删除血压记录接口
    deleteWeightInterfaceAddress: httpAdress + '/im/api/v1/evaluate/delete_weight_log.json',//删除体重记录接口
    deleteSportInterfaceAddress: httpAdress + '/im/api/v1/evaluate/delete_sport_log.json',//删除运动记录接口
    deleteSugarInterfaceAddress: httpAdress + '/im/api/v1/evaluate/delete_sugar_log.json',//删除血糖记录接口
    refGoalInterfaceAddress: httpAdress + '/im/api/v1/tang/info/ref_goal.json',//获取我的参考建议的接口 (根据item字段区分 all获取全部))
    getProfileTextInterfaceAddress: httpAdress + '/im/api/v1/evaluate/get_profile_text.json',//获取我的参考建议文本文字的接口)

    getDietInterfaceAddress: httpAdress + '/im/api/v1/evaluate/get_diet_log.json',//获取我的饮食记录列表的接口  （也是统计的接口）
    foodListInterfaceAddress: httpAdress + '/im/api/v1/tang/info/food_list.json',//获取我的饮食小分类列表的接口
    favoriteFoodListInterfaceAddress: httpAdress + '/im/api/v1/tang/info/favorite_food_list.json',//我的饮食收藏列表的接口
    searchFoodInterfaceAddress: httpAdress + '/im/api/v1/tang/info/search_food.json',//我的饮食搜索的接口
    foodInfoInterfaceAddress: httpAdress + '/im/api/v1/tang/info/food_info.json',//我的饮食详情的接口
    favoriteFoodInterfaceAddress: httpAdress + '/im/api/v1/tang/info/favorite_food.json',//点击食物收藏取消的接口(是否收藏)
    userCenterInterfaceAddress: httpAdress + '/im/api/v1/users/query_user_center.json',//个人中心的接口
    getFeedInterfaceAddress: httpAdress + '/im/api/v1/others/get_feed_back.json',//意见列表的接口

    userTaskInterfaceAddress: httpAdress + '/im/api/v1/tasks/list_user_task.json',//用户已完成任务列表的接口
    listTaskInterfaceAddress: httpAdress + '/im/api/v1/tasks/list_task.json',//任务列表的接口
    badgeRulesInterfaceAddress: httpAdress + '/im/api/v1/badge/query_badge_rules.json',//徽章规则的接口
    badgeProgessInterfaceAddress: httpAdress + '/im/api/v1/badge/list_user_badge_progess.json',//用户完成徽章列表的接口
    myCreateTopicInterfaceAddress: httpAdress + '/im/api/v1/topics/list_my_create_topic.json',//我的发帖列表的接口
    myJoinTopicInterfaceAddress: httpAdress + '/im/api/v1/topics/list_my_join_topic.json',//我的评论列表的接口
    topicNotesInterfaceAddress: httpAdress + '/im/api/v1/note/list_topic_notes.json',//草稿箱列表的接口
    delTopicNotesInterfaceAddress: httpAdress + '/im/api/v1/note/delete_topic_notes.json',//删除草稿箱的接口
    newDietInterfaceAddress: httpAdress + '/im/api/v1/evaluate/new_diet_log_batch.json',//添加食物记录到列表的的接口
    deleteDietInterfaceAddress: httpAdress + '/im/api/v1/evaluate/delete_diet_log.json',//删除食物记录列表的的接口

    setUserInfoInterfaceAddress: httpAdress + '/im/api/v1/users/set_user_info.json',//修改用户信息的接口
    listAlarmInfoInterfaceAddress: httpAdress + '/im/api/v1/tang/alarm/list_alarm.json',//获取提醒记录列表的接口
    setAlarmInfoInterfaceAddress: httpAdress + '/im/api/v1/tang/alarm/set_alarm.json',//新增提醒信息的接口
    deleteAlarmInfoInterfaceAddress: httpAdress + '/im/api/v1/tang/alarm/delete_alarm.json',//删除提醒信息的接口
    alarmInfoInfoInterfaceAddress: httpAdress + '/im/api/v1/tang/alarm/alarm_info.json',//获取提醒信息某个信息的接口
  

      
      






    // http://api.prod.tangdada.com.cn/im/api/v1/badge/query_user_discount.json  不知道干嘛的
    // 暂时不用的
    setRefGoalInterfaceAddress: httpAdress + '/im/api/v1/tang/info/set_ref_goal.json',//修改参考建议的接口 (根据item字段区分 all获取全部))

  }
})