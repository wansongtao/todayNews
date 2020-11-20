<template>
  <div class="container">
    <div class="closeBtn">
      <span class="iconfont iconx" @click="closeHandler"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <auth-input
      ref="username"
      v-model="userName"
      placeholder="用户名"
      :isfocus="true"
      :pattern="rules.userName"
      msg="请输入3-6位字母/数字组合且以字母开头的用户名"
    ></auth-input>
    <auth-input
      ref="userpwd"
      type="password"
      v-model="userPwd"
      placeholder="密码"
      :pattern="rules.userPwd"
      msg="请输入6-16位字母、数字、下划线组合且以字母开头的密码"
    ></auth-input>
    <auth-btn @click.native="userLogin"></auth-btn>
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
      rules: {
        userName: /^[a-zA-Z][a-zA-Z0-9]{2,5}$/,
        userPwd: /^[a-zA-Z][\w]{5,15}$/
      },
      /**
       * @description 记录用户是否发送了登录请求，true发送了
       */
      isLogin: false,
    };
  },
  components: {
    "auth-input": AuthInput,
    "auth-btn": AuthBtn,
  },
  methods: {
    userLogin() {
      //判断用户是否已经发送了登录请求，发送了则不重复发送
      if (!this.isLogin) {
        if (this.userName && this.userPwd) {
          
          for(let item in this.rules) {
            //验证用户输入是否合法，this[item](item = userName) => this.userName
            if(!this.rules[item].test(this[item])) {
              this.$toast.fail('请先输入正确的用户名和密码');

              return false;
            }
          }

          const _this_ = this;
          _this_.isLogin = true;
          
          //发送请求
          this.$axios.post('/login', {
            username: _this_.userName,
            password: _this_.userPwd
          }).then(res => {
            const data = res.data;

            if(data.statusCode) {
              //登录失败
              _this_.isLogin = false;
              _this_.$toast.fail(data.message);
            } else {
              //登录成功
              _this_.$toast.success(data.message);
              localStorage.setItem('token', data.data.token);
              localStorage.userId = data.data.user.id;
              
              //1.5s后跳转到首页
              setTimeout(() => {
                _this_.isLogin = false;
                _this_.$router.push('/');
              }, 1500);
            }
          }).catch(err => {
            _this_.isLogin = false;
            _this_.$toast.fail('服务器繁忙，请稍后再试。');
            console.error(err);
          });
        } else {
          this.$toast.fail("请输入所有信息");

          setTimeout(() => {
            //聚焦到用户没有输值的input框
            if(this.userName.length === 0) {
              this.$refs.username.$refs.inputdom.focus();
            } else {
              this.$refs.userpwd.$refs.inputdom.focus();
            }
          }, 1500);
        }
      }
    },
    closeHandler() {
      //用户点击关闭按钮后返回首页
      this.$dialog
        .confirm({
          message: "确定要离开吗？登录后可以得到更优的体验哦，亲。",
        })
        .then(() => {
          //点击确认按钮
          this.$router.push("/");  //返回到首页
        })
        .catch(() => {
          //点击取消按钮，后聚焦到用户名输入框
          this.$refs.username.$refs.inputdom.focus();
        });
    }
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