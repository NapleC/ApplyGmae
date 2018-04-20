// pages/normalRule/normalRule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchGameRule: "",
    matchId: "",
    theSessionId: "",
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
      url: 'https://matchminiprogram.jggjmm.com/match_getMatchGameRule',

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
            matchGameRule: res.data.matchGameRule,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})