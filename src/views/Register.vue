<template>
  <div class="container">
    <div class="closeBtn">
      <span class="iconfont iconx" @click="closeHandler"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <auth-input
      ref="userName"
      v-model="userName"
      placeholder="用户名"
      :isfocus="true"
      :pattern="rules.userName"
      msg="请输入3-6位字母/数字组合且以字母开头的用户名"
    ></auth-input>
    <auth-input
      ref="nickName"
      v-model="nickName"
      placeholder="昵称"
      :pattern="rules.nickName"
      msg="请输入2-7位中文昵称"
    ></auth-input>
    <auth-input
      ref="userPwd"
      type="password"
      v-model="userPwd"
      placeholder="密码"
      :pattern="rules.userPwd"
      msg="请输入6-16位字母、数字、下划线组合且以字母开头的密码"
    ></auth-input>
    <auth-btn text="注册" @click.native="userRegister"></auth-btn>
  </div>
</template>

<script>
import AuthInput from "../components/AuthInput";
import AuthBtn from "../components/AuthBtn";

export default {
  data() {
    return {
      userName: "",
      nickName: "",
      userPwd: "",
      rules: {
        userName: /^[a-zA-Z][a-zA-Z0-9]{2,5}$/,
        nickName: /^[\u4e00-\u9fa5]{2,7}$/,
        userPwd: /^[a-zA-Z][\w]{5,15}$/
      },
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
        if (this.userName && this.nickName && this.userPwd) {
          for(let key in this.rules) {
            //验证用户输入是否合法
            if(!this.rules[key].test(this[key])) {
              let message = '请输入正确的信息';

              if (key == 'userName') {
                message = '请输入3-6位字母/数字组合且以字母开头的用户名';
              }
              else if (key == 'nickName') {
                message = '请输入2-7位中文昵称';
              }
              else if (key == 'userPwd') {
                message = '请输入6-16位字母、数字、下划线组合且以字母开头的密码';
              }
              this.$toast.fail(message);

              return false;
            }
          }

          const _this_ = this;
          _this_.isRegister = true;

          //发送注册请求
          this.$axios
            .post("/register", {
              userName: this.userName,
              userPwd: this.userPwd,
              nickName: this.nickName,
            })
            .then((res) => {
              const data = res.data;

              if (data.statusCode === 200) {
                //注册成功
                this.$toast.success(data.message || '注册成功');

                //跳转登录页
                setTimeout(() => {
                  _this_.isRegister = false;

                  _this_.$router.push("/login");
                }, 1500);
                
              } else {
                //注册失败
                this.$toast.fail(data.message);
                _this_.isRegister = false;
              }
            })
            .catch((err) => {
              _this_.isRegister = false;
              _this_.$toast.fail("服务器繁忙，请稍后再试。");
              console.log(err);
            });
        } else {
          this.$toast.fail("请先输入所有信息！");

          //聚焦到用户没有输入信息的输入框
          setTimeout(() => {
            if(this.userName.length === 0) {
              this.$refs.userName.$refs.inputdom.focus();
            } else if(this.nickName.length === 0) {
              this.$refs.nickName.$refs.inputdom.focus();
            } else {
              this.$refs.userPwd.$refs.inputdom.focus();
            }
          }, 1500);
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
          this.$router.push("/"); //返回到首页
        })
        .catch(() => {
          //用户点击取消按钮，聚焦到用户名输入框
          this.$refs.userName.$refs.inputdom.focus();
        }); 
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