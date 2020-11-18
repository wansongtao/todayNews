<template>
  <div class="container">
    <div class="closeBtn">
      <span class="iconfont iconx" @click="closeHandler"></span>
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
      v-model="nickname"
      placeholder="昵称"
      pattern="^[\u4e00-\u9fa5]{2,7}$"
      msg="请输入2-7位中文昵称"
    ></auth-input>
    <auth-input
      type="password"
      v-model="userPwd"
      placeholder="密码"
      pattern="^[a-zA-Z][\w]{5,15}$"
      msg="请输入6-16位字母、数字、下划线组合且以字母开头的密码"
    ></auth-input>
    <auth-btn text="注册" @click="userRegister"></auth-btn>
  </div>
</template>

<script>
import AuthInput from "../components/AuthInput";
import AuthBtn from "../components/AuthBtn";
//引入路由，才能使用router.push()跳转页面
import router from "../router/index";

export default {
  data() {
    return {
      userName: "",
      nickname: "",
      userPwd: "",
      //用来判断用户是否已经发送了注册请求
      isRegister: false,
    };
  },
  components: {
    "auth-input": AuthInput,
    "auth-btn": AuthBtn,
  },
  methods: {
    userRegister() {
      //用户没有发送注册请求
      if (!this.isRegister) {
        if (this.userName && this.nickname && this.userPwd) {
          const _this_ = this;
          _this_.isRegister = true;

          this.$axios
            .post(this.$serverUrl + "/register", {
              username: this.userName,
              password: this.userPwd,
              nickname: this.nickname,
            })
            .then((res) => {
              const data = res.data;

              if (data.statusCode) {
                this.$toast.fail(data.message);
                _this_.isRegister = false;
              } else {
                this.$toast.success(data.message);

                //跳转登录页
                setTimeout(() => {
                  _this_.isRegister = false;

                  router.push("/login");
                }, 1500);
              }
            })
            .catch((err) => {
              _this_.isRegister = false;
              console.log(err);
            });
        } else {
          this.$toast.fail("请先输入所有信息！");
        }
      }
    },
    closeHandler() {
      //用户点击关闭按钮后返回首页
      this.$dialog
        .confirm({
          message: "确定不注册一个账号吗？注册账号后可以得到更优的体验哦，亲。",
        })
        .then(() => {
          router.push("/");  //返回到首页
        })
        .catch(() => {});
    }
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
    font-size: 32 / 360 * 100vw;
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