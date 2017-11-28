# 基本设置

* 宽100%，高自定义

* 可超链接也可不加超链接

* 图片可配置

* 前端展示位置可自由配置

#####  基础代码：
```代码块
<template>
  <div>
    <div class="columnimage" >
      <a :href="item.imageLink" v-for="(item,index) in propdata" :key="index"><img :src="item.imageUrl"></a>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      propdata: Array
    }
  }
</script>
<style lang="less">
  .columnimage {

    img {
      width: 100%;
      display: block;
    }
  }
</style>

```
