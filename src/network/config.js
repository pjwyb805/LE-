//封装请求方式
export const methods = {
    GET: "get",
    POST: "post",
    PATCH:"patch",
}
//请求路径
export const PATH = {
    homelist: "/api/Home/getHomeREC",//九宫格
    shoplist:"/api/Home/getHomeShowGoods",
    classifylist:"/api/Goods/getCatsTree",
    shopList:"/api/Goods/getCadGoods",
    tell:"/api/Verify/GetPhone",
    user:"/api/Verify/LoginName",
    loginPage:"/api/LoginPage/AddLogin",
    loading:"/api/LoginPage/Login",
    details:"/api/Goods/GetGoodsInfo",//详情
    addCart:"/api/Cart/addCart",//添加购物车
    Cartxinxi:"/api/Cart/getCart",//购物车信息
    CartNum:"/api/Cart/patchCartNum", //修改购物车中商品的数量
    CartDel:"/api/Cart/DeleteCart",//删除购物车商品
    Order:"/api/Order/getOrderInfo",//展示订单
    addArea:"/api/UserInfo/addArea",//添加用户地址
    getArea:"/api/UserInfo/getArea",//获取用户地址
    pathArea:"/api/UserInfo/patchArea",//修改用户地址
    paypwd:"/api/Order/verifyPayPWD",//验证支付密码
    payOrder:"/api/Order/payOrder",//验证支付密码成功
    createOrder:"/api/Order/cretaeOrder",//创建订单号
    appWebPay:"/api/Alipay/appWebPay",//手机网页支付
    log:"/api/Log/getBalanceLog",//余额积分
    searchHot:"/api/Goods/getSearchHot",//热搜词
    getGoods:"/api/Goods/getGoods"//搜索
}
//配置文件
