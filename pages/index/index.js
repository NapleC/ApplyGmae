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
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      this.requestData();
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        this.requestData();
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

          this.requestData();
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  requestData() {
    var that = this
    console.log("当前页码：" + this.data.pageNum)
    if (that.data.listData.length < 1) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500
      })
    } else {
      wx.showNavigationBarLoading()
    }
    wx.request({
      url: 'https://gank.io/api/data/福利/10/' + this.data.pageNum,
      data: {}, // 这里写请求参数
      success: function (res) {
        console.log("请求成功：" + res)
        wx.stopPullDownRefresh()
        if (that.data.pageNum == 1) {
          that.data.listData = [] // 清空数据
        }
        var list = that.data.listData;//拿到获取的数据
        for (var i = 0, lenD = res.data.results.length; i < lenD; i++) {
          list.push(res.data.results[i])
        }

        that.setData({
          listData: list,//更新数据
        })

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
