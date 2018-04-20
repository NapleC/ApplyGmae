// pages/competition/competition.js
var util = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider: [],
    swiperCurrent: 0,
    pageNum: 0,
    listData: [], //列表数据
    selectedMatchId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //网络访问，获取轮播图的图片  
    util.getRecommend(function (data) {
      console.log("data" + data);
      that.setData({
        slider: data.data.slider
      })
    });
    that.requestData();
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
      theSessionId: sessionId,
    })
    console.log("sessionId " + that.data.theSessionId)
    wx.request({
      url: 'https://matchminiprogram.jggjmm.com/match_getMatchInfoList ',
      data: {
        pageNum: this.data.pageNum,
        sessionId: that.data.theSessionId,

      }, // 这里写请求参数
      success: function (res) {
        console.log("match_getMatchInfoList==" + res.data.status)
        console.log(res.data)
        if (res.data.status == "y") {
          wx.stopPullDownRefresh()
          if (that.data.pageNum == 0) {
            that.data.listData = [] // 清空数据
          }
          var list = that.data.listData;//拿到获取的数据
          for (var i = 0, lenD = res.data.matchInfoList.length; i < lenD; i++) {
            list.push(res.data.matchInfoList[i])
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
  },
  //轮播图的切换事件  
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可  
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换  
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  competitionItemClick: function (e) {
    var that = this;
    var $data = e.currentTarget.dataset;
    console.log("e competitionItemClick:", $data.id);
    console.log("e index:", $data.index);


    var that = this;
    // 点击图片触发事件
    console.log(that.data.listData[$data.index]);
    that.setData({
      selectedMatchId: that.data.listData[$data.index].matchId
    });
    console.log("selectedMatchId" + that.data.selectedMatchId);

    if (that.data.listData[$data.index].gameCount > 1) {
      wx.navigateTo({
        url: '../enterHome/enterHome?matchId=' + that.data.selectedMatchId,
      })
    } else {
      wx.navigateTo({
        url: '../apply/apply?matchId=' + that.data.listData[$data.index].matchGameId,
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

    this.data.pageNum = 0;
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