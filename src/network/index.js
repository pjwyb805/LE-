import { methods, PATH} from './config';
import { request } from './core';
//入口文件 引入核心文件和配置文件  
//封装一个函数  返回请求方式和请求地址并传参
//最后一步把入口文件抛出在main.js全局注册 
const netlist = {
    homelist(params) {
        return request(methods.GET, PATH.homelist, params)
    },
    shoplist(params) {
        return request(methods.GET, PATH.shoplist, params)
    },
    classifylist(params) {
        return request(methods.GET, PATH.classifylist, params)
    },
    shopList(params) {
        return request(methods.GET, PATH.shopList, params)
    },
    loginPage(params) {
        return request(methods.GET, PATH.loginPage, params)
    },
    tell(params) {
        return request(methods.GET, PATH.tell, params)
    },
    user(params) {
        return request(methods.GET, PATH.user, params)
    },
    loginPage(params) {
        return request(methods.POST, PATH.loginPage, params)
    },
    toloading(params) {
        return request(methods.POST, PATH.loading, params)
    },
    details(params) {
        return request(methods.GET, PATH.details, params)
    },
    addCart(params) {
        return request(methods.POST, PATH.addCart, params)
    },
    Cartxinxi(params) {
        return request(methods.GET, PATH.Cartxinxi, params)
    },
    CartNum(params) {
        return request(methods.PATCH, PATH.CartNum, params)
    },
    CartDel(params) {
        return request(methods.PATCH, PATH.CartDel, params)
    },
    Order(params){
        return request(methods.GET, PATH.Order, params)
    },
    addArea(params){
        return  request(methods.POST, PATH.addArea, params)
    },
    getArea(params){
        return request(methods.GET, PATH.getArea, params)
    },
    pathArea(params){
        return request(methods.PATCH,PATH.pathArea,params)
    },
    paypwd(params){
        return request(methods.POST,PATH.paypwd,params)
    },
    payOrder(params){
        return request(methods.POST,PATH.payOrder,params)
    },
    createOrder(params){
        return request(methods.POST,PATH.createOrder,params)
    },
    appWebPay(params){
        return request(methods.POST,PATH.appWebPay,params)
    },
    searchHot(params){
        return request(methods.GET,PATH.searchHot,params)
    },
    getGoods(params){
        return request(methods.GET,PATH.getGoods,params)
    }

}
export default netlist;
