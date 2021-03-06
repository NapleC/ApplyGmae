// pages/enter/enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId: "",
    val: "",
    showBtn: true,
    showLOL: true,
    showKing: true,
    showPrbg: true,
    bgImageUrl: "",
    btnData: [],
    theSessionId: "",
  },
  //事件处理函数
  btnItemClick: function (e) {
    var that = this;
    var $data = e.currentTarget.dataset;
    console.log("e data:", $data.id);
    console.log("e index:", $data.index);
    console.log("e isEnabled:", that.data.btnData[$data.index].isEnabled);
    if (that.data.btnData[$data.index].isEnabled == '0') {
      wx.showModal({
        title: that.data.btnData[$data.index].promptInfo,
        showCancel: false
      })
    } else if (that.data.btnData[$data.index].isEnabled == '1') {
      wx.navigateTo({
        url: '../apply/apply?matchId=' + $data.id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    console.log("enterHome matchId:" + options.matchId);
    var sessionId = wx.getStorageSync('theSessionId');
    that.setData({
      matchId: options.matchId,
      theSessionId: sessionId,
    })
    console.log("theSessionId" + that.data.theSessionId);
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
      url: 'https://matchminiprogram.jggjmm.com/match_getMatchInfo',

      data: {   // 这里写请求参数
        sessionId: that.data.theSessionId,
        matchId: that.data.matchId,
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log("match_getMatchInfo ：" + res.data.status);
        console.log(res.data);
        if (res.data.status == "y") {
          that.data.btnData = [] // 清空数据
          var btnDataList = that.data.btnData;//拿到获取的数据
          for (var i = 0, lenD = res.data.matchInfo.matchGameInfoList.length; i < lenD; i++) {
            btnDataList.push(res.data.matchInfo.matchGameInfoList[i])
          }

          that.setData({
            btnData: btnDataList,
            bgImageUrl: res.data.matchInfo.matchBg,
          })
          console.log(that.data.btnData);
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
    this.requestData();
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