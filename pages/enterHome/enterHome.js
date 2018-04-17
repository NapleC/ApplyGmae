// pages/enter/enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    competitionId: "",
    val: "",
    showBtn: true,

  },
  //事件处理函数
  prbg: function () {
    wx.navigateTo({
      url: '../prbg/prbg'
    })
  },
  lol: function () {
    wx.navigateTo({
      url: '../lol/lol'
    })
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
    })
    console.log("competitionId:" + this.data.competitionId);
    console.log("val:" + this.data.val);
    console.log("showBtn:" + this.data.showBtn);
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