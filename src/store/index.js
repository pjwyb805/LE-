import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import netlist from '../network/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    shoplist: [],
    cartlist: [],//购物车
    resslist: {},
    id:"",
    eaidlist:{}//修改的对象
  },
  mutations: {
    TOKEN(state, token) {
      state.token = token
    },
    CART(state, item) {
      state.cartlist = [...item]
      state.cartlist.forEach((ele, index) => {
        if (ele == null) {
          state.cartlist.splice(index, 1)
        }
      })

    },
    CARTDEL(state, index) {
      state.cartlist.splice(index, 1);
    },
    onSele(state, item) {
      state.resslist = item
    },
    IDS(state, id) {
      console.log(id)
      state.id = id
    },
    EDIT(state,item){
      state.eaidlist = item
    }
  },
  actions: {
    TOKEN(context, token) {
      context.commit('TOKEN', token)
    },
   
    CART(context) {
      netlist
        .Cartxinxi({
          params: {
            page: 1,
            pageSize: 20,
          },
        })
        .then((res) => {
          console.log(res.data);
          context.commit('CART', res.data.data)
        });
    }
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.localStorage
  })]
})
