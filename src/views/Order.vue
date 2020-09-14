<template>
  <div>
    <header>
      <van-nav-bar title="确认订单" left-arrow @click-left="onClickLeft" />
      <div class="location" @click="Add_shipping_address">
        <img src="../assets/logo1.png" alt />
        <div class="address">
          <p>
            <span>{{resslist.name}}</span>
            <span>{{resslist.tel}}</span>
          </p>
          <p>{{resslist.address}}</p>
        </div>
      </div>
    </header>
    <section>
      <div v-for="(item,index) in ordertop" :key="index" style="width:100%;height:350px">
        <div class="trade_name">
          <img :src="item[1].shopLogo" alt class="shoplogo" />
          <p style="font-size:18px;">{{item[1].shopName}}></p>
        </div>

        <div class="shoplist">
          <div class="left">
            <img :src="item[0].goodsLogo" alt />
          </div>
          <div class="center">
            <p class="title">{{item[0].goodsName}}</p>
            <p class="oldprice">原价：{{item[0].goodsOldPrice}}</p>
            <button>七天退货</button>
          </div>
          <div class="right">
            <h3>￥{{item[0].goodsPrice}}</h3>
            <p>x{{num[index]}}</p>
          </div>
        </div>
        <div class="freight">
          <div class="left">
            <span class="iconfont icon-iconyunfeixian"></span>
            <div class="center">
              <h2>运费险</h2>
              <p class="claim">确认收货前退货可理赔</p>
            </div>
          </div>

          <div class="right">
            <h2>￥15.00</h2>
            <p>x{{num[index]}}</p>
          </div>
        </div>
        <p class="alike">
          <span>商品总价</span>
          <span>价格*数量</span>
        </p>
        <p class="alike">
          <span>运费(快递)</span>
          <span>￥0.00</span>
        </p>
        <p class="alike">
          <span>运费险(卖家赠送)</span>
          <span>￥0.00</span>
        </p>
        <p class="alike">
          <span style="font-size:20px">商品小计</span>
          <span style="color:red">￥0.00</span>
        </p>
      </div>
    </section>

    <footer>
      <van-submit-bar :price="total" button-text="去支付" @submit="onSubmit" />
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ordertop: [],
      num: [],
    };
  },
  computed: {
    cartlist: function () {
      return this.$store.state.cartlist;
    },
    resslist: function () {
      return this.$store.state.resslist;
    },
    total() {
      var money = 0.0;
      console.log(this.ordertop + "222");
      this.ordertop.map((item, index) => {
        money += Math.floor(item[0].goodsPrice * this.num[index] * 100);
      });
      return money;
    },
  },

  created() {
    this.cartlist.forEach((ele) => {
      console.log(ele, "ele");
      this.num.push(ele.product_amount);
    });
    console.log(this.num, "这是num");
    // console.log(this.cartlist,"购物车数组")
    // let id = this.$route.query.id;
    console.log(this.$store.state.id + "111");
    let id = this.$store.state.id;
    console.log(id);
    this.$netlist
      .Order({
        params: {
          goodsid: id,
        },
      })
      .then((res) => {
        console.log(res.data.data + "888");
        this.ordertop = res.data.data;
        // console.log(this.ordertop)
      });
  },
  methods: {
    //返回
    onClickLeft() {
      window.history.back();
    },
    //去支付
    onSubmit() {
      this.$router.push({
        path: "/payment",
        query:{
          item:this.$store.state.resslist
        }
      });
    },
    //添加收货地址
    Add_shipping_address() {
      this.$router.push("/address");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 18vh;
}
header .location {
  width: 94%;
  height: 12vh;
  margin: 0 auto;
  /* border-bottom: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
header .location img {
  width: 70px;
  height: 70px;
}
header .location .address {
  width: 80%;
  height: 8vh;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.address p {
  width: 100%;
  height: 50px;
  line-height: 50px;
  float: left;
}
section {
  width: 100%;
  height: 72vh;
  margin-top: 3vh;
  overflow: scroll;
}
.trade_name {
  width: 90%;
  height: 100px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.shoplogo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.trade_name p {
  margin-left: 20px;
}
.shoplist {
  width: 94%;
  height: 210px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.shoplist .left {
  width: 30%;
}
.left img {
  width: 100%;
  height: 210px;
  border-radius: 20px 20px 20px 20px;
}
.center {
  width: 58%;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10px;
}
.center .title {
  font-size: 24px;
}
.center .oldprice {
  color: #999;
  font-size: 24px;
}
.center button {
  width: 35%;
  border: 1px solid tomato;
  background: rgba(241, 97, 71, 0.096);
  color: tomato;
  padding: 2px;
}
.right {
  width: 20%;
  height: 100px;
  text-align: center;
}
.freight {
  width: 94%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
}
.freight .left {
  height: 80px;
  display: flex;
}
.freight .left .icon-iconyunfeixian {
  color: rgb(255, 230, 0);
  font-size: 80px;
  background: yellow;
  border-radius: 50%;
}
.freight .center {
  height: 80px;
  width: 80%;
}
.freight .claim {
  font-size: 30px;
}
.freight .right {
  height: 80px;
}
.alike {
  width: 94%;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
  color: rgb(66, 65, 65);
  font-size: 30px;
  display: flex;
  justify-content: space-between;
}
</style>