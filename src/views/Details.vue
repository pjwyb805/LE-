<template>
  <div>
    <section>
      <van-tabs v-model="active" scrollspy sticky>
        <span class="iconfont icon-huichejian" @click="back"></span>
        <van-tab title="商品">
          <img :src="this.list.goodsLogo" alt style="width:100%;" />
          <p>{{this.list.goodsName}}</p>
          <p>
            <span style="color:#ff5777;font-size:20px">￥{{this.list.goodsPrice}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <s style="color:#999">{{this.list.goodsOldPrice}}</s>
          </p>
          <ul class="nav">
            <li>销量{{this.list.goodsBuyNum}}</li>
            <li>收藏{{this.list.goodsFav}}</li>
            <li>{{this.list.goodsAre}}</li>
          </ul>
          <ul class="nav2">
            <li v-for="(item,index) in nav2" :key="index">
              <img :src="item.icon" alt />&nbsp;&nbsp;
              <span>{{item.name}}</span>
            </li>
          </ul>
          <p class="pei">
            <i>赔</i>
            <span>费</span>
            <span>邮</span>
            <span>货</span>
          </p>
          <div class="xiu">
            <span>买家评价</span>
            <span>更多></span>
          </div>
        </van-tab>
        <!-- <van-tab title="评论">
          <div class="evaluate-one" v-for="(item,index) in evaluate" :key="index">
            <p class="msg">
              <img :src="item.comment_body.user_img" alt />
              <span style="margin-left:10px;">{{item.comment_body.user_name}}</span>
            </p>
            <p class="content">{{item.comment_body.content}}</p>
            <p class="desc">
              <span>{{item.comment_body.modified_time}}</span>
              <i style="font-style:normal;margin-left:20px;color:#999">颜色：默认 尺码：默认</i>
            </p>
          </div>
        </van-tab> -->
        <van-tab title="详情">
          <div class="main" v-html="list.goodsIntroduce"></div>
        </van-tab>
        <van-tab title="推荐">内容 4</van-tab>
      </van-tabs>
      <div class="foot"></div>
    </section>
    <footer>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="num" @click="gocart"/>
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button type="warning" text="加入购物车" @click="onCarts" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      active: "",
      list: {},
      evaluate: [], //评价
      nav2: [],
      num:0,
    };
  },
  mounted() {
    let id = this.$route.query.goodsId;
    console.log(id);
    this.$netlist
      .details({
        params: {
          goodsId: id,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        this.list = res.data.data[0];
        this.nav2 = res.data.data[2];
        this.evaluate = res.data.data[3];
        // this.evaluate.forEach((ele) => {
        //   var date = new Date(parseInt(ele.comment_body.modified_time) * 1000);
        //   ele.comment_body.modified_time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        // });
      });
  

    this.hhom();
  },
  methods: {
    onCarts() {
      console.log(111);
      //添加购物车
      this.$netlist
        .addCart(
          qs.stringify({
            product_id: this.list.goodsId,
            price: this.list.goodsPrice,
            product_amount:1,
          })
        )
        .then((res) => {
          console.log(res);
        });
        this.hhom();
        // this.$netlist.CartNum({
        //   catId:item.id,
        //   product_amount:item.product_amount
        // }).then(res=>{
        //   console.log(res)
        // })
    },
    hhom(){
       this.$netlist.Cartxinxi({
         params:{
           page:1,
           pageSize:20,
         }
       }).then(res=>{
        //  console.log(res.data.data)
          this.num=res.data.data.length
       })
    },back(){
      window.history.back()
    },
    gocart(){
      this.$router.push("/carts")
    }
  },
};
</script>

<style scoped>
/* section{
  width: 100%;
  height: 92vh;
  overflow: scroll;
} */
.icon-huichejian {
  position: fixed;
  top: 40px;
  left: 10px;
  font-weight: 800;
}
.nav {
  width: 90%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom: 2px solid #f4f4f4;
}
.nav li {
  width: 25%;
  height: 60px;
  line-height: 60px;
  color: #999;
  font-size: 26px;
  /* text-align: center; */
}
.main {
  width: 100%;
  overflow: hidden;
}
.main >>> .lazy {
  width: 100%;
}
.nav2 {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-around;
}

.nav2 li {
  line-height: 45px;
}
.nav2 img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.xiu {
  width: 90%;
  height: 100px;
  line-height: 100px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom: 2px solid #f4f4f4;
}

.pei {
  width: 100%;
  height: 50px;
  margin-top: 20px;
}
.pei i {
  font-style: normal;
  margin-left: 30px;
}
.pei span {
  margin-left: 130px;
}
.evaluate-one {
  width: 90%;
  margin: 0 auto;
}
.evaluate-one img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.evaluate-one .msg {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.evaluate-one .content {
  width: 100%;
  line-height: 70px;
  font-size: 34px;
  color: #999;
  text-indent: 20px;
}
.evaluate-one .desc {
  width: 100%;
  line-height: 70px;
  font-size: 28px;
}
.foot {
  width: 100%;
  height: 200px;
}
footer {
  display: fixed;
  /* height: 8vh; */
}
</style>