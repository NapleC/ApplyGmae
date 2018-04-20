//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageNum: 1,
    listData: [], //列表数据
    loginCode: "",
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.registerUser();
        },
        fail: function () {
          wx.showModal({
            title: '用户未授权',
            content: '如需正常使用小程序功能，请点击顶部授权按钮，并点击允许。',
            showCancel: false,
          })
        }
      })
    };
    if (!this.data.hasUserInfo) {
      this.getUserInfo();
    }
  },
  getUserInfo: function (e) {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.registerUser();
      },
      fail: function () {
        wx.showModal({
          title: '用户未授权',
          content: '如需正常使用小程序功能，请点击顶部授权按钮，并点击允许。',
          showCancel: false,
        })
      }
    })
  },
  requestData() {
    var that = this
    console.log("当前页码：" + this.data.pageNum)
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    var sessionId = wx.getStorageSync('theSessionId');
    that.setData({
      theSessionId:sessionId,
    })
    console.log("sessionId " + that.data.theSessionId)
    wx.request({
      url: 'https://matchminiprogram.jggjmm.com/user_getUserMatchList',
      data: {
        pageNum: this.data.pageNum,
        sessionId: that.data.theSessionId,

      }, // 这里写请求参数
      success: function (res) {
        console.log("user_getUserMatchList==" + res.data.status)
        console.log(res.data)
        console.log(res.data)
        if (res.data.status == "y") {
          wx.stopPullDownRefresh()
          if (that.data.pageNum == 1) {
            that.data.listData = [] // 清空数据
          }
          var list = that.data.listData;//拿到获取的数据
          for (var i = 0, lenD = res.data.userSignUpInfoList.length; i < lenD; i++) {
            list.push(res.data.userSignUpInfoList[i])
          }

          that.setData({
            listData: list,//更新数据
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
  }, swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    this.data.pageNum = 1;
    this.requestData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pageNum++;
    this.requestData();
  },
  registerUser() {
    // 注册接口
    var that = this;
    wx.getStorage({
      key: 'loginCode',
      success: function (res) {
        that.setData({
          loginCode: res.data,
        })
        console.log("loginCode" + that.data.loginCode);
        console.log("province" + that.data.userInfo.province);
        console.log("avatarUrl" + that.data.userInfo.avatarUrl);
        wx.request({
          url: 'https://matchminiprogram.jggjmm.com/user_userInfoRegister',
          data: {
            nickName: that.data.userInfo.nickName,
            sex: that.data.userInfo.gender == 1 ? "0" : "1", //性别 0：男  1：女 
            city: that.data.userInfo.province + "-" + that.data.userInfo.city, //城市
            avatarUrl: that.data.userInfo.avatarUrl,  //头像地址
            jsCode: that.data.loginCode,
          }, // 这里写请求参数

          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          success: function (res) {
            console.log(res.data);
            console.log("注册：" + res.data.status);
            if (res.data.status == "y") {
              console.log("theSessionId ：" + res.data.userInfo.sessionId);
              try {
                wx.setStorageSync('theSessionId', res.data.userInfo.sessionId)
              } catch (e) {
              }
              // wx.setStorage({
              //   key: 'theSessionId',
              //   data: res.data.userInfo.sessionId,
              // })
              that.requestData();
              wx.switchTab({
                url: '../home/home',
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

          },
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
