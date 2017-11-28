# 前端数据统计规范

## 统计上报规则

### Piwik

_paq.push(['trackEvent', 'category', 'action', 'name']);

### 说明

- category 页面名/组件名/模块名
- action 抽象行为/具体行为
- name 具体操作/细分行为归类



## 监听用户事件

无需 JS，在 HTML 中简单配置自动埋点内容

1. track-category 页面名
2. track-action 组件名
3. track-name 事件名

```
<li 
	data-list-id="4" 
	class="ahs-track-click" 
	data-track-category="PC-Homepage" 
	data-track-action="hottab-category-click" 
	data-track-name="摄影摄像">
</li>

```

## 预留页面数据

```
	<div id="data-xxxx" data-type="string" data-value="xxxx"></div>
	<div id="data-xxxx" data-type="json" data-value='""'></div>
	
	GLOBAL.trackData = {
		product: {
		},
	}

```
## 广告参数规范

### 站内活动

1. utm_source 广告参数，记录活动来源网站名/网页名
2. utm_medium 广告参数，记录活动点击的组件名
3. utm_campaign 广告参数，记录活动名
4. utm_track 统计参数，用于记录页面跳转的自定义事件，例如：记录上一个页面页面名, utm_track=from_apply

#### 示例：官网首页 banner 引导向某活动

- utm_source： pc_ahs
- utm_medium： pc_ahs_homepage_banner
- utm_campaign： pc_kdyoupin

### 站外推广

1. utm_source 广告参数，记录来源
2. utm_medium 广告参数，记录来源媒介
3. utm_campaign 广告参数，记录推广目标
4. utm_track 统计参数，用于记录页面跳转的自定义事件，例如：记录上一个页面页面名, utm_track=from_apply

#### 示例：微信公众号文章引导向爱回收 M 版

- utm_source： weixin_public
- utm_medium： weixin_post
- utm_campaign： m_ahs


## 术语表

### 网站名 

- 用于 utm_source 
- 用于 utm_campaign 

| 名称 | 用词 |   说明 |
| :--------: | :--------:| :------: |
| 官网 PC 版    |   pc_ahs |  |
| 官网 M 版    |   m_ahs |  |
| 口袋 PC 版    |   pc_kdyoupin|  |
| 口袋 M 版    |   m_kdyoupin|  |
| 享换机 PC 版    |   pc_xhj |  |
| 享换机 M 版    |   m_xhj |  |
| 微信公众号    |   weixin_public |  |

### 媒介名 

- 用于 utm_medium 

| 名称 | 用词 |   说明 |
| :--------: | :--------:| :------: |
| 微信公众号文章    |   weixin_post |  |
| 微信公众号菜单    |   weixin_menu |  |


## Changelog

v 0.0.2 

- 增加术语表
- 广告参数规范更新，增加示例

v 0.0.1 init


## To Do List

- 单页应用项目多余参数问题
	- 避免无意义参数
	- 指定白名单参数

