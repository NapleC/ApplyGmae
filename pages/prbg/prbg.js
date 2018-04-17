// pages/prbg/prbg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelText: '请选择参赛赛制',
    areaText: '请选择参赛赛区',
    cityText: '请选择参赛城市',
    timeText: '请选择参赛时间地点',
    showView: true,
    qqAllNumber: ["678305675",
      "642859768",
      "704090713",
      "647077971",
      "728814425",
      "728808111",
      "729286848",
    ],
    onLineQQ: "314391406",
    areaQQNumber: '',
    model: ['线上', '线下'],
    modelIndex: 1,
    multiArray: [['华东区', '华北区', '东北区', '华中区', '华南区', '西南区', '西北区'], ["上海", "杭州", "宁波", "南京", "常州", "合肥", "芜湖"]],
    multiIndex: [0, 0],

    timeArray: [['4月14号、上海--虎猫电竞（凤庆路店）（上海市闵行区凤庆路508号二楼二区）', '4月15号、上海--网鱼网咖（金平路店）（上海市闵行区东川路2325号1楼F座）']],
    timeIndex: [0],
    teamName: '',
    leaderName: '',
    leaderPhone: '',
    leaderSteam: '',
    leaderQQ: '',
    playerOneName: '',
    playerOneSteam: '',
    playerOnePhone: '',
    playerTwoName: '',
    playerTwoSteam: '',
    playerThreeName: '',
    playerThreeSteam: '',
    substituteName: '',
    substituteSteam: '',
    teamInfo: '',
    topImageUrl: "https://xys.jggjmm.com/SCWeb/commons/images/lol_top_bg.png",
  },
  picker_model: function (e) {
    var that = this;
    console.log("模式选中的的是：" + e.detail.value);
    that.setData({
      modelIndex: e.detail.value,
      modelText: that.data.model[e.detail.value],
      showView: e.detail.value == 1 ? true : false,
      areaQQNumber: e.detail.value == 1 ? "" : "314391406",
    })
  },
  timePickerChange: function (e) {
    // console.log('timePickerChange，携带值为', e.detail.value)
    // console.log('timeIndex：', e.detail.value[0])
    // console.log('timePicker', this.data.timeArray[0][e.detail.value[0]])
    this.setData({
      timeIndex: e.detail.value,
      timeText: "参赛时间地点：" +this.data.timeArray[0][e.detail.value[0]],
    })
  },
  timePickerColumnChange: function (e) {
    // console.log('timePickerColumnChange', e.detail.value)
    // this.setData({
    //   timeText: "参赛时间地点："+this.data.timeArray[0][e.detail.value],
    // })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value,
      areaText: this.data.multiArray[0][this.data.multiIndex[0]],
      cityText: this.data.multiArray[1][this.data.multiIndex[1]],
      areaQQNumber: this.data.qqAllNumber[this.data.multiIndex[0]],
    })
    console.log('对应区域的QQ群号为：', this.data.areaQQNumber)
    var data = {
      timeArray: this.data.timeArray,
    };
    switch (this.data.multiIndex[0]) {
      case 0:
        // data.multiArray[1] = ["上海", "杭州", "宁波", "南京", "常州", "合肥", "芜湖"];

        switch (this.data.multiIndex[1]) {
          case 0:
            data.timeArray[0] = ['4月14号、上海--虎猫电竞（凤庆路店）（上海市闵行区凤庆路508号二楼二区）', '4月15号、上海--网鱼网咖（金平路店）（上海市闵行区东川路2325号1楼F座）'];
            break;
          case 1:
            data.timeArray[0] = ['4月15号、杭州--杭州龍城网咖（杭州江干区下沙龙湖万亚苑1号楼三楼）'];
            break;
          case 2:
            data.timeArray[0] = ['4月13号、宁波--G4外星人电子竞技俱乐部（宁波市鄞州区钱湖北路399号）'];
            break;
          case 3:
            data.timeArray[0] = ['4月15号、南京--青春飞扬吾友店（南京市江宁区科学园格致路99路文鼎广场4楼109）'];
            break;
          case 4:
            data.timeArray[0] = ['4月13号、常州--典雅网吧（江苏省常州市钟楼区勤业路200号）'];
            break;
          case 5:
            data.timeArray[0] = ['4月8号、合肥--竞界网咖（安徽省合肥市蜀山区高新技术产业开发区海棠路150创新大厦三楼）'];
            break;
          case 6:
            data.timeArray[0] = ['4月8号、芜湖--蓝巨星网咖一店（安徽省芜湖市镜湖区黄山西路18号）'];
            break;
        }
        break;
      case 1:
        // data.multiArray[1] = ["北京", "青岛", "济南"];
        switch (this.data.multiIndex[1]) {
          case 0:
            data.timeArray[0] = ['4月14号、北京--白夜网咖五道口店（北京市海淀区五道口华清嘉园7号楼商务会馆B1）', '4月15号、北京--E聚电竞馆（北京市石景山区鲁谷街道五芳园18号楼底商）'];
            break;
          case 1:
            data.timeArray[0] = ['4月13号、青岛--金梦缘网咖电竞馆（青岛市市北区宣化路78号）'];
            break;
          case 2:
            data.timeArray[0] = ['4月14号、济南--博文网咖（济南市长清区大学城商业街）'];
            break;
        }
        break;
      case 2:
        // data.multiArray[1] = ["长春", "吉林", "沈阳", "大连"];
        switch (this.data.multiIndex[1]) {
          case 0:
            data.timeArray[0] = ['4月6号、长春--网通家园（龙升店）（吉林省长春市南关区郁金香街99号金桔路与樱花街交汇东行30米）'];
            break;
          case 1:
            data.timeArray[0] = ['4月7号、吉林--JF工厂·网络基地（吉林省吉林市昌邑区九站街道翰林路三合馨苑一号楼14.15.16网点）'];
            break;
          case 2:
            data.timeArray[0] = ['4月8号、沈阳--嘉棋网咖（沈阳市铁西区兴顺街南六中路85号）'];
            break;
          case 3:
            data.timeArray[0] = ['4月15号、大连--最网咖不夜城店（大连市中山区站北建设街不夜城网咖火车站对面宏孚大厦旁）'];
            break;
        }
        break;
      case 3:
        // data.multiArray[1] = ["武汉", "郑州", "洛阳"];
        switch (this.data.multiIndex[1]) {
          case 0:
            data.timeArray[0] = ['4月6号、武汉--杰拉网咖（雄楚店）（武汉洪山区雄楚一号购物广场）', '4月7号、武汉--当代极速网络会所（民族大道163号桃园路荷兰风情商业街2楼）'];
            break;
          case 1:
            data.timeArray[0] = ['4月13号、郑州--会场网咖（郑州市惠济区文化路英才街向东800米路南）'];
            break;
          case 2:
            data.timeArray[0] = ['4月8号、洛阳--极度烈焰电子竞技（洛阳市西工区唐宫路中段）'];
            break;
        }
        break;
      case 4:
        // data.multiArray[1] = ["广州", "深圳", "厦门", "福州"];
        switch (this.data.multiIndex[1]) {
          case 0:
            data.timeArray[0] = ['4月7号、广州--壹号电竞馆林和西路店（广东省广州市天河区林和西路93号景星酒店副楼2层）'];
            break;
          case 1:
            data.timeArray[0] = ['4月6号、深圳--圳天网咖（广东省深圳市罗湖区宝安南路2078号深港豪苑3楼）'];
            break;
          case 2:
            data.timeArray[0] = ['4月13号、厦门--宜博电竞馆（福建省厦门市集美区集源路58号109二楼）'];
            break;
          case 3:
            data.timeArray[0] = ['4月14号、福州--城光网吧（福州市台江区西二环中路602号二楼）'];
            break;
        }
        break;
      case 5:
        // data.multiArray[1] = ["成都", "绵阳", "重庆"];
        switch (this.data.multiIndex[1]) {
          case 0:
            data.timeArray[0] = ['4月7号、成都--洋流netpar网咖（成华区建设路8号附一号3楼）'];
            break;
          case 1:
            data.timeArray[0] = ['4月6号、绵阳--遇见网咖（未来店）（四川绵阳高新区万向装饰建材城17栋2楼）'];
            break;
          case 2:
            data.timeArray[0] = ['4月8号、重庆--壹东方电竞馆(南坪店)（重庆市南岸区南坪百联上海城购物中心2层）', '4月14号、重庆--壹东方电竞馆(杨家坪店)(重庆市九龙坡区谢家湾正街59号建设大厦2层(杨家坪公交车站苏宁易购旁)）'];
            break;
        }
        break;
      case 6:
        // data.mutiArray[1] = ["兰州", "西安"];
        switch (this.data.multiIndex[1]) {
          case 0:
            data.timeArray[0] = ['4月6号、兰州--唐Plus电子竞技馆（城关区酒泉路209号(中匈友好大厦4F)）'];
            break;
          case 1:
            data.timeArray[0] = ['4月7号、西安--西安猛犸电竞馆（西安市未央路与凤城二路十字西北角经发大厦4F）'];
            break;
        }
        break;
    }
    this.setData(data);
    this.setData({
      timeIndex: [0],
      timeText: "参赛时间地点：" +this.data.timeArray[0][0],
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ["上海", "杭州", "宁波", "南京", "常州", "合肥", "芜湖"];
            break;
          case 1:
            data.multiArray[1] = ["北京", "青岛", "济南"];
            break;
          case 2:
            data.multiArray[1] = ["长春", "吉林", "沈阳", "大连"];
            break;
          case 3:
            data.multiArray[1] = ["武汉", "郑州", "洛阳"];
            break;
          case 4:
            data.multiArray[1] = ["广州", "深圳", "厦门", "福州"];
            break;
          case 5:
            data.multiArray[1] = ["成都", "绵阳", "重庆"];
            break;
          case 6:
            data.multiArray[1] = ["兰州", "西安"];
            break;
        }
        data.multiIndex[1] = 0;
        break;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  lolSubmitInfo: function () {
    if (this.data.modelText.length != 2) {
      wx.showToast({
        title: '请选择参赛模式！',
        icon: 'none'
      })
      return;
    }
    if (this.data.areaQQNumber.length == 0) {
      wx.showToast({
        title: '请选择参赛赛区与城市！',
        icon: 'none'
      })
      return;
    }
    if (this.data.teamName.length == 0) {
      wx.showToast({
        title: '请填写队伍名称！',
        icon: 'none'
      })
      return;
    }
    if (this.data.leaderName.length == 0) {
      wx.showToast({
        title: '请填写队长姓名！',
        icon: 'none'
      })
      return;
    }
    if (this.data.leaderPhone.length == 0) {
      wx.showToast({
        title: '请填写队长手机号！',
        icon: 'none'
      })
      return;
    }
    if (this.data.leaderSteam.length == 0) {
      wx.showToast({
        title: '请填写队长Steam号！',
        icon: 'none'
      })
      return;
    }
    if (this.data.leaderQQ.length == 0) {
      wx.showToast({
        title: '请填写队长QQ号！',
        icon: 'none'
      })
      return;
    }
    if (this.data.playerOneName.length == 0) {
      wx.showToast({
        title: '请填写队员一姓名！',
        icon: 'none'
      })
      return;
    }
    if (this.data.playerOneSteam.length == 0) {
      wx.showToast({
        title: '请填写队员一Steam号！',
        icon: 'none'
      })
      return;
    }
    if (this.data.playerOnePhone.length == 0) {
      wx.showToast({
        title: '请填写队员一手机号！',
        icon: 'none'
      })
      return;
    }
    if (this.data.playerTwoName.length == 0) {
      wx.showToast({
        title: '请填写队员二姓名！',
        icon: 'none'
      })
      return;
    }
    if (this.data.playerTwoSteam.length == 0) {
      wx.showToast({
        title: '请填写队员二Steam号！',
        icon: 'none'
      })
      return;
    }
    if (this.data.playerThreeName.length == 0) {
      wx.showToast({
        title: '请填写队员三姓名！',
        icon: 'none'
      })
      return;
    }
    if (this.data.playerThreeSteam.length == 0) {
      wx.showToast({
        title: '请填写队员三Steam号！',
        icon: 'none'
      })
      return;
    }

    // memberName:,memberType:,phoneNum:,qqNum:,steamNum:
    var leaderInfo = '{"memberName":"' + this.data.leaderName + '","memberType":"1","phoneNum":"' + this.data.leaderPhone +
      '","steamNum":"' + this.data.leaderSteam + '","qqNum":"' + this.data.leaderQQ + '"}';
    var pInfo1 = '{"memberName":"' + this.data.playerOneName + '","memberType":"2","phoneNum":"' + this.data.playerOnePhone +
      '","steamNum":"' + this.data.playerOneSteam + '","qqNum":""}';
    var pInfo2 = '{"memberName":"' + this.data.playerTwoName + '","memberType":"2","phoneNum":"","steamNum":"' + this.data.playerTwoSteam + '","qqNum":""}';
    var pInfo3 = '{"memberName":"' + this.data.playerThreeName + '","memberType":"2","phoneNum":"","steamNum":"' + this.data.playerThreeSteam + '","qqNum":""}';

    if (this.data.substituteName.length > 0 && this.data.substituteSteam.length > 0) {
      var substituteInfo = '{"memberName":"' + this.data.substituteName + '","memberType":"3","phoneNum":"","steamNum":"' + this.data.substituteSteam + '","qqNum":""}';
    }
    if (substituteInfo != null && substituteInfo.length > 0) {
      this.setData({
        teamInfo: '[' + leaderInfo + ',' + pInfo1 + ',' + pInfo2 + ',' + pInfo3 + ',' + substituteInfo + ']',
      })
    } else {
      this.setData({
        teamInfo: '[' + leaderInfo + ',' + pInfo1 + ',' + pInfo2 + ',' + pInfo3 + ']',
      })
    }
    console.log("teamInfo=== " + this.data.teamInfo);
    this.sendprbgInfo();
  },
  teamNameInput: function (e) {
    this.setData({
      teamName: e.detail.value,
    })
  },
  leaderNameInput: function (e) {
    this.setData({
      leaderName: e.detail.value,
    })
  },
  leaderPhoneInput: function (e) {
    this.setData({
      leaderPhone: e.detail.value,
    })
  },
  leaderSteamInput: function (e) {
    this.setData({
      leaderSteam: e.detail.value,
    })
  },
  leaderQQInput: function (e) {
    this.setData({
      leaderQQ: e.detail.value,
    })
  },
  playerOneNameInput: function (e) {
    this.setData({
      playerOneName: e.detail.value,
    })
  },
  playerOneSteamInput: function (e) {
    this.setData({
      playerOneSteam: e.detail.value,
    })
  },
  playerOnePhoneInput: function (e) {
    this.setData({
      playerOnePhone: e.detail.value,
    })
  },
  playerTwoNameInput: function (e) {
    this.setData({
      playerTwoName: e.detail.value,
    })
  },
  playerTwoSteamInput: function (e) {
    this.setData({
      playerTwoSteam: e.detail.value,
    })
  },
  playerThreeNameInput: function (e) {
    this.setData({
      playerThreeName: e.detail.value,
    })
  },
  playerThreeSteamInput: function (e) {
    this.setData({
      playerThreeSteam: e.detail.value,
    })
  },
  substituteNameInput: function (e) {
    this.setData({
      substituteName: e.detail.value,
    })
  },
  substituteSteamInput: function (e) {
    this.setData({
      substituteSteam: e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  sendprbgInfo() {
    var that = this;
    that.showLoading("正在提交，请稍后！");
    wx.request({
      url: 'https://xys.jggjmm.com/SCWeb/game_userSignUp',
      data: {
        openId: "sakuhfkwauskjdfefrawsdf",
        gameZone: that.data.areaText,
        gameType: "1", //报名类型1是绝地求生、2是英雄联盟
        competitionType: that.data.modelIndex == 1 ? '2' : '1',
        gameZone: that.data.modelIndex == 1 ? that.data.areaText : '',
        city: that.data.modelIndex == 1 ? that.data.cityText : '', //城市
        address: that.data.modelIndex == 1 ? that.data.timeText : '', //参赛时间地点
        groupName: that.data.teamName,  //队伍名称
        memberJsonStr: that.data.teamInfo,//队伍信息
      }, // 这里写请求参数

      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function (res) {
        that.hideLoading();
        console.log("success:" + res.data.info)
        if (res.data.status == "y") {
          wx.showModal({
            title: res.data.info,
            showCancel: false
          })
        } else {
          wx.showModal({
            title: res.data.info,
            showCancel: false
          })
        }

      },
      fail: function (res) {
        that.hideLoading();
        wx.showModal({
          title: '信息提交异常,请稍后再试！',
          showCancel: false
        })
      },
      complete: function (res) {
      },
    })
  },

  thePrbgRule: function () {
    wx.navigateTo({
      url: '../prbgrule/prbgrule'
    })
  },
  showLoading(message) {
    if (wx.showLoading) {
      // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
      wx.showLoading({
        title: message,
        mask: true
      });
    }
  },
  hideLoading() {
    if (wx.hideLoading) {
      // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
      wx.hideLoading();
    }
  },
})