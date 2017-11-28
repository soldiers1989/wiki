# weixinSDK

## 注入 Request

> 注入Request 后 会自动请求后台获取相关配置参数并进行配置，所以可以直接调用`wx('share')` 等方法，无需手动配置和请求接口

```javascript

import{ wx } from 'util';

wx('use', Request);

```

## 分享

```javascript

wx('share', {
    title: '',//分享标题
    link: window.location.href, //当前页面url
    imgUrl: '', //分享图标的url
    success: function(){},//分享成功的回调 (这里做一些比如分享后可查看之类的需求的时候就用到了)
    cancel: function(){},//取消分享的回调
    fail: function(){} //分享出错/失败 的回调
});

```

## 显示隐藏右上角菜单

```javascript

wx('hide');

wx('show');

```

## 关闭当前微信页面

```javascript

wx('close');

```

## 指定需要隐藏的菜单

### 常用菜单有

* 发送给朋友: "menuItem:share:appMessage"
* 分享到朋友圈: "menuItem:share:timeline"
* 分享到QQ: "menuItem:share:qq"
* 分享到Weibo: "menuItem:share:weiboApp"
* 分享到 QQ 空间/menuItem:share:QZone
* 复制链接: "menuItem:copyUrl"
* 在QQ浏览器中打开: "menuItem:openWithQQBrowser"
* 在Safari中打开: "menuItem:openWithSafari"

```javascript

wx('menu', {
    "menuItem:share:appMessage",
    "menuItem:share:qq"
});

```

## 微信支付

```javascript

wx('pay', {
    timestamp: item.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。
    nonceStr: item.nonceStr, // 支付签名随机串，不长于 32 位
    package: item.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    signType: item.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    paySign: item.paySign, // 支付签名
    success: function (res) {},
    error: function (res) {},
});

```