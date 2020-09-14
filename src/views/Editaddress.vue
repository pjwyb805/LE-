<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />

    <!-- <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    /> -->
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县",
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区",
        },
      },
      searchResult: [],
    };
  },
  computed:{
    editlist:function(){
      return this.$store.state.eaidlist
    }
  },
  methods: {
    onSave(content) {
      //   Toast("save");
      console.log(content);
      this.$netlist
        .addArea(
          qs.stringify({
            Name: content.name, //收货人
            Phone: content.tel, //手机号
            Province: content.province, //省份
            City: content.city, //市区
            District: content.county, //县区
            Address: content.addressDetail, //详细地址
          })
        )
        .then((res) => {
          console.log(res);
        });
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style>
</style>