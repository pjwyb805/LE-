<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" active-color="red" route>
      <van-tabbar-item name="1" to="/home">
        <i>首页</i>
        <template #icon>
          <span class="iconfont icon-shouye1"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="2" to="/classify">
        <i>分类</i>
        <template #icon>
          <span class="iconfont icon-leimupinleifenleileibie"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="3" to="/carts">
        <i>购物车</i>
        <template #icon>
          <span class="iconfont icon-gouwuche2"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="4" to="/user">
        <i>我的</i>
        <template #icon>
          <span class="iconfont icon-wode3"></span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
    };
  },
};
</script>

<style scoped>
.van-tabbar {
  width: 100% !important;
  height: 8vh;
  font-size: 40px;
}
i {
  font-size: 26px;
  font-style: normal;
}
span {
  font-size: 40px;
}
</style>