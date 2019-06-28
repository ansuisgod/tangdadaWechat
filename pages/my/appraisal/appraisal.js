// pages/my/appraisal/appraisal.js


Page({


  /**
   * 页面的初始数据
   */
  data: {


    shareMenu: false, //第一个弹框

    progressBar: 0, //进度条

    // 普通选择器列表设置,及初始化 性别
    sexList: ['男', '女'],
    sexIndex: '',

    // 年龄
    age: '',

    // 身高
    heightList: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150', '151', '152', '153', '154', '155', '156', '157', '158', '159', '160', '161', '162', '163', '164', '165', '166', '167', '168', '169', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189', '190', '191', '192', '193', '194', '195', '196', '197', '198', '199'],
    heightIndex: '',
    high:'',

    // 体重 
    weightList: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150'],
    weightIndex: '',
    weight:'',

    // 类型
    typeList: ['1型糖尿病', '2型糖尿病', '妊娠糖尿病', '特殊糖尿病'],
    typeIndex: '',

    // 计划
    planList: ['计划怀孕', '处于怀孕期', '都不是'],
    planIndex: '',

    // 年限
    yearList: ['0', '1', '2', '3', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
    yearIndex: '',

    // 是否运动
    moveList: ['是', '否'],
    moveIndex: '',

    // 是否家族史
    familyList: ['是', '否'],
    familyIndex: '',

    // 血糖值
    BloodSugarList: ['≤3.9mmoL/L', '3.9<血糖值<7.0mmoL/L', '7.0<血糖值<15mmoL/L', '≥15mmoL/L'],
    BloodSugarIndex: '',

    // 血脂
    BloodFatList: ['不清楚', '血脂正常', '血脂异常'],
    BloodFatIndex: '',

    // 血压
    BloodPressureList: ['不清楚', '正常或偏低', '高血压患者'],
    BloodPressureIndex: '',

    // 工作类型
    workList: ['卧床', '轻体力劳动', '中等力劳动', '重体力劳动'],
    workIndex: '',

    //您的合并病史
    HistoryList: [{
        name: "糖尿病足病"
      },
      {
        name: "糖尿病肾病"
      },
      {
        name: "糖尿病视网膜病变"
      },
      {
        name: "糖尿病心脑血管病"
      },
      {
        name: "下肢静脉栓塞"
      },
      {
        name: "高尿酸血症"
      },
      {
        name: "脂肪肝"
      },
      {
        name: "急性并发症"
      },
    ],


    now: '', //当前年份

    nums: '0', //已经选择的选项数量

    choose: false, //判断男士计划怀孕是否可点击

    noSelect: '../../../images/personal/checkbox_big_remind.png',
    hasSelect: '../../../images/personal/checkbox_selected_big_remind.png',


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

    arr: '', //其它并发症选项值
    arrText: '', ////其它并发症选项文字

    noChoose: false, // 无并发症是否点击

    noTrigger: false, //判断并发症是否点击过，点击过进度条将不增加

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var date = new Date();
    var year = date.getFullYear();

    that.setData({
      now: year
    });



  },







  // 选择性别函数
  changeSex(e) {
    console.log(e.detail.value)




    if (this.data.sexIndex != '') {
      this.setData({
        sexIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          sexIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          sexIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          sexIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }


      if (this.data.planIndex != '') {
        console.log('zli-=-=')
        if (e.detail.value == 0) {
          this.setData({
            planIndex: 2,
            choose: true,
          });
        }
      } else {
        console.log('zli')
        if (e.detail.value == 0) {
          this.setData({
            planIndex: 2,
            choose: true,
            nums: Number(this.data.nums) + 1,
            progressBar: Number(this.data.progressBar) + 7
          });
        }
      }


    }



    // 
    if (e.detail.value == 0) {
      this.setData({
        planIndex: 2,
        choose: true,
      });
    } else {
      this.setData({
        choose: false,
      });
    }



  },

  // 时间选择器
  changeAge(e) {
    let now = this.data.now;
    let time = e.detail.value;
    console.log(time.slice(0, 4))

    if (this.data.age != '') {
      this.setData({
        age: now - time.slice(0, 4),
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          age: now - time.slice(0, 4),
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          age: now - time.slice(0, 4),
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          age: now - time.slice(0, 4),
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }


  },

  // 身高
  changeHeight(e) {

    if (this.data.heightIndex != '') {
      this.setData({
        heightIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          heightIndex: e.detail.value,
          high: this.data.heightList[e.detail.value],
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          heightIndex: e.detail.value,
          high: this.data.heightList[e.detail.value],
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          heightIndex: e.detail.value,
          high: this.data.heightList[e.detail.value],
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },

  // 体重
  changeWeight(e) {

    if (this.data.weightIndex != '') {
      this.setData({
        weightIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          weightIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          weight: this.data.weightList[e.detail.value],
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          weightIndex: e.detail.value,
          weight: this.data.weightList[e.detail.value],
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          weightIndex: e.detail.value,
          weight: this.data.weightList[e.detail.value],
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },


  // 类型
  changeType(e) {

    if (this.data.typeIndex != '') {
      this.setData({
        typeIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          typeIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          typeIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          typeIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },




  // 计划
  Goplan: function() {
    if (this.data.sexIndex === "0") {
      wx.showToast({
        title: '男士无法选择此项哦!',
        icon: 'none',
        duration: 1500
      })
      return
    }
  },


  changePlan(e) {

    if (this.data.planIndex != '') {
      this.setData({
        planIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          planIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          planIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          planIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },

  // 年限
  changeYear(e) {

    if (this.data.yearIndex != '') {
      this.setData({
        yearIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          yearIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          yearIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          yearIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },


  // 是否运动
  GoToastMove: function() {
    wx.showToast({
      title: '每周运动3-5次，每次至少30分钟',
      icon: 'none',
      duration: 1500
    })
  },

  changeMove(e) {

    if (this.data.moveIndex != '') {
      this.setData({
        moveIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          moveIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          moveIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          moveIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }


  },


  // 是否家族史
  GoToastFamily: function() {
    wx.showToast({
      title: '家族中是否有糖尿病患者',
      icon: 'none',
      duration: 1500
    })
  },

  changeFamily(e) {

    if (this.data.familyIndex != '') {
      this.setData({
        familyIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          familyIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          familyIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          familyIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },


  // 血糖值
  GoToastSugar: function() {
    wx.showToast({
      title: '测试时至少8-10小时未进食，糖尿病未服药情况下',
      icon: 'none',
      duration: 1500
    })
  },

  changeBloodSugar(e) {

    if (this.data.BloodSugarIndex != '') {
      this.setData({
        BloodSugarIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          BloodSugarIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          BloodSugarIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          BloodSugarIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },


  // 血脂
  changeBloodFat(e) {

    if (this.data.BloodFatIndex != '') {
      this.setData({
        BloodFatIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          BloodFatIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          BloodFatIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          BloodFatIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },

  // 血压
  changeBloodPressure(e) {

    if (this.data.BloodPressureIndex != '') {
      this.setData({
        BloodPressureIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          BloodPressureIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          BloodPressureIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          BloodPressureIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },


  // 工作类型
  changeWork(e) {

    if (this.data.workIndex != '') {
      this.setData({
        workIndex: e.detail.value,
      });
    } else {

      if (this.data.nums == 6) {
        this.setData({
          workIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else if (this.data.nums == 13) {
        this.setData({
          workIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        });
      } else {
        this.setData({
          workIndex: e.detail.value,
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        });
      }

    }

  },



  // 选择病史
  chooseNo: function() { //单选的


    var that = this;
    // let menu = that.data.noChoose  //可以取消点击
    // that.setData({
    //   noChoose: !menu,
    // })



    if (!that.data.noTrigger) {
      if (this.data.nums == 6) {
        this.setData({
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        })
      } else if (this.data.nums == 13) {
        this.setData({
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        })
      } else if (this.data.nums == 14) {
        this.setData({})
      } else {
        this.setData({
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        })
      }
    }

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



  chooseHistory: function(e) { //多选的




    if (!this.data.noTrigger) {
      if (this.data.nums == 6) {
        this.setData({
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        })
      } else if (this.data.nums == 13) {
        this.setData({
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 8
        })
      } else if (this.data.nums == 14) {
        this.setData({})
      } else {
        this.setData({
          nums: Number(this.data.nums) + 1,
          progressBar: Number(this.data.progressBar) + 7
        })
      }
    }

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



    if (this.data.progressBar != 0) {

      if (this.data.noTrigger && this.data.arr == '') {
        if (this.data.nums == 7) {
          this.setData({
            nums: Number(this.data.nums) - 1,
            progressBar: Number(this.data.progressBar) - 8,
            noTrigger: false,
          })
        } else if (this.data.nums == 14) {
          this.setData({
            nums: Number(this.data.nums) - 1,
            progressBar: Number(this.data.progressBar) - 8,
            noTrigger: false,
          })
        } else if (this.data.nums == 14) {
          this.setData({})
        } else {
          this.setData({
            nums: Number(this.data.nums) - 1,
            progressBar: Number(this.data.progressBar) - 7,
            noTrigger: false,
          })
        }
      }

    }


  },




  // 弹框
  shareShare: function() {
    var that = this;
    let menu = that.data.shareMenu
    that.setData({
      shareMenu: !menu,
    })

  },

  hideCover: function() {
    let menu = this.data.shareMenu
    this.setData({
      shareMenu: !menu,
    })
  },

  myCatchTouch: function() {
    console.log('stop user scroll it!');
    return;
  },



  GoCalculate: function () { //跳转到信息计算页
    var that = this;

    if (that.data.sexIndex == ''){   //这里需要优化，用&&不知怎么不行。。。
      wx.showToast({
        title: '信息未填写完！1',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.age == '') {   
      wx.showToast({
        title: '信息未填写完！2',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.high == '') {
      wx.showToast({
        title: '信息未填写完！4',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.weight == '') {
      wx.showToast({
        title: '信息未填写完！b',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.typeIndex == '') {
      wx.showToast({
        title: '信息未填写完！bbs',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.planIndex == '') {
      wx.showToast({
        title: '信息未填写完！df',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.yearIndex == '') {
      wx.showToast({
        title: '信息未填写完！asd',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.moveIndex == '') {
      wx.showToast({
        title: '信息未填写完！ca',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.familyIndex == '') {
      wx.showToast({
        title: '信息未填写完！123',
        icon: 'none',
        duration: 1500
      })
      return
    }


    if (that.data.BloodSugarIndex == '') {
      wx.showToast({
        title: '信息未填写完！as',
        icon: 'none',
        duration: 1500
      })
      return
    }


    if (that.data.BloodFatIndex == '') {
      wx.showToast({
        title: '信息未填写完！ddaz',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.BloodPressureIndex == '') {
      wx.showToast({
        title: '信息未填写完！22',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.workIndex == '') {
      wx.showToast({
        title: '信息未填写完！33',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.arr == '') {
      wx.showToast({
        title: '信息未填写完！111',
        icon: 'none',
        duration: 1500
      })
      return
    }


    // if ((that.data.sexIndex == '')   //待需优化
    //   && (that.data.age == '')
    //   && (that.data.high == '')
    //   && (that.data.weight == '')
    //   && (that.data.typeIndex == '')
    //   && (that.data.planIndex == '')
    //   && (that.data.yearIndex == '')
    //   && (that.data.moveIndex == '')
    //   && (that.data.familyIndex == '')
    //   && (that.data.BloodSugarIndex == '')
    //   && (that.data.BloodFatIndex == '')
    //   && (that.data.BloodPressureIndex == '')
    //   && (that.data.workIndex == '')
    //   && (that.data.arr == '')
    // ){
    //   wx.showToast({
    //     title: '信息未填写完！',
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return
    // }






    let InfoDetail = []
    InfoDetail.push({
      gender: Number(that.data.sexIndex) + 1, //性别
      age: that.data.age,  //年龄
      high: that.data.high,  //身高
      weight: that.data.weight,   //体重
      type: Number(that.data.typeIndex) + 1,   //糖尿病类型
      pregnancy: that.data.sexIndex == 0 ? "都不是" : (Number(that.data.planIndex) + 1),  //是否计划
      sick_year: Number(that.data.yearIndex) + 1,   //糖尿病年限
      sport: Number(that.data.moveIndex) + 1,   //是否运动
      history: Number(that.data.familyIndex) + 1,  //是否有家族史
      blood_sugar: Number(that.data.BloodSugarIndex) + 1,  //血糖值
      blood_fat: Number(that.data.BloodFatIndex) + 1,  //血脂值
      blood_pressure: Number(that.data.BloodPressureIndex) + 1,  //血压值
      work: Number(that.data.workIndex) + 1,  //工作类型
      complication: that.data.arr,  //并发症
    })

    // console.log(InfoDetail)
    // console.log(JSON.stringify(InfoDetail))

    // wx.redirectTo
    wx.navigateTo({
      url: '/pages/my/health_review/health_review?InfoDetail=' + JSON.stringify(InfoDetail),
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
  onShareAppMessage: function() {

  }
})