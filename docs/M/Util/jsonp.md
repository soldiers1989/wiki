# Jsonp

* 基于 jsonp 模块进行封装

* 基于es7 的 async/await 异步函数 以 babel 编译为promise

* Jsonp 只支持 jsonp 请求, 非xmlHttpRequest

## 使用方式

1.引入整个Util ( **不推荐** )

```javascript
import Util form 'util';
//todo
let data = await Util.Jsonp({...});

```

2.解构赋值Util ( **推荐这种方式** )

```javascript
import {Jsonp} form 'util';
//todo
let data = await Jsonp({...});

```

## 参数

* ***url***     (String) 请求URL， ***必填***

* ***params***  (Object) 请求参数， 默认为空 

* ***param***  (String)  回调函数的key，如 fn|callback|cb，默认callback

* ***timeout***  (String) 超时时间，默认为60000

* ***prefix*** (String) 回调函数名称前缀，如 _a123，默认为__jp

* ***name***  (String) 指定回掉函数名，默认为自增整数

***示例***

```javascript
import {Jsonp} form 'util';

//todo
const opts = {
    url:'/todo',
    params:{
        id:1
    }
}
let data = await Jsonp(opts);

```