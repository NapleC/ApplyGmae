Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelText: '',
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
    teamInfo: '',
    topImageUrl: "https://xys.jggjmm.com/SCWeb/commons/images/top.png",
    sloganContentImg: "https://xys.jggjmm.com/SCWeb/commons/images/yiwu_slogan_conten.png",
    bottomImage: "https://xys.jggjmm.com/SCWeb/commons/images/footer_logo.png",
    topTitle: "线上报名",
    matchId:"",
    theSessionId:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sessionId = wx.getStorageSync('theSessionId');
    that.setData({
      matchId: options.matchId,
      theSessionId: sessionId,
    })
    console.log(that.data.matchId);
    console.log(that.data.theSessionId);
    that.requestData();
  },
  requestData() {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    wx.request({
      url: 'https://matchminiprogram.jggjmm.com/match_getMatchGameInfo',

      data: {   // 这里写请求参数
        sessionId: that.data.theSessionId,
        matchGameId: that.data.matchId,
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log("match_getMatchGameInfo ：" + res.data.status);
        console.log(res.data);
        if (res.data.status == "y") {
          
          that.setData({
            bgImageUrl: res.data.matchGameInfo.topImg,

            topImageUrl: res.data.matchGameInfo.topImg,
            sloganContentImg: res.data.matchGameInfo.timeImg,
            bottomImage: res.data.matchGameInfo.footerImg,
          })
        }

      },
      fail: function (res) {
        wx.showModal({
          title: '加载出错',
          showCancel: false
        })
      },
      complete: function (res) {
        wx.hideToast()
        wx.hideNavigationBarLoading()
      },
    })
  },
  lolSubmitInfo: function () {
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
    console.log(that.data.matchId);
    console.log(that.data.theSessionId);
    that.showLoading("正在提交，请稍后！");
    wx.request({
      url: 'https://matchminiprogram.jggjmm.com/sign_userSignUp',
      data: {
        sessionId: that.data.theSessionId,
        matchGameId: that.data.matchId,
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

    var that = this;
    console.log("参赛matchId" + that.data.matchId  );
    // if (that.data.gameType == 1) {
    //   wx.navigateTo({
    //     url: '../kingrule/kingrule'
    //   })
    // } else if (that.data.gameType == 3) {
    //   wx.navigateTo({
    //     url: '../prbgrule/prbgrule'
    //   })
    // }

    wx.navigateTo({
      url: '../normalRule/normalRule?matchId=' + that.data.matchId
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