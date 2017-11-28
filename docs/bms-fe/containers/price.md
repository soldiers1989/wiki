# 报价维护模块

## 目录结构

```
│── /index.vue           	# 主文件
│── /skuTable.vue         	# SKU价格设置
└── /levelTable.vue         # 等级价格设置
```

## SKU价格设置
#### 功能介绍
>1、 筛选条件

```
类别、品牌、型号三者有联动关系
当选择类别，品牌为该类别下的所有品牌
当选择了品牌，型号为该类别及品牌下的所有型号且支持输入过滤型号
```
>2、 表头都筛选功能

```
默认表头只有型号、SkuID、报价
当点击查询时，会将该型号下的价格属性查出来，并支持属性筛选
```

>3、 添加及维护报价

```
默认填充原有报价，编辑后点击图标验证并提交（支持enter键提交）
```

>4、 导出报价及导入报价（导入报价暂时未做）

## 等级价格设置
#### 功能介绍
>1、 筛选条件

```
类别、品牌、型号三者有联动关系
当选择类别，品牌为该类别下的所有品牌
当选择了品牌，型号为该类别及品牌下的所有型号且支持输入过滤型号
```

>2、 添加及维护报价

```
默认填充原有报价，编辑后点击图标验证并提交（支持enter键提交）
```

## 依赖接口
接口地址：http://test.newsj.aihuishou.com/swagger/#/

1. GET【/foundation/category/getbyparentid/{pid}】类别搜索(子类别)用于获取类别

2. GET【/foundation/brand/getbycategoryid/{categoryId}/tip/{tip}】品牌搜索(tip为空时不做匹配)用于获取选中类型的品牌

3. GET【/foundation/product/getbycategorybrand/{categoryId}/{brandId}/tip/{tip}】型号搜索(tip为空时不做匹配)用于获取选中类型品牌下的所有型号

4. GET【/foundation/pricepropertyname/skyproperty/getbyproductid/{productId}/includePricePropertyValue/{includePricePropertyValue}】根据型号Id获取sku价格属性

5. GET【/foundation/pricepropertyname/getbycategoryid/{categoryId}/includePricePropertyValue/{includePricePropertyValue}】根据类别Id获取价格属性

6. POST【/quoted/skuprice/create】创建商家Sku报价

7. POST【/quoted/skuprice/update】更新商家Sku报价

8. POST【/quoted/levelpricerate/create】创建等级报价百分比

9. POST【/quoted/levelpricerate/update】更新等级报价百分比

## 表头带筛选功能关键代码
```html
//根据价格属性列表渲染出多个属性列
<el-table-column v-for="(item,j) in pricePropertyList"
    :label="item.name" 
    :prop="'propertyValue'+j"
    :filter-method="filterProperty"
    filter-placement="bottom-start"
    :filters="item.pricePropertyValues.map(v=>{return{text:v.value,value:v.value}})">
</el-table-column>
```
```javascript
//SKU价格设置table的型号、skuId数据
tableDataView () {
    let tableArr = [],
        pricePropertyList = this.pricePropertyList,
        tableData = this.tableData;
    for (let i=0; i<tableData.length; i++) {
         let o = {
            index: i,
            productId: this.productId,
            productName: this.productName,
            skuId: tableData[i].sku.id
        };
        //获取该型号的各个价格属性的属性值
        for (let j=0; j<pricePropertyList.length; j++) {
            o['propertyValue' + j] = tableData[i].skuProperties[j];
        }
        tableArr.push(o);
    }
    return tableArr;
}
//表头属性值过滤
filterProperty (value, row) {
    let index = '';
    this.pricePropertyList.forEach((v,i) => {
        v.pricePropertyValues.forEach(p => {
            if (p.value === value) {
                index = i;
                return;
            }
        });
    });
    console.log(row,'row')
    return row['propertyValue'+index] === value;
},
//组件的updated()生命周期钩子函数中获取sku价格设置table的报价列以及控制输入框是否显示
//最初都是写在了tableDataView，每当改变tableData的任一属性就会导致视图重新渲染
//不能保持表头的筛选，故分开存放
updated () {
	this.tablePrice = this.tableData.map(v => {
	    return {
	        priceId: v.priceId,//priceId为0时是没有价格
	        isShowInput: v.isShowInput,
	        price: v.price === -1 ? '' : v.price,
	        originalPrice: v.price,
	    }
	});
}
```