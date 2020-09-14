<template>
  <div class="about">
    <header>
      <p>商品分类</p>
      <input type="text" placeholder="请输入你想要搜索的商品" />
      <van-icon name="search" size="26px" />
    </header>
    <section>
      <div class="main">
        <div class="left">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              @click="nav(item.cat_id)"
              :title="item.cat_name"
              v-for="(item,index) in classifylist"
              :key="index"
              v-show="item.cat_id<=90"
            />
          </van-sidebar>
        </div>
        <div class="right">
          <div class="tabs">
            <van-tabs v-model="active" @click="onClick">
              <van-tab :title="item" v-for="(item,index) in pop" :key="index"></van-tab>
            </van-tabs>
          </div>

          <div class="shoplist">
            <div class="list" v-for="(item,index) in shopList" :key="index">
              <img :src="item.goodsLogo" alt />
              <p class="title">{{item.goodsName}}</p>
              <p style="text-align:center">
                <span style="color:red">{{item.goodsOldPrice}}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  class="iconfont icon-wujiaoxingxingxing"
                  style="font-size:30px"
                ></span>
                {{item.goodsFav}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer></footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeKey: 0,
      classifylist: [],
      active: 0,
      pop: ["综合", "销量", "新品"],
      shopList: [],
    };
  },
  mounted() {
    this.$netlist.classifylist().then((res) => {
      console.log(res.data.data);
      this.classifylist = res.data.data;
    });
    this.$netlist
      .shopList({
        params: {
          cat_id: "85",
          page: 1,
          pageSize: 6,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        this.shopList = res.data.data;
        this.shopList.sort((a, b) => {
          return a.goodsId - b.goodsId;
        });
      });
  },
  methods: {
    onClick() {
      this.$netlist
        .shopList({
          params: {
            cat_id: "85",
            page: 1,
            pageSize: 6,
          },
        })
        .then((res) => {
          // console.log(obj);
          this.shopList = res.data.data;
        });
    },
    nav(id) {
      console.log(id);
      this.$netlist
        .shopList({
          params: {
            cat_id: id,
            page: 1,
            pageSize: 6,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.shopList = res.data.data;
          this.shopList.sort((a, b) => {
            return a.goodsId - b.goodsId;
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 11vh;
  // position: fixed;
  p {
    width: 100%;
    height: 7vh;
    line-height: 7vh;
    font-size: 32px;
    text-align: center;
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
    top: 8.2vh;
    left: 15px;
    color: #999;
  }
}
section {
  width: 100%;
  height: 78vh;
  overflow: scroll;
  .main {
    width: 100%;
    display: flex;
    .left {
      flex: 0.2;
      height: 78vh;
      overflow: scroll;
      .van-sidebar {
        width: 100%;

        .van-sidebar-item {
          height: 120px;
          line-height: 120px;
          font-size: 28px;
        }
      }
    }
    .right {
      flex: 0.8;
      height: 78vh;
      overflow: scroll;
      position: relative;
      .tabs {
        width: 595px;
        height: 80px;
        position: fixed;
        right: 0;
        top: 10.8vh;
        background: white;
        /deep/.van-tabs {
          width: 100%;
          height: 80px;
          margin-top: 20px;
          font-size: 30px;
          /deep/.van-tab {
            width: 30%;
            line-height: 80px;
            font-size: 30px;
          }
        }
      }

      .shoplist {
        width: 98%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 80px;
        .list {
          width: 49%;
          height: 400px;
          img {
            width: 100%;
            border-radius: 15px 15px 15px 15px;
          }
          p {
            width: 100%;
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
  }
}
footer {
  width: 100%;
  height: 10vh;
}
</style>
