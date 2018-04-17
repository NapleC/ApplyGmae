Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelText: '请选择参赛城市',
    qqAllNumber: '',
    areaQQNumber: '',
    model: '',
    modelIndex: 0,
    teamAddress: '',
    teamName: '',
    leaderName: '',
    leaderPhone: '',
    leaderQQ: '',
    leaderID: '',
    player1Name: '',
    player1QQ: '',
    player1Phone: '',
    player1ID: '',
    player2Name: '',
    player2QQ: '',
    player2Phone: '',
    player2ID: '',
    player3Name: '',
    player3QQ: '',
    player3Phone: '',
    player3ID: '',
    player4Name: '',
    player4QQ: '',
    player4Phone: '',
    player4ID: '',
    substitute1Name: '',
    substitute1QQ: '',
    substitute1Phone: '',
    substitute1ID: '',
    substitute2Name: '',
    substitute2QQ: '',
    substitute2Phone: '',
    substitute2ID: '',
    teamInfo: '',
    topImageUrl: "https://xys.jggjmm.com/SCWeb/commons/images/lol_top_bg.png",
    competitionId: "",
    val: "",
    showBtn: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数 
    this.setData({
      competitionId: options.competitionId,
      val: options.val,
      showBtn: options.showBtn,

      model: ['盐城', '镇江', '宿迁',
        '无锡', '徐州', '连云港',
        '淮安', '扬州', '常州',
        '泰州', '南京', '苏州',
        '南通',],
      qqAllNumber: [
        "88289909",
        "542046162",
        "530668442",
        "133138641",
        "297457514",
        "208203738",
        "208203738",
        "445115357",
        "160906371",
        "321394224",
        "684785615",
        "261723304",
        "546960484",
      ],
    })
    console.log("competitionId:" + this.data.competitionId);
    console.log("val:" + this.data.val);
    console.log("showBtn:" + this.data.showBtn);
  },
  picker_model: function (e) {
    var that = this;
    console.log("模式选中的的是：" + e.detail.value);
    that.setData({
      modelIndex: e.detail.value,
      modelText: that.data.model[e.detail.value],
      areaQQNumber: that.data.qqAllNumber[e.detail.value],
    })
  },
  lolSubmitInfo: function () {
    if (this.data.areaQQNumber.length == 0) {
      wx.showToast({
        title: '请选择参赛城市！',
        icon: 'none'
      })
      return;
    }
    if (this.data.teamAddress.length == 0) {
      wx.showToast({
        title: '请填写战队学校！',
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
    if (this.data.leaderQQ.length == 0) {
      wx.showToast({
        title: '请填写队长QQ号！',
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
    if (this.data.leaderID.length == 0) {
      wx.showToast({
        title: '请填写队长身份证号！',
        icon: 'none'
      })
      return;
    }
    var leaderInfo = '{"memberName":"' + this.data.leaderName +
      '","memberType":"1","phoneNum":"' + this.data.leaderPhone +
      '","qqNum":"' + this.data.leaderQQ +
      '","idNumber":"' + this.data.leaderID + '","steamNum":""}';

    this.setData({
      teamInfo: '[' + leaderInfo + ']',
    })

    console.log("teamInfo=== " + this.data.teamInfo);
    this.sendprbgInfo();
  },
  //输入框监听
  teamAddressInput: function (e) {
    this.setData({
      teamAddress: e.detail.value,
    })
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
  leaderQQInput: function (e) {
    this.setData({
      leaderQQ: e.detail.value,
    })
  },
  leaderIDInput: function (e) {
    this.setData({
      leaderID: e.detail.value,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  sendprbgInfo() {
    var that = this;
    console.log("参赛赛制类型" + that.data.modelIndex == 1 ? '2' : '1');
    that.showLoading("正在提交，请稍后！");
    wx.request({
      url: 'https://xys.jggjmm.com/SCWeb/game_userSignUp',
      data: {
        gameType: "3", //联通杯
        competitionType: '1', // 线上
        gameZone: '',
        city: that.data.modelText, //城市
        address: that.data.teamAddress, //参赛时间地点
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
            title: '恭喜战队报名成功',
            content: '队长加群：' + that.data.areaQQNumber,
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
  theLolRule: function () {
    wx.navigateTo({
      url: '../lolrule/lolrule'
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