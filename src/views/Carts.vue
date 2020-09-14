<template>
  <div>
    <header>
      <van-nav-bar
        title="购物车"
        left-text="返回"
        right-text="管理"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        @click="back"
      >
        <template #right>
          <span v-if="iswyb">管理</span>
          <span v-if="!iswyb">完成</span>
        </template>
      </van-nav-bar>
    </header>
    <section>
      <van-checkbox-group v-model="result" v-for="(item,index) in cartlist" :key="index">
        <van-row>
          <van-col span="4">
            <van-checkbox :name="item" @click="onChecked(item,index)"></van-checkbox>
          </van-col>
          <van-col span="20">
            <van-swipe-cell>
              <van-card
                :num="item.product_amount"
                :price="item.price"
                desc="描述信息"
                :title="item.title"
                class="goods-card"
                :thumb="item.image"
              >
                <template #num v-if="!iswyb">
                  <van-stepper v-model="item.product_amount" />
                </template>
              </van-card>
              <template #right>
                <van-button
                  square
                  text="删除"
                  type="danger"
                  class="delete-button"
                  @click="del(item,index)"
                />
              </template>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </van-checkbox-group>
      <div class="footer">
        <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" v-if="iswyb">
          <van-checkbox v-model="checked" @click="all">全选</van-checkbox>
        </van-submit-bar>
        <van-submit-bar button-text="删除" @submit="onDel()" v-if="!iswyb" class="vant-bar">
          <van-checkbox v-model="checked" @click="all">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </section>

    <footer></footer>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      result: [] || JSON.parse(localStorage.getItem("Orderlist")),
      checked: false,
      iswyb: true,
      id: "",
      index: -2,
      obj: [],
    };
  },
  computed: {
    cartlist: function () {
      return this.$store.state.cartlist;
    },
    total() {
      let money = 0;
      this.result.map((item) => {
        money += item.price * item.product_amount * 100;
      });
      return money;
    },
  },
  mounted() {
    this.$store.dispatch("CART");
  },
  methods: {
    //返回
    onClickLeft() {
      window.history.back();
    },
    //管理
    onClickRight() {
      this.iswyb = !this.iswyb;
    },
    //返回
    back() {
      window.history.back();
    },
    //复选框
    onChecked(item, index) {
      this.obj = item;
      this.index = index;
      console.log(this.result);
      if (this.$store.state.cartlist.length == this.result.length) {
        // let num = this.result.lenght
        this.checked = true;
      } else if (this.$store.state.cartlist.length > this.result.length) {
        this.checked = false;
      }
      // this.id = "";

      // this.result.map((ele) => {
      //   this.id += ele.cart_id + ",";
      //   console.log(this.id);
      // });
      this.save();
    },
    //全选
    all() {
      if (this.checked) {
        this.result = this.$store.state.cartlist;
        console.log(true);
      } else {
        this.result = [];
        console.log(false);
      }
    },
    //滑动单元格删除
    del(item, index) {
      // console.log(item)

      //删除的是数据库的
      this.$netlist
        .CartDel(
          qs.stringify({
            carid: item.cart_id,
          })
        )
        .then((res) => {
          console.log(res);
        });

      this.$store.commit("CARTDEL", index);
    },
    //选中删除
    onDel() {
      console.log(11);
      var a = [];
      this.result.map((data, index) => {
        if (data.ischecked == true) {
          // console.log(data.cart_id)
          a.push(data.cart_id);
        }
      });
      console.log(a);
      var str = a.join(",");
      console.log(this.$store.state.cartlist);
      this.$netlist
        .CartDel(
          qs.stringify({
            carId: str,
          })
        )
        .then((res) => {
          console.log(res);
        });
      this.$store.dispatch("CART");
    },
    onSubmit() {
      console.log(this.result);
      var arr = [];
      this.result.map((i) => {
        arr.push(i.product_id); //拿出数组里面的id给arr
      });
      let ids = arr.join(" ");
      console.log(ids);
      // let id = this.obj.product_id
      // console.log(id)
      this.$store.commit("IDS",ids);
      this.$router.push("/order");
    },
    //本地保存选中的都数据
    save() {
      localStorage.setItem("Orderlist", JSON.stringify(this.result));
    },
  },
};
</script>

<style scoped>
/* .vant-bar{
  display: flex;
  justify-content: space-between;
} */
header {
  width: 100%;
  height: 8vh;
  line-height: 8vh;
  font-size: 34px;
  text-align: center;
}
section {
  width: 100%;
  height: 80vh;
  overflow: scroll;
}
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.footer {
  position: absolute;
  bottom: 0px;
}
footer {
  width: 100%;
  position: absolute;
  bottom: 10vh;
}
</style>