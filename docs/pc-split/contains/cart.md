# 回收车模块

此文档为PC回收车组件

## 目录结构

```
│── /index.js           # 主文件。
│── /page.js            # 主页面
│── /cartItem.js        # 单个产品项 
└── /index.less         # 样式文件
```

## 基本信息

* 页面路由：`/cart`
* 进入回收车页面：会默认选中所有未失效的商品

## 特别说明

* action、saga、api、reducer都是写在header对应的文件中

## 依赖接口

#### 1. GET [/cart/cart-item/list](http://open.aihuishou.com/doc/swagger/#!/Cart/CartCart_itemListGet) 获取回收车列表
#### 2. POST [/cart/cart-item/del](http://open.aihuishou.com/doc/swagger/#!/Cart/CartCart_itemDelPost) 删除回收车
#### 3. GET [/cart/inquiry/afresh/${args.inquiyKey}](http://open.aihuishou.com/doc/swagger/#!/Cart/CartInquiryAfreshByInquiryKeyGet) 更新价格
#### 4. POST [/cart/cart-item/choose](http://open.aihuishou.com/doc/swagger/#!/Cart/CartCart_itemChoosePost) 选中提交的购物车
#### 5. GET [/city/${args.cityid}/pickuptype?${args.pickuptype}](http://open.aihuishou.com/doc/swagger/#!/City/CityByCityidPickuptypeGet) 获取城市支持的回收方式

## 结算按钮状态提示判断

- 为勾选回收车产品时：按钮置灰不可提交，无提示信息
- 勾选商品 且 商品价格总和<50 且 当前城市无门店时: 按钮置灰不可提交，提示信息为`未满50元不能提交订单`
- 勾选商品 且 商品价格总和<50 且 当前城市有门店时：按钮激活可提交，提示信息为`未满50元的订单仅支持门店回收`
- 勾选商品 且 商品价格总和>=50 且 有商品为数码商品时：按钮置灰不可提交，提示信息为`智能数码仅支持门店回收`

## 更新价格
- 回收车商品超过24小时，会显示价格失效，操作栏出现更新价格
- 点击更新价格，获取该商品最新的价格
- 根据价格后，显示该价格，该商品变成可选状态，但该商品并不变成选中状态