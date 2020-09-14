<template>
  <div>
    <van-nav-bar title="商品搜索" left-arrow @click-left="onClickLeft" />

    <van-search
      v-model="value"
      show-action
      label="商品名"
      fouce
      placeholder="请输入搜索关键词"
      @input="oninput"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="search" v-show="iswyb">
      <p class="hotSearch">全网热搜</p>
      <div class="topsearch">
        <span v-for="(item,index) in searchHot" :key="index" @click="hotwords(item)">{{item}}</span>
      </div>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">搜索历史</van-divider>
      <div>
        <van-cell size="large" v-for="(item,index) in histroy" :key="index">
          <template #right-icon>
            <van-icon name="close" @click="del(index)" />
          </template>
          <template #title>{{item}}</template>
        </van-cell>
      </div>

      <van-button plain type="info" style="margin-left:35%" @click="clear">清空历史记录</van-button>
    </div>
    <div class="list" v-show="!iswyb">
      <div class="shoplist">
        <div
          class="list"
          v-for="(item,index) in shoplist"
          :key="index"
          @click="gotoDetails(item.goodsId)"
        >
          <img :src="item.goodsLogo" alt />
          <p class="title">{{item.goodsName}}</p>
          <p style="text-align:center">
            <span style="color:red">{{item.goodsOldPrice}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span
              class="iconfont icon-wujiaoxingxingxing"
              style="font-size:20px"
            ></span>
            {{item.goodsFav}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from "../utils/utils";
import { Dialog } from "vant";

export default {
  data() {
    return {
      value: "",
      iswyb: true,
      searchHot: [],
      shoplist: [],
      histroy: [],
    };
  },
  created() {
    if ( localStorage.kws) {
      this.histroy = JSON.parse(localStorage.kws);
    }

    this.$netlist.searchHot().then((res) => {
      console.log(res.data.data);
      this.searchHot = res.data.data;
    });
  },
  methods: {
    //返回上一页
    onClickLeft() {
      window.histroy.back();
    },
    del(index) {
      this.histroy.splice(index, 1);
      localStorage.kws = JSON.stringify(this.histroy);
    },
    onSearch() {
      if (this.value == "") {
        alert("不能为空");
        return;
      }
      this.iswyb = false;

      this.$netlist
        .getGoods({
          params: {
            goodsName: this.value,
            pageSize: 20,
            sortType: "syn",
          },
        })
        .then((res) => {
          console.log(res);
          this.shoplist = res.data.data;
        });
      console.log(this.value);
      this.histroy.push(this.value);
      console.log(this.histroy);
      localStorage.kws = JSON.stringify(this.histroy);
      // this.save();
      if (this.histroy.length >= 5) {
        this.histroy.pop();
      }
    },

    hotwords(item) {
      console.log(item);
      this.value = item;
      this.onSearch();
      this.iswyb = false;
    },

    oninput() {
      this.iswyb = true;
    },
    //清除所有记录
    clear() {
      console.log(11111);
      Dialog.confirm({
        title: "标题",
        message: "确认要删除所有数据吗",
      })
        .then(() => {
          console.log(11111111);
          this.histroy = [];
          console.log(this.histroy);
          localStorage.kws = JSON.stringify(this.histroy);
        })
        .catch(() => {
          // on cancel
        });
    },
    //点击搜索的时候触发
  },
};
</script>

<style  lang="scss"  scoped>
.hotSearch {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-indent: 100px;
  font-size: 30px;
  color: #999;
}
.topsearch {
  width: 70%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
}
.topsearch span {
  border: 1px solid #999;
  padding: 5px;
  margin-left: 30px;
  margin-top: 10px;
  color: #999;
}
.shoplist {
  width: 96%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 10px;
  .list {
    width: 48%;
    height: 450px;
    img {
      width: 100%;
      height: 300px;
      border-radius: 15px 15px 15px 15px;
    }
    .title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}
</style>