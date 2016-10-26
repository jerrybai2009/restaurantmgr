

/*
var signatureUrl = 'api/v1/signature?url=' + location.href.split('#')[0];
$.get(signatureUrl, function(data) {
    if (data && data.status === 'ok') {
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
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

    }

});
*/
console.log(location.href.split('#')[0]);
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxb1a10559fba39dd1', // 必填，公众号的唯一标识
    timestamp: 1477460337, // 必填，生成签名的时间戳
    nonceStr: '8167ab44137343a2', // 必填，生成签名的随机串
    signature: '2e0e9153f9c36f1d1935cdca595ce7901facf609',// 必填，签名，见附录1
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


// Fetch the button you are using to initiate the PayPal flow
var paypalButton = document.getElementById('paypal-button');

var tokenUrl = 'api/v1/token';
$.get(tokenUrl, function(data) {
    braintree.client.create({
        authorization: data
    }, function (clientErr, clientInstance) {
        // Create PayPal component
        braintree.paypal.create({
            client: clientInstance
        }, function (err, paypalInstance) {
            paypalButton.addEventListener('click', function () {
                // Tokenize here!
                paypalInstance.tokenize({
                    flow: 'checkout', // Required
                    amount: 10.00, // Required
                    currency: 'USD', // Required
                    locale: 'en_US',
                    enableShippingAddress: true,
                    shippingAddressEditable: false,
                    shippingAddressOverride: {
                        recipientName: 'Testing',
                        line1: '1234 Main St.',
                        line2: 'Unit 1',
                        city: 'Mountainview',
                        countryCode: 'US',
                        postalCode: '94039',
                        state: 'CA',
                        phone: '123.456.7890'
                    }
                }, function (err, tokenizationPayload) {
                    // Tokenization complete
                    // Send tokenizationPayload.nonce to server
                    console.log(tokenizationPayload.nonce);
                    var checkoutUrl = 'api/v1/checkout';
                    $.ajax({
                        url: checkoutUrl,
                        method: 'POST',
                        data: {
                            payment_method_nonce: tokenizationPayload.nonce,
                            amount: 10.00
                        }
                    }).done(function(data, txt, xhr){
                        alert("Order completed. Transaction id is " + data)
                    }).fail(function(xhr, txt, error){
                        alert("Order failed.");
                    })
                });
            });
        });
    });
});
// Create a Client component



