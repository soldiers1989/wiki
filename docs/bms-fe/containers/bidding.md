# 竞价管理模块

此文档为商家系统竞价单管理

## 目录结构

```
│── /list.vue           	 # 竞价单列表主文件
│── /listIng.vue             # 竞价中组件
│── /listEnd.vue        	 # 竞价结束组件
│ ├── /detail/ordinary.vue   #普通竞价单详情
└─└── /detail/parcel.vue     #统货竞价单详情
```

## 竞价单列表
#### 项目介绍
> 1、状态：

	【竞价中】取当前状态在“竞价中”的竞价单，
	【竞价结束】取当前状态在“已完成”的竞价单。
> 2、筛选条件：

	竞价单号，创建时间，竞价类型（统货，普通）
> 3、列表操作：

	【详情】-点击打开竞价单详情页
	【导出】-竞价中状态下，仅统货竞价可以导出
	当前没有“竞价中”状态的竞价单时，点击【竞价历史】切换至“竞价结束”列表

> 4、截止倒计时

	特殊标出
	当有自动结束时间时，则显示倒计时，否则显示暂无

#### 所用接口
接口地址：http://test.newsj.aihuishou.com/swagger/#/

1、 GET【/quotation/document/search】竞价单搜索

2、 POST【/quotation/document/cluster/export/{documentNo}】导出竞价单详情

3、 GET【/common/enum/getbyname/{name}】/common/enum/getbyname/{name}，传quotationdocumenttype获取竞价单类型

#### 倒计时渲染
```javascript
//根据竞价单是否有自动结束时间来算倒计时
//部分代码
//初始化倒计时
initCountDown (v) {
    let countDown = '暂无';
    if (v.quotationDocumentAutoEndDt) {
        countDown = leftTimer(v.quotationDocumentAutoEndDt);
    }
    return Object.assign(v,{countDown});
},

let timer = setInterval(() => {
    this.tableData.map(v => this.initCountDown(v));
},1000);
```

## 竞价单详情
#### 项目介绍
> 1、根据不同竞价类型及竞价状态，显示的详情内容会有部分区别

```
分四种情况：
1、普通竞价（竞价中）
2、普通竞价（竞价结束）
3、统货竞价（竞价中）
4、统货竞价（竞价结束）
```

> 2、添加报价

```
1、普通竞价在左侧列表中添加维护报价及竞拍数量（竞拍数量不得大于供货量）
2、统货竞价则在右侧可以添加及维护我的报价（我的报价不得低于起拍价）
```

> 3、状态显示

```
根据竞价单状态显示竞价中或竞价结束，若竞价中有自动结束时间，则在显示倒计时
```

> 4、结算单需根据关联单号relevanceNo查询出

> 5、附件列表需根据附件编号attachmentNo查询出

#### 所用接口
1、 GET【/quotation/document/cluster/{documentNo}】根据竞价单号查询竞价单详情（适用于2016年2月29日之后竞价单）

2、 GET【/quotation/document/{documentNo}】根据竞价单号查询竞价单

3、 POST【/quotation/document/Quoted/Save】编辑报价

4、 GET【/settlement/relevance/{relevanceNo}】根据关联单号查询结算单

5、 GET【/foundation/attachment/referno/{referSerialNo}】根据附件号查询附件列表

6、 GET【/foundation/pricepropertyname/skyproperty/getbyproductid/{productId}/includePricePropertyValue/{includePricePropertyValue}】根据型号Id获取sku价格属性

7、 GET【/foundation/pricepropertyname/getbycategoryid/{categoryId}/includePricePropertyValue/{includePricePropertyValue}】根据类别Id获取价格属性

8、 POST【/quoted/skuprice/create】创建商家Sku报价

9、 POST【/quoted/skuprice/update】更新商家Sku报价

10、 POST【/quoted/levelpricerate/create】创建等级报价百分比

11、 POST【/quoted/levelpricerate/update】更新等级报价百分比

其中8，9，10，11普通竞价添加报价弹层点击确定时会用到

#### 型号筛选关键代码（不走接口的哦）
```html
//使用el-autocomplete
<el-form-item label="型号" prop="productName" class="largeWidth">
    <el-autocomplete 
        v-model="searchForm.productName"
        :fetch-suggestions="filterProduct"
        :disabled="productDisabled"
        placeholder="型号"
        @select="productSelect">
    </el-autocomplete>
</el-form-item>
```
```javascript
filterProduct (queryString, cb) {
    let { brandId } = this.searchForm;
    let productList = this.productList.filter(v => v.data.toString() === brandId);
    //过滤出包含有搜索词的项
    let results = queryString  ? productList.filter(this.createStateFilter(queryString)) : productList;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
        cb(results);
    }, 300 * Math.random());
},
//判断是否包含搜索词
createStateFilter(queryString) {
    return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
    };
},
productSelect (item) {
    this.searchForm.productId = item.id;
}
```