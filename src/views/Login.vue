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
      type="password"
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
import router from "../router/index";

export default {
  data() {
    return {
      userName: "",
      userPwd: "",
      //判断用户是否发送了登录请求
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
        if (this.userName && this.userPwd) {
          const _this_ = this;
          _this_.isLogin = true;
          
          this.$axios.post(this.$serverUrl + '/login', {
            username: _this_.userName,
            password: _this_.userPwd
          }).then(res => {
            const data = res.data;

            if(data.statusCode) {
              _this_.isLogin = false;
              _this_.$toast.fail(data.message);
            } else {
              _this_.$toast.success(data.message);
              localStorage.setItem('token', data.data.token);

              setTimeout(() => {
                _this_.isLogin = false;
                router.push('/');
              }, 1500);
            }
          }).catch(err => {
            _this_.isLogin = false;

            console.error(err);
          });
        } else {
          this.$toast.fail("请先输入用户名和密码");
        }
      }
    },
    closeHandler() {
      //用户点击关闭按钮后返回首页
      this.$dialog
        .confirm({
          message: "确定不登录吗？登录后可以得到更优的体验哦，亲。",
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