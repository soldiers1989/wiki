# Request

* 基于 axios 模块进行封装

* 基于es7 的 async/await 异步函数 以 babel 编译为promise

* Request 只支持 ajax 请求

## 使用方式

1.引入整个Util ( **不推荐** )

```javascript
import Util form 'util';
//todo
let data = await Util.Request({...});

```

2.解构赋值Util ( **推荐这种方式** )

```javascript
import {Request} form 'util';
//todo
let data = await Request({...});

```

## 参数

* ***method***  (String) 请求类型，GET|POST 可选，默认GET

* ***url***     (String) 请求URL， **必填**

* ***params***  (Object) 请求参数，GET请求为queryString, POST为请求body, 默认为空 

* ***contentType***  (String) req报文类型，默认text/plain

* ***responseType*** (String) res报文类型，默认json

* ***headers***      (Object) 请求头      默认为空

***示例***

```javascript
import {Request} form 'util';

//todo
const opts = {
    url:'/todo',
    params:{
        id:1
    }
}
let data = await Request(opts);

```
