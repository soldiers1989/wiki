# 模板说明

 * 优惠券模块是整个项目中最为复杂的一块，至于优惠券的需求此文档有特定介绍。

 * 领券需登录，此模块是所有模块中唯一涉及登录的模块，此项目中登录以弹窗的形式展示。

 * 登录后不需在点击可直接领券。

 * 1行2包，一行3包的展示形式。

 * 礼包有多种状态。

 # js代码展示

 ```js
  //领取优惠券
      async getCouponList(packageCode, index) {
        const opts = {
          url: '/portal-api/user/promotion-package/redeem',
          method: 'POST',
          params: {
            packageCode: packageCode
          }
        }
        let list;
        try {
          list = await Request(opts, []);
        } catch (e) {
          //10001 表示已经被领完
          if (e.code == 10001) {
            this.indexArr.push(index);
            return;
          }
          //10002表示已经领取过
          if (e.code == 10002) {
            this.countArr.push(index);
            return;
          }

          //10004表示已经被使用或者作废
          if (e.code == 10004) {
            ui.toast(e.msg)
            return;
          }
          //10005表示不存在
          if (e.code == 10005) {
            ui.toast(e.msg)
            return;
          }
          //10007表示非法用户
          if (e.code == 10007) {
            this.userInfor = true
            return;
          }
          //其他非0 code 都属于异常
          if (e.code != 0) {
            ui.toast(e.msg)
            return;
          }
        }
        this.tel = local.get('userInfo').mobile
        //领券成功获取礼包详情
        let lists;
        const optsdes = {
          url: `/portal-api/promotion-package/${packageCode}`,
        }
        try {
          lists = await Request(optsdes, []);
        } catch (e) {
        }
        this.promotions = lists.promotions;
        this.couponDes = true
        piwik.pushTrack(['trackEvent', 'M-track-pid', `packageCode: ${packageCode}`, 'oncegetcoupon'], window.location.href);
      },

 ```
