# 基本功能

* 可配置3 ~ 6 张图片

* 可左右滑动

* 可配置播放时间

# 使用技术

* 使用 vue-awesome-swiper 组件

# 基本代码

```代码块
<template>
  <div class="swiper">
    <swiper :options="swiperOption" ref="kdSwiper">
      <swiper-slide v-for="(item,index) in propdata.imageList" :key="index">
        <a :href="item.imageLink">
          <img :src="item.imageUrl" class="sliderimg">
        </a>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    mounted() {
      this.swiperOption.autoplay = this.propdata.playSpeed*1000;
    },
    data(){
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 1000,
          initialSlide: 0,
          loop: true,
          direction: 'horizontal',
          pagination : '.swiper-pagination',
        },
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    methods: {},
    props:['propdata']
  }
</script>

```