<template>
  <div>
    <header>
        <div class="con">
          <div class="left">
            <img src="../assets/logo.png" alt />
            <br />
            <div class="msg">
              <p>耶啵</p>
              <p>王一博</p>
              <p>
                <span class="iconfont icon-shouji"></span>15936533121
              </p>
            </div>
          </div>

          <van-button round type="warning">已签到</van-button>
        </div>
        <div class="bottom">
          <p>每天领红包，年卡仅0.12元/天</p>
          <button>立即开通></button>
          <!-- <van-button type="default" size="small" round color="rgb(37,197,83)">立即开通></van-button> -->
        </div>
    </header>

    <div class="balance_integral">
      <div class="balance">账号余额元</div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
header{
  width: 100%;
  height: 20vh;
  background: red;
}

.con {
  width: 100%;
  height: 120px;
  display: flex;
  float: left;
  margin-top: 70px;
  justify-content: space-around;
}
.con img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.con .left {
  display: flex;
  vertical-align: middle;
}
.con .msg {
  margin-left: 20px;
}
.top .bottom {
  width: 90%;
  height: 90px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  float: left;
  margin-left: 5%;
  justify-content: space-between;
  font-size: 30px;
  color: white;
  background: rgb(78, 95, 128);
  text-indent: 10px;
  border-radius: 20px 20px 20px 20px;
}
.bottom button {
  display: inline-block;
  width: 150px;
  height: 50px;
  font-size: 24px;
  color: black;
  background: rgb(37, 197, 83);
  border: 0;
  outline: none;
  border-radius: 15px 15px 15px 15px;
  margin-right: 10px;
}
.balance_integral {
  width: 90%;
  height: 100px;
  background: white;
}
</style>