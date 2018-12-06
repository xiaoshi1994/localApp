// pages/shop/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       shopList:[],
       pageIndex:0,
       pageSize:10,
       catId:1,
       loadMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       console.log(options);
       //设置标题
       wx.setNavigationBarTitle({
            title: options.title,
       })

       //把上个页面传进来的参数设置到当前页面中
       this.setData({
            catId: options.cat
       })

       //获取店铺列表数据
       this.loadMore();
  },

//加载数据的函数
  loadMore(){

       if (!this.data.loadMore) return;

       wx.request({
            url: 'https://locally.uieee.com/categories/' + this.data.catId + '/shops',
            data: {
                 "_page": ++this.data.pageIndex,
                 "_limit": this.data.pageSize
            },
            success: (res) => {
                 console.log(res)
                 var newData = this.data.shopList.concat(res.data);
                 //用来确认是否有更多数据加载
                 var count = res.header['X-Total-Count'] - 0;
                 var flag = this.data.pageIndex * this.data.pageSize < count
               
                 this.setData({
                      shopList: newData,
                      loadMore: flag
                 })
            }
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
       console.log("下拉刷新");

       //1 重新初始化数据
       this.setData({
            pageIndex: 0,
            loadMore: true,
            shopList:[]
       })
       //2 刷新页面
       this.loadMore();

       //3 手动关闭下拉刷新
       wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
       console.log("上拉触底");
       this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})