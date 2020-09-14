<template>
  <div>
    <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    ></van-address-list>
    <van-dialog v-model="show" show-cancel-button>
      <template #title>
        <Edit class="address"></Edit>
      </template>
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";
import Edit from "./Editaddress";
import qs from 'qs'
export default {
  components: {
    Edit: Edit,
  },
  data() {
    return {
      list: [],
      show: false,
      chosenAddressId: "1",
    };
  },
  computed: {
    addresslist: function () {
      return this.$store.state.addresslist;
    },
  },
  created() {
    this.$netlist
      .getArea({
        params: {
          page: 1,
          pageSize: 20,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        this.list = res.data.data;
      });
  },
  methods: {
    //返回上一页
    onClickLeft() {
      window.history.back();
    },
    onAdd() {
      //   Toast("新增地址");
      this.show = true;
    },
    onEdit(item, index) {
      // Toast("编辑地址:" + index);
      console.log(item)
      this.show = true
      this.$store.commit("EDIT",item)
      // this.$netlist.pathArea(qs.stringify({
      //   CustomerAddrId:item.customerAddrId,
      //   CustomerId:item.customerId,
      //   Name:item.name,
      //   Phone:item.tel,
      //   Province:item.province,//市
      //   City:item.city,//市
      //   District:item.district,//区
      //   Address:item.address,
      //   IdDel:item.isDel,
      //   IsDefault:item.isDefault,
      // })).then(res=>{
      //   console.log(res)
      // })
    },
    onSelect(item){
        console.log(item)
        this.$store.commit("onSele",item)
        this.$router.push("/order")
    }   
  },
};
</script>

<style scoped>
.address {
  width: 80%;
  height: 750px;
  margin: 0 auto;
}
</style>