# 模板说明

 * 可展示1行1个商品，1行2个商品。

 * 回收按钮样式后台上传。

 * 可设置tab切换。

 # 基本代码

 ```代码展示
 <template>
  <div class="tabproduct">
    <div class="tab-top" ref="tabtop">
      <ul>
        <li v-for="(item,index) in propdata.productList" @click="moveLeft(index)" :key="index"
            :class="[index==skuListIndex ? 'active':'']">{{item.labelName}}
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="skuList" v-for="(item,index) in propdata.productList" v-show="index==skuListIndex">
        <div class="product-two" v-for="(value ,i) in item.products" :key="i">
          <a :href="'http://m.aihuishou.com/product/'+value.productId+'.html'">
            <div class="img-box">
              <img :src="value.productImgUrl"/>
            </div>
            <div class="product-detail">
              <p class="product-title">{{value.productName}}</p>
              <p class="price">最高回收价：<span>￥{{value.topRecyclePrice}}</span></p>
              <div class="btn"><img :src="propdata.buttonIconUrl"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    props: {
      propdata: Object
    },
    methods: {
      moveLeft(i) {
        if (i < 3) {
          this.$refs.tabtop.scrollLeft = 0;
        }
        else {
          this.$refs.tabtop.scrollLeft = 200;
        }
        this.skuListIndex = i;
      }
    },
    data() {
      return {
        moveto: 0,
        skuListIndex: 0
      }
    }
  }
</script>
 ```