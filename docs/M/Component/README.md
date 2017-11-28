# Component 全局组件

## 编写规范

* 目录放置于component路径

* 写完组件后在/component/indexs.js下按示例引入即可

```javascript

import YourComponts from "./YourComponts.vue";

export default {
    install(Vue) {

        Vue.component('YourComponts', YourComponts);
        
        //other components...
    }
};

```

* 使用

***注意全局组件无需再在单个组件中单独引入***

```html

<YourComponts></YourComponts>

```


## 目录

* [Header](./M/Component/header.md)

* [fixedFooter](./M/Component/fixedFooter.md)

* [popup](./M/Component/popup.md)

* [help](./M/Component/help.md)