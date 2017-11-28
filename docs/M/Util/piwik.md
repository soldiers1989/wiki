# piwik

因为SPA 单页特性，所以需要对piwik埋点 每次setCustomUrl() 一下并封装成几个方法方便使用

## setViewPage

需要每次页面中自行调用

```javascript
import Util from 'util';

Util.piwik.setViewPage('/trade/index');

//OR

import {piwik} from 'util';

piwik.setViewPage('/trade/index');

//发送页面请求中会更新为 xx.com/xx/#/trade/index

```

## pushTrack

事件埋点，在各种事件触发中调用

**array** piwik参数，参照旧的埋点参数

```javascript
import Util from 'util';

Util.piwik.pushTrack(['trackEvent', 'M-track-pid', `productid/${productIds.join('/')}`, 'pid'], '/trade/index');

//OR

import {piwik} from 'util';

piwik.pushTrack(['trackEvent', 'M-track-pid', `productid/${productIds.join('/')}`, 'pid'], '/trade/index');

//发送页面请求中会更新为 xx.com/xx/#/trade/index

```
