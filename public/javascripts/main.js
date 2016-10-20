wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxb1a10559fba39dd1', // 必填，公众号的唯一标识
    timestamp: 1476943845, // 必填，生成签名的时间戳
    nonceStr: 'd7d6e10a1901447a', // 必填，生成签名的随机串
    signature: '98b27ef829f9153344442c7020e518b57044a70d',// 必填，签名，见附录1
    jsApiList: ["chooseImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.onMenuShareTimeline({
    title: '美食餐厅 沸腾鱼', // 分享标题
    link: 'https://restaurantmgr.herokuapp.com', // 分享链接
    imgUrl: 'https://restaurantmgr.herokuapp.com/assets/images/dongbeilapi.jpg', // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});