# Web前端性能优化
##  一、如何排查网页的性能问题
###  1、PageSpeed Insights 网页载入速度检测工具 
   * PageSpeed Insights只考虑网页性能中与网络无关的方面：服务器配置、网页的HTML结构及其所用的外部资源（例如，图片、JavaScript和CSS）
   * [在线测试](https://developers.google.com/speed/pagespeed/)
   * 支持火狐 和 谷歌 
   * 火狐安装（因为版本问题或者firebug下掉了）
   * 谷歌安装 （正常的安装插件流程）
    * 1. 如果你能够打开chrome应用商店，并且可以找到PageSpeed Insights插件，那么直接点击“添加至chrome”
    * 2. 如果开不开应用商店，通过其他途径下载 一个格式CRX，正常安装
    * 但是超级不好用（卡住了） 

* 谷歌安装：

    ![图片](/image/youhua-1.png)

      点击开始分析
    ![图片](/image/youhua-2.png)

* 在线分析：
     
    ![图片](/image/youhua-4.png)

    * 压缩
    * 使用浏览器缓存（PageSpeed Insights检测到您的服务器响应不包含明确的缓存标头或某些资源被指定只缓存一小段时间时，就会触发此规则）
    * 优化图片
    * 清楚首屏内容中阻止呈现的js 和css



   
###  2、Yslow---一款很实用的web性能测试插件
 #### [安装连接 http://developer.yahoo.com/yslow/](http://developer.yahoo.com/yslow/) （点击即可安装）
   * 安装完成
    ![图片](/image/youhua-5.png)
  * Yslow 使用，点击启动插件，点击Run Test 测试当前页面，其中A类评分最高，F为最低

    ![图片](/image/youhua-6.png)

### 3、Google优化工具Timeline的使用（Chrome 57已经改为performance（性能模板））
![图片](/image/youhua-7.png)
* 第二个模块（OverView窗格）右侧提示了FPS（帧频，流畅度），CPU的消耗，NET，HEAP（JavaScript堆内存）
FPS。每秒帧数。绿色竖线越高，FPS 越高。 FPS 图表上的红色块表示长时间帧，很可能会出现卡顿。
* 2.CPU资源
* 3.NET.每条彩色横杆表示一种资源，横杆越长，检索资源所需要的时间越长，每个横杆的浅色部分表示等待时间（请求资源到第一个字节下载完成时间）、
HTML文件是蓝色。脚本是黄色。样式是紫色。媒体文件是绿色。其它资源是灰色。

* 4.底下的summary，Details，选择时间显示该事件相关的信息，未选择事件时，此窗格会显示选定时间范围的相关信息。
细节：保证录制的文件很纯粹（简短，没有不必要的操作，停止浏览器缓存，停用扩展程序（使用隐身登录））

* 第三个模块（火焰图）（第二个模块可以控制范围选择读取网页过程中的页码）（蓝线代表DOMContentLoaded事件，绿线首次绘制的时间，红线代表load事件）
![图片](/image/youhua-8.png)

![图片](/image/youhua-9.png)


## 二、如何优化
### 1.页面优化
 #### 减少http请求（减少请求数，降低请求量）
 其实80% 的时间都是花在下载网页内容的，减少请求的次数就是缩短响应时间的关键；
 * 脚本合并
  * 依赖比较多的，可以合并成一个，这样引用一个就行了
 * css 雪碧图
   * 减少请求
 * 文件压缩
   * 包括css js 图片压缩
   * 方法：
     * jsMin
     * [在线压缩](http://tool.oschina.net/jscompress/)
     * grunt
     * 压缩响应内容：Gzip

 * 延迟加载
 * Css3图片
   * [iconfont公开图标库](http://www.iconfont.cn/collections?personal=1)
   
 * 避免重定向
 > * 301：永久重定向，抓取新内容的同时也将旧的网址替换为重定向之后的网址； 
  *  302：暂时重定向，抓取新的内容而保留旧的网址 
  *  SEO：302好于301  


  - 方法：
    * 定义链接URL时使用最完整的、最直接的地址。如： 
    * 使用www.baidu.com而非baidu.com
    * 使用www.google.com.hk而非www.google.com
    * 使用http://write.blog.csdn.net/而非http://write.blog.csdn.net


 　
#### 外置脚本置底
#### css 放上面

### 2.代码优化
#### 减少对Dom操作
   1. 修改Dom
   2. 修改样式表
   3. 用户事件（鼠标悬停，页面滚动，输入框，改变窗口大小 等等）
      * 重新就是要重新生成布局和重新绘制，前者叫重排（reflow），页面布局出现变动；后者叫重绘（repaint）;重绘不一定重排，如改变元素的颜色（样式的变化）；重排一定会重绘
   4. 一般规则：
      * 样式表越简单，重排重绘就越快；
      * 重排和重绘DOM元素层级越高，成本越高；
      * table 元素的重排重绘 成本高于div 元素
   5. 优化方法：
      * 通过class 改变样式，避免逐条改变；
      * 对display：none元素操作不会引发重排重绘，因此需要多次操作的元素可以改变display的属性 在进行操作；另外，visibility：hidden的元素操作只重绘；
      * 脱离文档流的元素重排开销较小【如：position为absolute或fixed，float元素】，因为对文档流中元素无影响；
  6. 啰嗦一下大神们都知道的基础：
     * 网页生成的过程：
       > * HTML代码转化成DOM
       > * CSS代码转化成CSSOM（CSS Object Model）
       > * 结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
       > * 成布局（layout），即将所有渲染树的所有节点进行平面合成
       > * 将布局绘制（paint）在屏幕上  
  
  ![图片](/image/youhua-10.png)


 7. 对性能的影响

     * 重排和重绘会不断触发，这是不可避免的。但是，它们非常耗费资源，是导致网页性能低下的根本原因
     

        div.style.color = 'blue';
        div.style.marginTop = '30px';

       div元素有两个样式变动，但是浏览器只会触发一次重排和重绘

        div.style.color = 'blue';
        var margin = parseInt(div.style.marginTop);
        div.style.marginTop = (margin + 10) + 'px';

        上面代码对div元素设置背景色以后，第二行要求浏览器给出该元素的位置，所以浏览器不得不立即重排
     * 一般来说，样式的写操作之后，如果有下面这些属性的读操作，都会引发浏览器立即重新渲染

    offsetTop/offsetLeft/offsetWidth/offsetHeight
    scrollTop/scrollLeft/scrollWidth/scrollHeight
    clientTop/clientLeft/clientWidth/clientHeight
    getComputedStyle()

    所以，从性能角度考虑，尽量不要把读操作和写操作，放在一个语句里面。




#### 减少重排 重绘
#### 避免css 表达式
### 3.缓存Ajax
   * Ajax可以帮助我们异步的下载网页内容，但是有些网页内容即使是异步的，用户还是在等待它的返回结果，例如ajax的返回是用户联系人的下拉列表。所以我们还是要注意尽量应用以下规则提高ajax的响应速度。
      *  添加Expires 或 Cache-Control报文头使回复可以被客户端缓存
      * 压缩回复内容
      * 减少dns查询
      * 精简javascript
      * 避免跳转
      * 配置Etags
  1.  Last-Modified和ETags请求的http报头一起使用，服务器首先产生Last-Modified/Etag标记，服务器可在稍后使用它来判断页面是否已经被修改，来决定文件是否继续缓存：
    > 当浏览器第一次请求一个url时，服务器端的返回状态码为200，同时HTTP响应头会有一个Last-Modified标记着文件在服务器端最后被修改的时间。
     浏览器第二次请求上次请求过的url时，浏览器会在HTTP请求头添加一个If-Modified-Since的标记，用来询问服务器该时间之后文件是否被修改过。
      如果服务器端的资源没有变化，则自动返回304状态，使用浏览器缓存，从而保证了浏览器不会重复从服务器端获取资源，也保证了服务器有变化是，客户端能够及时得到最新的资源。
  2. Etag / If-None-Match
    > HTTP协议规格说明定义ETag为“被请求变量的实体值” ((Entity Tag))
     当浏览器第一次请求一个url时，服务器端的返回状态码为200，同时HTTP响应头会有一个Etag，存放着服务器端生成的一个序列值。
    浏览器第二次请求上次请求过的url时，浏览器会在HTTP请求头添加一个If-None-Match的标记，用来询问服务器该文件有没有被修改。
    


    注意：
    Etag 主要为了解决 Last-Modified 无法解决的一些问题:
     1、一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET;
     2、某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)
     3、某些服务器不能精确的得到文件的最后修改时间；


   > Last-Modifed/Etag能够节省一点宽带，但是还会发一个HTTP请求。

  * 1.客户端请求一个页面（A）。
  * 2.服务器返回页面A，并在给A加上一个Last-Modified/ETag。
  * 3.客户端展现该页面，并将页面连同Last-Modified/ETag一起缓存。
  * 4.客户再次请求页面A，并将上次请求时服务器返回的Last-Modified/ETag一起传递给服务器。
  * 5.服务器检查该Last-Modified或ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应304和一个空的响应体。

  
  补充：
  1.缓存：
  * 1）Expires  Cache-Control  Last-Modified  ETag  If-Modified-Since  If-None-Match 这些请求头部在浏览器缓存中分别起什么作用，如何起到缓存的作用？
    * 1.当某一文件在浏览器中第一次被访问的时候，这个时候浏览器是没有缓存的，直接从服务器获取文件，返回给客户端，并且存入浏览器缓存；此时，返回状态码200，并且服务端可以设置响应头部Expires或者Cache-Control，Last-Modified或者ETag。
    * 2.如果设置了Expires或者Cache-Control，那么在指定时间内再次请求该文件时，只要不强制刷新缓存(F5等)，浏览器会直接读取缓存而不再去请求服务器。
    * 3.如果没有设置Expires或者Cache-Control或者过期了，就需要再次请求服务器了，浏览器会发起条件验证，发起请求时在请求头加上If-Modified-Sinse或者If-None-Match，服务器端判断最新的文件是否发生了更新，如果没有，总则返回响应状态码304，并且不带任何响应实体，也就是说，传输到客户端的只有一些相应头部，响应实体是空的，这样就大大减少了传输的体积，浏览器接受到了304响应，就知道了要读取浏览器缓存了。

  * 2）按回车、浏览器刷新按钮、F5、Ctr+F5的区别？
    * 1.按回车，浏览器会判断是否有缓存，并且根据Expires或者Cache-Control判断缓存是否过期，如果没有，就不会发起请求，直接使用缓存。否则就需要像服务器发起请求再验证。
    * 2.浏览器刷新按钮和F5效果相同，不管是否有Expires或者Cache-Control，都会强制去请求服务器，进行再验证，根据If-Modified-Sinse或者If-None-Match判断是否要返回304，如果是，浏览器就会继续使用缓存。
   * 3.按Ctr+F5时，也是不管是否有Expires或者Cache-Control，都会强制去请求服务器，但是并不会进行再验证，服务器会直接把最新的内容返回给浏览器，压根就不考虑缓存的存在或者是否过期。
  * 3）为什么用Last-Modified还不够，要用ETag实体标签验证？
    * 1.有些文档会被周期性的重写，但实际包含的数据是一样的。（尽管内容没有变化，最后修改日期却会发生变化）
    * 2.有些文档可能被修改了，但是修改并不重要，没必要更新缓存。
    * 3.有些服务器无法准确判定页面的最后修改日期。
    * 4.文档在毫秒级间隙发生变化（如实时监控），以秒为颗粒度的Last-Modified就不够用了。
  * 4) 禁止缓存
    * 客户端设置： 在ajax发送请求前加上xmlHttpRequest.setRequestHeader(“Cache-Control”,”no-cache”);
    * 服务器端设置：在服务端加上header(“Cache-Control: no-cache, must-revalidate”);
  * 5) 用户操作和缓存
   *  ![图片](/image/youhua-11.png)




