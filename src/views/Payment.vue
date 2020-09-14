<template>
  <div>
    <van-nav-bar title="我的订单" right-text="按钮" left-arrow @click-left="onClickLeft" />
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="支付宝" clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="微信" clickable @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell title="余额宝" clickable @click="radio = '3'">
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <van-button type="primary" size="large" @click="onsubmit">确认支付</van-button>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      :focused="showKeyboard"
      @focus="showKeyboard = false"
      v-show="iswyb"
    >
      <template #info>
        <span v-show="iswyb">密码为 6 位数字</span>
      </template>
    </van-password-input>
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import qs from "qs";
import md5 from "js-md5";
import { Notify } from "vant";
export default {
  data() {
    return {
      radio: "1",
      value: "",
      showKeyboard: false,
      iswyb: false,
      orderNumber: "",
    };
  },

  created() {
    console.log(this.$route.query.item.address);
    let name = this.$route.query.item.name;
    let tel = this.$route.query.item.tel;
    let address = this.$route.query.item.address; //详细地址
    let city = this.$route.query.item.city; //市区
    let id = this.$store.state.id;
    console.log(id);
    //   let goodsid = JSON.parse(id)
    //   console.log(goodsid)
    //   var ids = id.join(" ")
    this.$netlist
      .createOrder(
        qs.stringify({
          goodsId: id,
          price: 1000,
          consignee_addr: `${name + "," + tel + "," + city + address}`,
        })
      )
      .then((res) => {
        console.log(res.data.data);
        this.orderNumber = res.data.data[0].orderNumber;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      //   console.log(this.value)
      if (this.value.length == 6) {
        this.$netlist
          .paypwd(
            qs.stringify({
              paypwd: md5(this.value),
            })
          )
          .then((res) => {
            console.log(res);
          });
        if (this.radio == 3) {
          this.$netlist
            .payOrder(
              qs.stringify({
                orderNum: this.orderNumber,
              })
            )
            .then((res) => {
              console.log(res);
              // 成功通知
              Notify({ type: "primary", message: "支付成功" });
            });
        }
        if (this.radio == 1) {
          this.$netlist
            .appWebPay(
              qs.stringify({
                OutTradeNo: this.orderNumber, //订单编号
                Subject: "支付宝支付",
                ProductCode: "QUICK_WAP_WAY",
                TotalAmount: 1000, //价格
              })
            )
            .then((res) => {
              console.log(res);
              // return;

              if (res.data.code == 201) {
                this.html = res.data.data;
                var from = res.data.data;
                var div = document.createElement("div");
                div.innerHTML = from;
                document.body.appendChild(div);
                document.forms[0].submit();
              }
            });
        }
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    onsubmit() {
      this.showKeyboard = true;
      this.iswyb = true;
    },
  },
};
</script>

<style scoped>
van-button {
  bottom: 0;
}
</style>