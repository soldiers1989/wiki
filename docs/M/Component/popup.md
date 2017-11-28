# Popup

* 引用

```html

<Popup>
<!--other html-->
</Popup>

```

* cancelTxt 取消按钮文案， title 弹出层标题

```html

<Popup cancelTxt="关闭" title="增值券"></Popup>

```

* subTxt 地步确认按钮文案，不穿则不显示按钮


```html

<Popup subTxt="使用" cancelTxt="关闭" title="增值券"></Popup>


```
* onShow 父组件通过传递onShow 的  data 数据告诉组件是否需要显示，true 和 false

* hideEvent 取消按钮触发时的回调函数

* submit 确认按钮触发时的回调函数

``` html
 <Popup 
    subTxt="使用" 
    cancelTxt="关闭" 
    title="增值券" 
    :onShow="incrementShow" 
    @hideEvent="onHideIncrement" 
    @submit="onSubIncrement">
           otherhtml
</Popup>
```