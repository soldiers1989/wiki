# 项目说明

* pc,m版组件基本一样，目前为基础组件，主要包括图片、领取包、商品、文字模块。

* 此文档以m版为例，需要结合后端CMS系统数据选择性的展示对应模块。

* 每场活动对应未开始，正在进行，已结束三种状态。

* 可配置微信分享


# 组件目录

* [通栏图](/activity/Component/columnimage.md)

* [图片热区](/activity/Component/hotspot.md)

* [轮播图](/activity/Component/swiper.md)

* [优惠券领取包](/activity/Component/couponList.md)

* [商品组件](/activity/Component/product.md)

* [标签商品栏](/activity/Component/product.md)

* [文字区域](/activity/Component/rule.md)

# 项目介绍

* 项目放在activity-m 目录下，每一个模块对应compent中一个组件。

### 1、通过接口获取模板数据，代码展示如下，不同的id代表不同的活动

```
 async created() {
      const activityId = this.getQueryString('id');
      const activityOpts = {
        url: `/portal-api/standard-activity-template/${activityId}`,
        method: 'GET',
        params: {
          type: 2
        }
      }
       try {
        res = await Request(activityOpts);
      } catch (e) {
      }
 }
```
### 2、通过返回的字段componentOrder给组件排序展示
```
//根据返回的componentOrder排序
      sortFn(arr) {
        arr.sort((a, b) => {
          return a.componentOrder > b.componentOrder ? 1 : -1;
        });
        return arr;
      }
```

### 3、每个组件都有特定的componentType标识，通过此组件动态添加组件

```
<div v-for="(item,index) in moduleList" :key="index">
    <component :is="item.name" :propdata="item.data" @hideLogin="hideLogin" @showLogin="showLoginFn">
    </component>
</div>
dataList.forEach(value => {
        switch (value.componentType) {
          case 1:
            tempArr.push({name: 'Hotspot', data: value.imageList});
            break;
          case 2:
            tempArr.push({name: 'Swiper', data: value});
            break;
          case 3:
            tempArr.push({name: 'Columnimage', data: value.imageList});
            break;
          case 4:
            tempArr.push({name: 'Hotspot2', data: value.imageList});
            break
          case 12:
          case 13:
            tempArr.push({name: 'Couponlist', data: value})
            break
          case 21:
            tempArr.push({name: 'Product', data: value})
            break
          case 22:
            tempArr.push({name: 'Product2', data: value})
            break
          case 26:
            tempArr.push({name: 'Tabproduct', data: value})
            break
          case 31:
            tempArr.push({name: 'Rule', data: value.textProperty})
            break
        }
      })
       this.moduleList = tempArr;
       }
```
### 4、通过判断shareTitle字段是否为空判断是否需要设置微信分享。

### 5、通过判断 actvityStatus 字段判断活动状态。

# 前端使用技术

* vue.js

* webpack

* es6

* less

* (备注：前端根据后端接口返回对组件的顺序排序并且展示。)

# 项目贡献

* 由于每一次的活动都要特定开发并且不可复用，就算很简单的需求也需要移交并且排期既浪费产品的时间也浪费开发的时间，此时搭建统一的活动模板势在必行，从此运营每次活动只需要在我们的CMS系统稍稍动一动手就可以创建适合多场景线上活动，大大提高工作效率。
