// 获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],//轮播图数据源
    pageNum: 1,
    listData: [], //列表数据
    swiperCurrent: 0,
    selectedMatchId:"",
  },
  homeItemClick: function (e) {
    // var $data = e.currentTarget.dataset;
    // console.log("e data:", $data.id);
    // wx.navigateTo({
    //   url: '../apply/apply?matchId=' + that.data.selectedMatchId,
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
  },
  requestData() {
    var that = this
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
      url: 'https://matchminiprogram.jggjmm.com/home_getHomePageInfo',
      data: {}, // 这里写请求参数
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(" home_getHomePageInfo: "+res.data.status);
        console.log(res.data);
        if (res.data.status == "y") {

          that.data.listData = [] // 清空数据
          that.data.banners = [] // 清空数据
          var bannersList = that.data.banners;//banner数据
          for (var i = 0, lenD = res.data.matchInfoList.length; i < lenD; i++) {
            bannersList.push(res.data.matchInfoList[i])
          }
          var newsList = that.data.listData;//资讯数据
          for (var i = 0, lenN = res.data.newsInfoList.length; i < lenN; i++) {
            newsList.push(res.data.newsInfoList[i])
          }

          that.setData({
            listData: newsList,//更新数据
            banners: bannersList
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
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  swipclick: function (e) {
    var that = this;
    // 点击图片触发事件
    console.log(this.data.banners[this.data.swiperCurrent]);
    that.setData({
      selectedMatchId: this.data.banners[this.data.swiperCurrent].matchId
    });
    console.log("selectedMatchId" + that.data.selectedMatchId);

    if (that.data.banners[that.data.swiperCurrent].gameCount > 1) {
      wx.navigateTo({
        url: '../enterHome/enterHome?matchId=' + that.data.selectedMatchId,
      })
    } else {
      wx.navigateTo({
        url: '../apply/apply?matchId=' + that.data.banners[that.data.swiperCurrent].matchGameId,
      })
    }
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

    // this.data.pageNum = 1;
    this.requestData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.data.pageNum++;
    // this.requestData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})