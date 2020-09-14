<template>
  <div class="home">
    <header>
      <img src="../assets/logo.png" alt />
      <!-- <input type="text" placeholder="请输入你想要搜索的商品" /> -->
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onfocus"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <!-- <van-icon name="search" size="24px" /> -->
    </header>
    <section>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- 轮播图 -->
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in swipeList" :key="index">
              <img :src="item.slide_show_imgUrl" alt />
            </van-swipe-item>
          </van-swipe>
          <!-- 九宫格 -->
          <van-grid :column-num="5">
            <van-grid-item v-for="(item,index) in homelist" :key="index">
              <template #icon>
                <img :src="item.sp_home_ico" alt class="imgs" />
              </template>
              <template #text>
                <p>{{item.sp_home_title}}</p>
              </template>
            </van-grid-item>
          </van-grid>
          <van-sticky :offset-top="98">
            <!-- <van-button type="primary">基础用法</van-button> -->
            <van-tabs v-model="active" class="tabs" @click="onClick">
              <van-tab v-for="(item,index) in pop" :key="index" class="tab">
                <template #title>
                  <span class="title">{{item}}</span>
                </template>
              </van-tab>
            </van-tabs>
          </van-sticky>
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
        </van-list>
      </van-pull-refresh>
    </section>
    <footer></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swipeList: [], //轮播
      homelist: [], //九宫格
      pop: ["流行", "新款", "精选"],
      active: 0,
      shoplist: [],
      type: ["syn", "new", "sell"],
      isLoading: false,
      loading: false,
      finished: false,
      refreshing: false,
      value: "",
    };
  },
  mounted() {
    this.$netlist.homelist().then((res) => {
      // console.log(res.data.data[0]);
      this.swipeList = res.data.data[1];
      this.homelist = res.data.data[0];
    });
    this.$netlist
      .shoplist({
        params: {
          page: 1,
          pageSize: 10,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        this.shoplist = res.data.data;
      });
  },
  methods: {
    onSearch() {},
    // 输入框获取焦点的时候触发
    onfocus() {
      this.$router.push("/search");
    },
    onClick(obj) {
      console.log(obj);
      this.$netlist
        .shoplist({
          params: {
            page: 1,
            pageSize: 10,
            sortType: this.type[obj],
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.shoplist = res.data.data;
        });
    },
    onLoad() {
      console.log(1111)
      let a = 1;
      a++;
      setTimeout(() => {
        this.$netlist
          .shoplist({
            params: {
              page: a,
              pageSize: 10,
              sortType: "new",
            },
          })
          .then((res) => {
            // console.log(res.data.data);
            this.shoplist = [...this.shoplist, ...res.data.data];
            this.refreshing = false;
            this.loading = false;
          });

        if (this.shoplist.length >= 100) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    gotoDetails(goodsId) {
      this.$router.push({
        path: "/details",
        query: {
          goodsId: goodsId,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped="">
header {
  width: 100%;
  height: 18vh;

  img {
    width: 100%;
    height: 8vh;
  }
  input {
    width: 99%;
    height: 5vh;
    margin: 0.5px auto;
    position: relative;
    text-indent: 70px;
    font-size: 28px;
    color: #999;
  }
  .van-icon {
    position: absolute;
    width: 50px;
    height: 3vh;
    top: 9.7vh;
    left: 20px;
    color: #999;
  }
}
section {
  width: 100%;
  height: 70vh;
  overflow: scroll;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: #e8f2f8;
    img {
      width: 100%;
      height: 400px;
    }
  }
  .imgs {
    width: 100px;
    height: 100px;
  }
  /deep/ .tabs {
    width: 100%;
    height: 100px;
  }
  .tab {
    display: block;
    width: 100%;
    height: 80px;
    line-height: 80px;
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
}
footer {
  width: 100%;
  height: 10vh;
}
</style>
