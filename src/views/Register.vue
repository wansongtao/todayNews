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
      :pattern="/^[a-zA-Z][a-zA-Z0-9]{2,5}$/"
      msg="请输入3-6位字母/数字组合且以字母开头的用户名"
      @isVerify="isVerify"
    ></auth-input>
    <auth-input
      v-model="nickname"
      placeholder="昵称"
      :pattern="/^[\u4e00-\u9fa5]{2,7}$/"
      msg="请输入2-7位中文昵称"
      @isVerify="isVerify"
    ></auth-input>
    <auth-input
      type="password"
      v-model="userPwd"
      placeholder="密码"
      :pattern="/^[a-zA-Z][\w]{5,15}$/"
      msg="请输入6-16位字母、数字、下划线组合且以字母开头的密码"
      @isVerify="isVerify"
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
      /**
       * @description 记录用户是否发送了注册请求，true发送了
       */
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

          //发送注册请求
          this.$axios
            .post(this.$serverUrl + "/register", {
              username: this.userName,
              password: this.userPwd,
              nickname: this.nickname,
            })
            .then((res) => {
              const data = res.data;

              if (data.statusCode) {
                //注册失败
                this.$toast.fail(data.message);
                _this_.isRegister = false;
              } else {
                //注册成功
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
              _this_.$toast.fail("服务器繁忙，请稍后再试。");
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
          message: "确定要离开吗？注册账号后可以得到更优的体验哦，亲。",
        })
        .then(() => {
          //用户点击确认按钮
          router.push("/"); //返回到首页
        })
        .catch(() => {}); //用户点击取消按钮
    },
    /**
     * @description 自定义事件，当用户输入不合法时不发送请求
     * @param {Boolean} isValidate 子组件传过来的值，合法true
     */
    isVerify(isValidate) {
      this.isRegister = !isValidate;
    },
  },
};
</script>

<style lang="less" scoped>
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