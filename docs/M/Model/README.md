# Model 模块

* Model 为基础模块，主要用于接口的调用封装，给业务层提供解耦的方法函数

* 有利于代码的解耦，复用，以及重构

## 封装规范

1.接受业务层传过来的业务参数，须在函数体内给默认值，可使用es6 的默认值新特性

2.提供默认参数并于业务层合并

3.利用async/await return一个异步函数给业务层

***示例***

```javascript
//解构Request方法
import {Request} from 'util';

//对外暴露getUserInfo方法 需要注明 async 否则 里面 await 将无法执行
export const getUserInfo = async (args = {}) => {

    //设置默认参数
    const defaults = {
        url:'/todo'
    }

    //利用es6的特性合并参数并使用async/await return 结果给业务层
    return await Request({...defaults, ...args});
}

```


## 目录

* [User](./M/Model/user.md)

* [待补充]()
