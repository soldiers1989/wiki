# Header

* 引用

```html

<Header></Header>

```

* 通过 h1 标签传递页面title

```html

<Header>
    <h1>我是页面标题</h1>
</Header>

```

* 通过 type 属性 充当props 传递右侧按钮

* ***type***  help(帮助) | location(定位)

* 不传递type 则右侧不显示按钮

```html

<Header type="help">
    <h1>我是页面标题</h1>
</Header>

//or

<Header type="location" :cityInfo="cityInfo">
    <h1>我是页面标题</h1>
</Header>

```