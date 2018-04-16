// pages/competition/competition.js
var util = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider: [],
    swiperCurrent: 0,
    pageNum: 1,
    listData: [], //列表数据
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
          banners: that.data.listData.slice(0, Math.min(6, that.data.listData.length)) //截取数组
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