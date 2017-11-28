# 系统主要公共文件说明模块
项目地址：git@code.aihuishou.com:rocky/BMS-FE.git
1. npm install
2. npm run dev   启动项目
3. npm run build   打包

## 面包屑
```
common/breadcrumbs.vue
可在其他页面设置该页面面包屑导航
如：在created生命周期钩子函数中调用
this['setting/setCurrentNav']([{ text: '竞价管理' }, { text: '竞价单列表' }])
```
## 导航
```javascript
对应组件：common/nav.vue
navTree：导航菜单数据

如：export const navTree = [
    {
        icon: 'icon-money',
        name: '竞价管理',
        value: '/bidding',
        sub: [
            {
                sub: [
                    {
                        name: '竞价单列表',
                        value: '/list',
                    },
                    {
                        name: '报价维护',
                        value: '/price',
                    }
                ]
            }
        ]
    }
];
navCollapse：导航是否折叠（true，false）
```
## 路由
```javascript
对应文件：router/index.js

如：
const Vue = require('vue').default;
const Router = require('vue-router').default;

Vue.use(Router);

module.exports = new Router({
    routes: [
        {
            path: '/login',
            components: {
                login: resolve => require(['containers/login/index.vue'], resolve),
            }
        },
        {
            path: '/bidding/price',
            components: {
                nav: resolve => require(['containers/common/nav.vue'], resolve),
                breadcrumbs: resolve => require(['containers/common/breadcrumbs.vue'], resolve),
                body: resolve => require(['containers/bidding/price/index.vue'], resolve),
            }
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
});
```
## 状态机
```
对应文件夹：store

结构：
│── /common.js           	 # 通用的如routeTo（封装的路由及链接跳转），setAuthority（权限设置）
│── /index.js                # 主文件
│ ├── /account/index.js      # 用户相关
└─└── /setting/index.js      # 设置相关如导航设置setCurrentNav
```

## 接口
```
对应文件夹：utils

结构：
└── /api.js            # 接口请求文件

使用了axios
一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端
因此可以使用then，catch，await
如：
await api.getCategory({
    tip: ''
}).then(res => {
    doSomeThing
}).catch(error => {
	console.log(error);
});
```

```javascript
import axios from 'axios';
import { env } from '../config';
import { getFormdata } from './index';

//创建一个实例
export const http = axios.create({
        'develop': {
            'withCredentials': true,
            'baseURL':
                'http://test.newsj.aihuishou.com',
            'headers': {
                'Content-Type': 'multipart/form-data',
            }
        },
        'production': {
            'headers': {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'multipart/form-data',
            },
        }
    }[env]
);
// 添加一个请求拦截器
http.interceptors.request.use(config => {
    config.params = Object.assign(
        { timestamp: Date.now() },
        config.params || {}
    );
    return config;
});
// 添加一个响应拦截器
http.interceptors.response.use(res => {
    let body = res.data;
    if (body.error) {
        return Promise.reject(body);
    }
    return body.data;
}, res => {
    return Promise.reject(res);
});

const request = (config) => {
    let { url, method, data, params } = config;
    return http.request({
        url,
        method: method || 'get',
        data: getFormdata(data),
        params: getFormdata(params, true)
    })
    .then(res => {
        // 通用数据处理
        return res;
    })
    .catch(body => {
        // 通用错误逻辑
        if (body.error === 401) { // 如果401，跳转到登录
            VM.$message({
                message: '请重新登录',
                type: 'warning'
            });
            setTimeout(() => {
                VM.$router.push({path: '/login?returnUrl=' + window.location.pathname + window.location.hash});
            }, 2000);
        } else if (body.error === 403) { // 如果403，提示无权限
            VM.$message({
                message: '没有此api权限: ' + url,
                type: 'warning'
            });
        } else {
            VM.$message({
                message: body.msg || '请求出错',
                type: 'error'
            });
        }
        throw body;
    });
};

const api = {
    getAuthority (config) {
        return request({
            url: '/common/authority/check',
            method: 'post',
            data: config.data
        });
    },
    //创建等级报价百分比
    createLevelprice (config) {
        return request({
            url: '/quoted/levelpricerate/create',
            method: 'post',
            data: config.data
        });
    }
};
export default api;

```
## 常用的方法
```
对应文件夹：utils

结构：
└── /index.js             # 常用的方法

需要用的一些方法可以封装好添加在此文件里
```

```javascript
export const getFormdata = (data, toObj) => { // 转化成formdata
    let ret;
    if (toObj) {
        ret = {};
    } else {
        if (typeof FormData === 'undefined') return {};
        ret = new FormData();
    }

    for (let key in data) {
        let value = data[key];
        if (value === undefined || value === null) continue;
        function travel (value, path) { // 如果为数组或者对象继续递归，到简单值为止，再把最终path和value添加进form
            if (value instanceof Array) {
                value.forEach((v, i) => {
                    travel(v, `${path}[${i}]`);
                });
            } else if (value instanceof Object) {
                for (let prop in value) {
                    travel(value[prop], `${path}.${prop}`);
                }
            } else {
                if (value === undefined || value === null) return;
                if (toObj) {
                    ret[path] = value;
                } else {
                    ret.append(path, value);
                }
            }
        }
        travel(value, key);
    }
    return ret;
};

export function formatDate (date) { // 标准化时间格式
    if (!date) return '';
    date = new Date(date);
    function fillZero (num) {
        num = +num;
        return num <= 9 ? '0' + num : '' + num;
    }
    let [Y, M ,D] = [
        date.getFullYear(),
        fillZero(date.getMonth() + 1),
        fillZero(date.getDate())
    ];

    let [h, m ,s] = [
        fillZero(date.getHours()),
        fillZero(date.getMinutes()),
        fillZero(date.getSeconds())
    ];
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

export function getElementTop (elem) { //获取dom元素到浏览器顶端的距离
    let elemTop = elem.offsetTop;
    elem = elem.offsetParent;
    while ( elem != null ) {
        elemTop += elem.offsetTop;
        elem = elem.offsetParent;
    }
    return elemTop;
};
function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
    if(i<10) { 
        i = "0" + i; 
    } 
    return i;
} 
//倒计时
export function leftTimer (date) {
    let leftTime = new Date(date) - new Date(); //计算剩余的毫秒数 
    let days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
    let hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
    let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
    let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
    days = checkTime(days); 
    hours = checkTime(hours); 
    minutes = checkTime(minutes); 
    seconds = checkTime(seconds); 
    // setInterval(leftTimer(date),1000);
    return days+"天" + hours+":" + minutes+":"+seconds;
}
//根据测试环境及线上环境获取domain
export function getDomainUrl (date) {
    let url = '';
    if (/^sj.aihuishou\.com/.test(document.domain)) {
        url = 'http://sj.aihuishou.com';
    } else {
        url = 'http://test.newsj.aihuishou.com';
    }
    return url;
}
```