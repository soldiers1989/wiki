# 前端数据统计记录


## 爱回收官网

### M、PC 统计北京当日上门数

#### 输入 what

- 时间
- 订单号

#### 约束 what

- 北京地区
- 当日上门订单

#### 位置 where

订单提交成功页

#### 代码样例

_paq.push(['trackEvent', 'm-ahs-bj-ondoor-today', 'submit-bj-ondoor-today', 'date:"2017-07-06";time:"12:00-18:00"';tradeno:"12342"]);

- category 页面名/组件名/模块名/业务名
- action 抽象行为/具体行为
- name 具体操作/细分行为归类/记录数据

### 【行为】交易方式选择情况

url 的 type 参数记录交易方式

### 【行为】解绑方式

- 自行解除
- 帮我解除

### 【推广】记录产品转化率信息

#### 范围

从报价页一直到订单成功页，

#### 内容

_paq.push(['trackEvent', 'M-track-pid', pidStr, 'pid']

### 【行为】快递取件方式

- 帮我叫快递
- 

### 【页面】下单页页面数据

url 

### 【异常】错误监控代码


## 合作方 - 芝麻信用

### 入口

通信
&utm_source=zmc&utm_medium=zmc_tongxin&utm_campaign=m_coop_ahs

信用生活
&utm_source=zmc&utm_medium=zmc_creditlife&utm_campaign=m_coop_ahs

生活号
&utm_source=zmc&utm_medium=zmc_shenghuohao&utm_campaign=m_coop_ahs

### 埋点

选择交易方式快递普通回收、芝麻信用回收 数据埋点

utm_track=zhimacredit-recycletype--express
utm_track=zhimacredit-recycletype--credit
utm_track=zhimacredit-recycletype--ondoor
utm_track=zhimacredit-recycletype--outlets