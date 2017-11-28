# 简聊三种前端调试
>一、mac上用Safari调试ios手机的移动端页面

1. 打开iphone手机的开发者模式，流程是：【设置】->【Safari】->【高级】->开启【Web检查器】 ，如图
![图片](/image/web_debug01.png)

2. 打开Mac上Safari的开发者模式，流程是【Safari】->【偏好设置】->【高级】->【在菜单栏中显示“开发”菜单】勾选
![图片](/image/web_debug02.png)
3. 用数据线将iphone手机和mac连接起来，在电脑的safari中按照流程执行：【开发】->【手机名称】->【正在调试的网站】

![图片](/image/web_debug03.jpg)

##### Now 跑一个本地的项目测试一下，要改一下配置host: '172.16.7.66'
![图片](/image/web_debug04.png)

>二、电脑端chrome和安卓端chrome联调

1、 【设置】>【关于手机】>【版本号（Build number）】，对版本号这一项连点7下（这是官方文档里的说法）就会提示“你已成为开发者”。

![图片](/image/web_debug08.png)

2、 手机安装chrome浏览器，并用数据线连接电脑，并允许连接USB调试

![图片](/image/web_debug09.png)

3、 在电脑端打开chrome，打开 chrome://inspect 网页，此时可以看到一个device列表：
![图片](/image/web_debug05.png)

>三、夸平台不需要连接电脑的调试whistle

```
whistle是一款用Node实现的跨平台的Web调试代理工具，支持查看修改http(s)、Websocket连接的请求和响应内容……
详情请看文档：https://avwo.github.io/whistle/
```
1. 需安装Node
2. 安装whistle(npm install –g whistle)
3. 配置代理

    windows配置方法：https://jingyan.baidu.com/article/0aa22375866c8988cc0d648c.html

    Mac配置方法：https://jingyan.baidu.com/article/a378c960849144b3282830dc.html
4. 启动whistle
```
w2 start  w2 restart 重启  w2 stop 停止
```
5. 访问配置页面

	配置完成并启动了whistle后，
	则可访问该地址：http://local.whistlejs.com/
6. 调试远程页面
```
利用whistle提供的weinre和log两个协议，
可以实现修改远程页面DOM结构及自动捕获页面js错误及console打印的信息，
还可以在页面顶部或js文件底部注入指定的脚步调试页面信息。
如：
http://m.aihuishou.com weinre://test
http://m.aihuishou.com log://{test.js}
http://172.16.7.66:8080/ weinre://test
http://172.16.7.66:8080/ log://{test.js}
```

7. 若在手机上调试该页面，则需在手机上设置代理
```
输入电脑ip地址加配置的端口号
如：ip：172.16.7.66 端口：8899
```
![图片](/image/web_debug07.png)

#### ok，看看效果吧
点击页面上方菜单栏的Create按钮，新建一个名为test的分组
![图片](/image/web_debug06.png)

输入域名(或ip:端口)+weinre://test和域名+log://{test.js}

如：
![图片](/image/web_debug10.png)
手机打开需要调试的页面，是不是很眼熟，元素被选中了

![图片](/image/web_debug15.png)

打开test（weinre下有test）

![图片](/image/web_debug11.png)


点击Elements便可查看元素（和pc调试简直一模一样哦）
![图片](/image/web_debug12.png)
当然少不了控制台
![图片](/image/web_debug13.png)
有个缺点，有的object元素查看不全，那就看这张图吧，给你想看的
![图片](/image/web_debug14.png)