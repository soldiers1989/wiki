## 优惠券须知
### 一、你所见到的A码和优惠券的区别
1. 首先说明 A码和优惠券没有必然的联系
2. A码：
    * A码是一种加值的方式，现在逐渐下掉A码的渠道(这里不做深刻的探讨)；
    * A码与账户没有关联，就是如果符合条件大家都可以可以使用；
    * A码针对满足条件的 所有的机型（解释一下，加入你多个小订单如果每个订单都满足条件可以使用A码，那么你的每个小订单 都会加值使用A码，然后优惠券不是这样的）；
3. 优惠券：
    * 优惠券和A码不同就是，优惠券是和账户关联的；
    * 优惠券领取之后可以在个人中心查看你的优惠券（其实这是废话，因为它和账户关联啊）
    * 优惠券针对满足订单的任意一个机型（再解释一下：如果你的是10元优惠券，你回收了3个机型，每个机型都符合使用优惠券的条件，但是只能用到其中的一个机型上面，不好意思，谢谢！）



### 二、简单描述优惠券体系
##### 优惠券体系生成(下面看图说话):
   * 优惠券的生成大概分为三层：
     > 后端先生成券

     > 通过各种规则算法生成礼包（或者兑换码）

     > 开始投放
   *  兑换码只是礼包的一种形式
   *  生成优惠券的时候，针对优惠券设置使用的限制（for example 使用的时间条件规则）
   * 由优惠券集成礼包的时候，针对礼包设置领取的限制（for example 领取的时间，方式，限制，数量）
   * 也许是为了增大流量互换，投放各种平台，会有兑换码的形式，通过不同的方式领取兑换码之后可以兑换成优惠券使用
   * 礼包生成之后，当然下面就是分发下去以供用户领取使用（这些就是需要前端在各种活动页面增加入口，来领取礼包）

![图片](/image/2.png)
      
#####  优惠券的业务的逻辑：
1. 下面的图是使用限制，生成，分发，优惠策略，功能的大概的情况和逻辑:

      * 针对优惠券使用限制：
      * 时间：生效失效（会有相对时间，绝对时间）不过这个和前端没有关系，仅供了解
      * 使用条件： 金额，地区 等
      * 参与商品
      * 使用规则： 账号限制

2. 针对礼包领取限制：

      * 时间：开始时间，结束时间
      * 方式： 直接领取，或者口令领取
      * 限制： 用户限制（黑名单或者灰名单之类）这个也不用我们前端
      * 规则：领取的次数

3. 分发（需要我们前端）：
      * 活动页面

![图片](/image/3.png)

#####  下面重点来了 我们前端需要做的：
1. 其实需要我们做的就是：
     * 活动页面或者其他页面添加领取礼包的入口
     * 主要的就是调接口（简单说一下自己调接口的历程以防大家踩坑）：
 * 领取礼包的时候获取可领的礼包(放一下芳芳大神和浩神的报价页领去礼包的代码)：


      <template>
            <div class="couponList" :class="[moveTo== true ? 'moveLeft':'']">
            <div class="ticket-left">
                  <div class="ticket "
                  :class="[pkg.maxCountPerUser == pkg.reveiveCountPerUser || over[i] == pkg.maxCountPerUser ? 'use-coupon':'']"
                  v-for="(pkg, i) in packages" :key="pkg.packageCode">
                  <div class="coupon-left" @click="getCoupon(pkg,pkg.packageCode, i)">
                  <div class="title">{{pkg.name}}</div>
                  <p class="tip">领取后可至“个人中心－优惠券”查看</p>
                  </div>
                  <div class="coupon-right" @click="showCoupon(pkg,pkg.packageCode, i)">
                  <a href="javascript:;" class="get-coupon">{{pkg.maxCountPerUser == pkg.reveiveCountPerUser || over[i] == pkg.maxCountPerUser ? '查看礼包' : '立即领取'}}</a>
                  </div>
                  </div>
            </div>
            <div class="ticket-right">
                  <div class="ticket" v-for="(cp,index) in couponsList" :key="index">
                  <div class="exclusive-left">
                  <div class="money"><span>{{cp.amount}}</span>元</div>
                  <p class="remind">满{{cp.minPriceLimit}}元可用</p>
                  </div>
                  <div class="exclusive-right">
                  <h3>{{cp.name}}</h3>
                  <p class="remind">{{cp.description ? '限制条件' : '全场通用'}}</p>
                  <p class="remind" v-if="cp.startTime || cp.endTime">{{cp.startTime | formatDate}}-{{cp.endTime | formatDate}}</p>
                  </div>
                  </div>
                  </div>
            </div>
      </template>

        注：展示可领取的都是礼包，里面包含一个或者多个优惠券，交互可能要可查看每个礼包的礼包详情，所以这个要展示出来。还有值得注意的是领取的次数这个可能要自己动态计算，礼包的状态。
        我们要做的其实也不多，就是调接口可能情况比较多，逻辑多一点（千万注意的是，如果没有数据的话，后台放回data为null ，所以一定要加判断是否有data）

 * 使用优惠券：

  * 我们要做的就是通过接口，判断该订单是否可以使用优惠券并展示可以使用的优惠券

 * 个人中心优惠券展示（前面说过优惠券和账户关联的）：
    * 根据接口回去账户可用，已用，已失效优惠券
        
  
  >其实没有人好说的，根据接口展示，遇到坑踩几下就会了，哈哈

![图片](/image/1.png)
