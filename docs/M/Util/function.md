# function

封装了一些常用函数 

> 以下示例都可以通过 解构赋值 单独引入，不在示例做代码说明

## checkedMobilePhone

检查手机号码是否正确

参数 number

```javascript
import Util from 'util';
Util.checkedMobilePhone('123'); //return false
Util.checkedMobilePhone('18655555555'); //return true

```

## formatDate

取得格式化过的时间字符串

参数 number

```javascript
import Util from 'util';
Util.formatDate(new Date());

/*return
{
    'txt': 2017年7月14日
    '-': 2017-7-14
    ':': 2017-7-14 10:30:00
    'time':14681136212
}
*/

```

## onGeolocation

获取地理位置经纬度

return Object

latitude, longitude

```javascript
import Util from 'util';
Util.onGeolocation( (pos) => {
    console.log(pos.latitude)
    console.log(pos.longitude)
});
*/

```

## local

对本地存储localStorage 做了一层封装，存储的时候加上了时间戳，方便清楚过期的存储

## local.set

设置存储

```javascript
local.set('key', value);

// key: {value:value, time:14627993011}

```

## local.get

获取数据

```javascript
local.get('key');

// {value}

```

## local.clearTimeout

清除已过期数据

```javascript
local.clearTimeout('key');


```

## local.remove

清除指定数据

```javascript
local.remove(['key1', 'key2']);

```

# getWeek

通过日期字符获取周信息
```javascript
getWeek('2017-7-17')

//return  周一

```

# cookie

对cookie 做了封装，方便使用

## cookie.set

设置cookie

```javascript

cookie.set('key', value);

```