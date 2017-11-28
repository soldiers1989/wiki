# 爱回收项目介绍

## 爱回收FE文档

### 爱回收FE-WIKI
* 版本库地址：http://code.aihuishou.com/AihuishouFE/wiki

## 爱回收2C项目

### 官网pc版
* c#代码库地址（未重构部分）：http://code.aihuishou.com/application-package/Portal
* 重构代码库地址：http://code.aihuishou.com/AihuishouFE/aihuishou-pc
* 线上地址：http://aihuishou.com/

### 官网m版
* 代码库地址（未重构部分）：http://code.aihuishou.com/application-package/Mobile
* 重构代码库地址：http://code.aihuishou.com/aihuishou-fe/awesome-ahs--mobile
* 线上地址：http://m.aihuishou.com/

### 合作方m版
* 代码库地址：http://code.aihuishou.com/application-package/Cooperators.Mobile
* 线上地址：coop.aihuishou.com/samsung（三星），其他第三方会带上对应的名称

### 合作方pc版本（coop.aihuishou.com/samsung）
* 代码库地址：http://code.aihuishou.com/application-package/Cooperators.PC
* 线上地址：http://cppc.aihuishou.com/smartisan/Product/Search（锤子），其他第三方会带上对应的名称

### 活动版本库(http://activity.aihuishou.com/*）
* 代码库地址：http://code.aihuishou.com/aihuishou-fe/m-ahs-activity

### 后台系统（）
* 代码库地址：http://code.aihuishou.com/application-package/Mobile

## 爱回收2B项目

### 系统列表

* 客服系统 （crm）
* 财务系统 （finance）
* 采销系统 （ps）
* 运营系统 （ocs）
* 订单系统 （oms）
* 商品系统 （pms）
* 风控系统 （rm）
* 内容系统 （cms）
* 智能门店系统 （store）
* 任务系统 （task）
* 公安系统 （pss）
* ob系统 （ob）
* 库存系统 （stock）
* 商家系统 （sj）
* 基础信息系统 （foundationdata）
* ~~老工单系统~~

各系统的线上地址为`xxx.aihuishou.com`，测试地址为`test.xxx.aihuishou.com`（以crm为例，线上地址`crm.aihuishou.com`，测试地址`test.crm.aihuishou.com`）。要访问测试环境，需把DNS修改为`192.168.3.247`。

### 客服系统（crm）

状态：已前后端分离

前端部分：`git@code.aihuishou.com:nossika/crm-font-end.git`

完整C#项目：`git@code.aihuishou.com:application-package/NewCrm.git`

### 商品系统（pms）

状态：已前后端分离

前端部分：`git@code.aihuishou.com:aihuishou-fe/PMS-FE.git`

完整C#项目：`git@code.aihuishou.com:application-package/PMS.git`

### 订单系统（oms）

状态：已前后端分离

前端部分：`git@code.aihuishou.com:yitao/oc-front.git`

完整C#项目：`git@code.aihuishou.com:csharp-applications/HuiShou.Web.OMS.git`

### 运营系统（ocs）

状态：未分离，vue嵌在c#中。

前端部分：`git@code.aihuishou.com:yitao/oc-front.git`

完整C#项目：`git@code.aihuishou.com:csharp-applications/HuiShou.Web.OMS.git`

### 任务单系统（task）

状态：开发中，计划进行站点分离

前端部分：`git@code.aihuishou.com:aihuishou-fe/TASK-FE.git`

### 其他系统

状态：jQuery嵌在c#页面里，目前业务组负责开发和维护。

### git分支规范

线上环境：`master`

测试环境：`test`

版本迭代时，基于`master`分支新建分支，以`项目名_v版本号`的形式命名（比如crm的2.1.0版本对应的分支名是`crm_v2.1.0`），测试前合并到`test`分支，上线前合并到`master`分支。