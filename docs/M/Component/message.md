# Loading

* 调用

```javascript

this.$messageBox({
    title:'标题', 
    message: '内容',
    showCancelButton: true, //显示取消按钮
    confirmButtonText:'确认按钮文字'
}).then(action => {
    //判断点击的是确认按钮
    if(action== 'confirm') {
        //todo
        window.location.href= '/Wallet/identificationCheck.html';

    }    
})

```