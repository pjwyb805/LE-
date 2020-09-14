<template>
  <div>
    <header>
      <img src="../assets/logo.png" alt />
    </header>
    <div class="btn">
      <button @click="loading" :class="iswyb? 'active':''">登录</button>
      <button @click="zhuce" :class="iswyb? '':'active'">注册</button>
    </div>
    <section>
      <!-- 注册 -->
      <div class="main" v-show="iswyb">
        <p>
          <span class="iconfont icon-start-copy1"></span>
          <span>手机号码</span>
        </p>
        <input type="text" placeholder="注册手机为找回密码的唯一凭证" class="input" v-model="tel" />
        <p>
          <span class="iconfont icon-start-copy1"></span>
          <span>登录名</span>
        </p>
        <input type="text" placeholder="中、英文均可，不超过12个字符" class="input" v-model="username" />
        <p>
          <span class="iconfont icon-start-copy1"></span>
          <span>密码</span>
        </p>
        <input type="text" placeholder="3-18位英文、数字、符号、区分大小写" class="input" v-model="password" />
        <p>短信验证码</p>
        <input type="text" class="input-text" placeholder="请输入验证码" v-model="msg" />
        <button class="butt" @click="duanxin">发送验证码</button>
        <button class="button" @click="rag">立即注册</button>
      </div>
      <!-- 登录 -->
      <div class="main" v-show="!iswyb">
        
        <p>
          <span class="iconfont icon-start-copy1"></span>
          <span>账号</span>
        </p>
        <input v-model="tousername" type="text" placeholder="请输入登录账号" class="input" />
        <p>
          <span class="iconfont icon-start-copy1"></span>
          <span>密码</span>
        </p>
        <input type="text" placeholder="请输入登录密码" class="input" v-model="topassword" />
        <br />
        <br />
        <input type="checkbox" style="width:20px;height:20px" /> 记住密码
        <button class="button" @click="onload">登录</button>

        <div class="con">
          <a href>找回密码</a>|还没有注册账号？
          <span>立即注册</span>
        </div>
      </div>
    </section>
    <footer>
      <img src="../assets/wyb1.png" alt />
    </footer>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      iswyb: false,
      tel: "", //手机号
      username: "", //名字
      password: "", //密码
      msg: "", //验证码
      tousername: "", //名字
      topassword: "", //密码
      show:false
    };
  },
  methods: {
   
    loading() {
      //登录
      this.iswyb = false;
    },
    zhuce() {
      this.iswyb = true;
    },
    rag() {
      //注册
      console.log(this.username);
      console.log(this.password);
      console.log(this.tel);
      this.$netlist
        .loginPage(
          qs.stringify({
            LoginName: this.username,
            LoginPassword: this.password,
            phone: this.tel,
          })
        )
        .then((res) => {
          console.log(res);
        });
    },

    duanxin() {
      //短信验证
      this.$netlist
        .tell({
          params: {
            phone: this.tel,
          },
        })
        .then((res) => {
          console.log(res);
        });
      this.$netlist
        .user({
          params: {
            LoginName: this.username,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    //登录
    onload() {
      this.$netlist
        .toloading(
          qs.stringify({
            LoginName: this.tousername,
            LoginPassword: this.topassword,
            isPassing:"yes"
          })
        )
        .then((res) => {
          console.log(res);
         this.$store.dispatch("TOKEN",res.data.tnToken.tokenStr)
          if(res.data.code==200){
            this.$router.push("/home")
          }
        });
    },
  },
  mounted() {},
};
</script>
<style less="scss" scoped>
header {
  width: 100%;
  height: 8vh;
  border-bottom: 1px solid black;
}
header img {
  width: 100%;
  height: 8vh;
}
.btn {
  width: 100%;
  height: 100px;
  display: flex;
  color: purple;

}
.btn button {
  width: 50%;
  height: 100px;
  border: 0;
  outline: none;
  font-size: 30px;
}
section {
  width: 100%;
  height: 68vh;
}
.main {
  width: 75%;
  margin: 0 auto;
}
.main p {
  font-size: 30px;
  margin-top: 70px;
}
.main .input {
  width: 80%;
  height: 60px;
  margin-top: 20px;
  border: 1px solid #999;
  font-size: 28px;
}
.main input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #aab2bd;
  /* placeholder字体大小  */
  font-size: 24px;
  /* placeholder位置  */
  text-indent: 20px;
}
.main .con {
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  text-align: center;
}
.main .input-text {
  width: 45%;
  height: 65px;
  margin-top: 10px;
  border: 1px solid #999;
}
.main .butt {
  width: 140px;
  height: 67px;
  background: #409eff;
  border: 0;
  margin-left: 30px;
  margin-top: 1px;
  color: white;
}
.button {
  width: 100%;
  height: 80px;
  margin-top: 40px;
  background: #409eff;
  border: 0;
  border-radius: 5px 5px 5px 5px;
  font-size: 28px;
  color: white;
}
.icon-start-copy1 {
  color: red;
}
.active{
  width: 100%;
  height: 100%;
  background: white;
  color: black;
}
footer {
  width: 100%;
  height: 14vh;
}
footer img {
  width: 100%;
  height: 10vh;
}
</style>