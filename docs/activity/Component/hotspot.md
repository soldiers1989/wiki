# 基本设置

* 宽和CMS保持一致，高自定义

* 一栏可配置1、2张图。

* 可超链接也可不加超链接

* 图片可配置

* 前端展示位置可自由配置

#####  基础代码：
```代码块
<template>
  <div class="hotspot">
    <div class="hotbigimage"  v-for="(item,index) in propdata" :key="index">
      <a :href="item.imageLink"><img :src="item.imageUrl"></a>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      propdata:Array
    }
  }
</script>
<style lang="less">
  @import "../../less/reset.less";
  .hotspot{
    .hotbigimage{
      width: 3.57rem;
      margin: 0 auto;
      a{
        img{
          width: 100%;
          display: block;
        }
      }
    }
    .left-image{
      width: 1.76rem;
      float: left;
      img{
        display: block;
        width: 100%;
      }

    }
    .right-image{
      width: 1.76rem;
      float: right;
      img{
        display: block;
        width: 100%;
      }
    }

  }
</style>

```
