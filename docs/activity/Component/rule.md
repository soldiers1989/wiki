# 模板说明

* 主要用于活动规则说明。

* 支持换行。
 
* 可设置字体颜色。

# 基本代码

```
<template>
  <div class="rule">
    <div class="text-content">
      <pre :style="{color:propdata.textColor}">{{propdata.textContent}}</pre>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      propdata:Object
    },
    methods: {}
  }
</script>
<style lang="less">
  .rule{
    padding: 0 .32rem .27rem .23rem;
    .title{
      color: #191919;
      font-size: .16rem;
    }
    .text-content{
      pre{
        font-size: .14rem;
        padding-top: .14rem;
        line-height: .2rem;
        word-break: break-all;
        white-space: pre-line;
      }
    }
  }
</style>

```