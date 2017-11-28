# Aside 

组件是官网PC右下角悬浮组件

## 使用方式
```
import Aside from '@/components/Aside'

render(){
  return <Aside />
}

```

## 内部结构

当前组件state

```
state = {
  visible
}
visible：是否显示返回顶部按钮

```

## 事件

componentDidMount
组件内部初始化监听scroll事件

getScroll
返回当前滚动条位置

handleScroll
处理滚动事件

scrollToTop
缓动返回顶部