## 三、 总结 性能有优化的具体的方法
   一）内容层面
 > 1、DNS解析优化（DNS缓存、减少DNS查找、keep-alive、适当的主机域名）
    2、避免重定向（/还是需要的）
    3、切分到多个域名
    4、杜绝404

  二）网络传输阶段
 > 1、减少传输过程中实体的大小
      1）缓存
      2）cookie优化
      3）文件压缩（Accept-Encoding：g-zip）

  2、减少请求的次数
      1）文件适当的合并
      2）雪碧图

  3、异步加载（并发,requirejs）
  4、预加载、延后加载、按需加载

  三）渲染阶段
 > 1、js放底部，css放顶部
  2、减少重绘和回流
        3、合理使用Viewport 等meta头部
        4、减少dom节点
        5、BigPipe

  四）脚本执行阶段
  > 1、缓存节点，尽量减少节点的查找
  2、减少节点的操作（innerHTML）
  3、避免无谓的循环，break、continue、return的适当使用
  4、事件委托


## 四 、从浏览器发起请求到页面浏览器的process
 * 预处理
 * DNS解析
 * 建议链接
 * 发起请求
 * 等待响应
 * 接受数据
 * 处理元素
 * 布局渲染


 参考文档：
 [缓存机制](https://www.cnblogs.com/zhouwenhong/p/3928645.html)
 [缓存标头](https://developers.google.com/speed/docs/insights/LeverageBrowserCaching)
 [优化](http://www.haomou.net/2015/11/05/2015_web_fast/)    
    

