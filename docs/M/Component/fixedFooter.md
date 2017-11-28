# FixedFooter

* 引用

```html

<FixedFooter>下一步</FixedFooter>

```

* price 传递总价， isbenefit 传递是否加上优惠的价格，默认为0

```html

<FixedFooter @click="onNextStep" :price="totalPrice" isbenefit="0">下一步</FixedFooter>

```

* 通过 click 事件接受组件传递回来的点击事件并作处理


```javascript

<FixedFooter @click="onNextStep" :price="totalPrice" isbenefit="0">下一步</FixedFooter>

methods: {
    onNextStep() {
        //todo
    }
}

```