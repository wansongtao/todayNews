<template>
  <div class="container">
    <div class="closeBtn">
      <span class="iconfont iconx"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <auth-input
      v-model="userName"
      placeholder="用户名"
      :isfocus="true"
      pattern="^[a-zA-Z][a-zA-Z0-9]{2,5}$"
      msg="请输入3-6位字母/数字组合且以字母开头的用户名"
    ></auth-input>
    <auth-input
      v-model="userPwd"
      placeholder="密码"
      pattern="^[a-zA-Z][\w]{5,15}$"
      msg="请输入6-16位字母、数字、下划线组合且以字母开头的密码"
    ></auth-input>
    <auth-btn @click="userLogin"></auth-btn>
  </div>
</template>

<script>
import AuthInput from "../components/AuthInput";
import AuthBtn from "../components/AuthBtn";

export default {
  data() {
    return {
      userName: "",
      userPwd: "",
      isLogin: false,
    };
  },
  components: {
    "auth-input": AuthInput,
    "auth-btn": AuthBtn,
  },
  methods: {
    userLogin() {
      if (!this.isLogin) {
        this.isLogin = true;
        if (this.userName && this.userPwd) {
          //用户登录
          console.log(this.userName, this.userPwd);
        } else {
          this.$toast.fail("请先输入用户名和密码");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_2210025_e5aasth4egc.css");

.container {
  padding: 20 / 360 * 100vw;
  // background-color: #f2f2f2;
}

.closeBtn {
  span {
    font-size: 27 / 360 * 100vw;
    color: rgb(95, 95, 95);
  }
}

.logo {
  margin-top: 10 / 360 * 100vw;
  text-align: center;
  span {
    line-height: 150 / 360 * 100vw;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
</style>