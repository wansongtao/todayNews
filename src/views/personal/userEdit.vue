<template>
  <div class="edit_container">
    <head-title title="编辑资料" @back="$router.back()"></head-title>

    <div class="userimg">
      <img :src="head_img | imgUrl" alt="头像" v-if="head_img != ''" />
      <img src="../../assets/user.jpg" alt="头像" v-else />
      <div class="uploadimg">
        <van-uploader
          multiple
          :max-count="1"
          :max-size="500 * 1024"
          @oversize="onOversize"
          :after-read="afterRead"
        >
          <span class="iconfont iconzhaoxiangji"></span>
        </van-uploader>
      </div>
    </div>
    <div class="edit_list">
      <personal-list
        listtext="昵称"
        :detailtext="nickname"
        @click.native="nickNameShow = true"
      ></personal-list>

      <personal-list
        listtext="密码"
        detailtext="******"
        @click.native="userPwdShow = true"
      ></personal-list>

      <personal-list
        listtext="性别"
        :detailtext="gender === 0 ? '男' : '女'"
        @click.native="sexShow = true"
      ></personal-list>
    </div>

    <!-- 弹出框修改昵称 -->
    <van-dialog
      v-model="nickNameShow"
      title="修改昵称"
      show-cancel-button
      @confirm="updateName"
      @cancel="updateNickName = ''"
      :before-close="beforeCloseName"
    >
      <div class="updatemsg">
        <auth-input
          type="text"
          v-model="updateNickName"
          placeholder="请输入昵称"
          :pattern="rules.nickName"
          msg="请输入2-7位中文昵称"
        ></auth-input>
      </div>
    </van-dialog>

    <!-- 修改密码 -->
    <van-dialog
      v-model="userPwdShow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePwd"
      @cancel="
        oldPwd = '';
        newPwd = '';
      "
      :before-close="beforeClosePwd"
    >
      <div class="updatemsg">
        <auth-input
          type="password"
          v-model="oldPwd"
          placeholder="原密码"
          :pattern="rules.userPwd"
          msg="请输入6-16位字母、数字、下划线组合且以字母开头的密码"
        ></auth-input>
        <auth-input
          type="password"
          v-model="newPwd"
          placeholder="新密码"
          :pattern="rules.userPwd"
          msg="请输入6-16位字母、数字、下划线组合且以字母开头的密码"
        ></auth-input>
      </div>
    </van-dialog>

    <!-- 修改性别 -->
    <van-action-sheet
      v-model="sexShow"
      :actions="actions"
      description="修改性别"
      cancel-text="取消"
      close-on-click-action
      @select="updateSex"
    />
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
import personalList from "../../components/personalList";
import AuthInput from "../../components/AuthInput";
export default {
  data() {
    return {
      head_img: "",
      gender: 1,
      nickname: "浮生若梦",
      nickNameShow: false,
      updateNickName: "",
      userPwdShow: false,
      oldPwd: "",
      newPwd: "",
      rules: {
        nickName: /^[\u4e00-\u9fa5]{2,7}$/,
        userPwd: /^[a-zA-Z][\w]{5,15}$/,
      },
      sexShow: false,
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  components: {
    "head-title": headertitle,
    "personal-list": personalList,
    "auth-input": AuthInput,
  },
  created() {
    this.$axios.get("/userdetail").then((res) => {
      if (res.data.statusCode == 200) {
        const {
          gender,
          head_img,
          nickName,
          userName,
        } = res.data.data.userDetail;

        this.gender = parseInt(gender);
        if (head_img) {
          this.head_img = head_img;
        }
        this.nickname = nickName || userName;
      }
    });
  },
  methods: {
    onOversize() {
      this.$toast.fail("文件大小不能超过500kb");
    },
    /**
     * @description 修改用户头像
     */
    afterRead(file) {
      // console.log(file);

      const data = new FormData();
      data.append("file", file.file);

      //先上传文件
      this.$axios.post("/uploadfile", data).then((res) => {
        if (res.data.statusCode == 200) {
          this.head_img = res.data.data.imgUrl;

          //再修改头像
          this.$axios
            .post("/useredit", {
              head_img: this.head_img,
            })
            .then((res) => {
              this.$toast.success(res.data.message || "修改成功");
            });
        }
      });
    },
    /**
     * @description 修改昵称
     */
    updateName() {
      if (this.rules.nickName.test(this.updateNickName)) {
        if (this.nickname != this.updateNickName) {
          //只有昵称改变了才发送请求
          let data = { nickName: this.updateNickName };

          this.$axios.post("/useredit", data).then((res) => {
            this.$toast.success(res.data.message || "修改成功");

            this.nickname = this.updateNickName;
          });
        }
      }
    },
    /**
     * @description 修改性别
     */
    updateSex(action, index) {
      if (this.gender != index) {
        //只有当性别改变了才发送请求
        this.$axios
          .post("/useredit", {
            gender: index,
          })
          .then((res) => {
            if (res.data.statusCode == 200) {
              this.$toast.success(res.data.message || "修改成功");
              this.gender = index;
            }
          });
      }
    },
    /**
     * @description 关闭修改昵称弹出框之前
     */
    beforeCloseName(action, done) {
      if (action == "confirm") {
        if (!this.rules.nickName.test(this.updateNickName)) {
          this.$toast.fail("请输入2-7位中文昵称");
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },
    /**
     * @description 修改密码
     */
    updatePwd() {
      if (this.oldPwd != this.newPwd) {
        if (
          this.rules.userPwd.test(this.oldPwd) &&
          this.rules.userPwd.test(this.newPwd)
        ) {
          this.$axios
            .post("/updatepwd", {
              oldPwd: this.oldPwd,
              newPwd: this.newPwd,
            })
            .then((res) => {
              if (res.data.statusCode == 200) {
                this.$toast.success(res.data.message || "修改成功");
              }
            });
        }
      }
    },
    /**
     * @description 关闭修改密码弹出框之前
     */
    beforeClosePwd(action, done) {
      if (action == "confirm") {
        if (
          !this.rules.userPwd.test(this.oldPwd) ||
          !this.rules.userPwd.test(this.newPwd)
        ) {
          this.$toast.fail(
            "请输入6-16位字母、数字、下划线组合且以字母开头的密码"
          );
          done(false);
        } else if (this.oldPwd == this.newPwd) {
          this.$toast.fail("新密码不能和原密码相同");
          done(false);
        } else {
          this.oldPwd = "";
          this.newPwd = "";
          done();
        }
      } else {
        this.oldPwd = "";
        this.newPwd = "";
        done();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.userimg {
  position: relative;
  // margin: 20 / 360 * 100vw;
  img {
    display: block;
    width: 80 / 360 * 100vw;
    height: 80 / 360 * 100vw;
    margin: 20 / 360 * 100vw auto;
    border-radius: 40 / 360 * 100vw;
  }

  .uploadimg {
    position: absolute;
    top: 0;
    left: 50%;
    width: 80 / 360 * 100vw;
    height: 80 / 360 * 100vw;
    margin-left: -40 / 360 * 100vw;
    border-radius: 40 / 360 * 100vw;
    text-align: center;
    line-height: 80 / 360 * 100vw;
    background: rgba(0, 0, 0, 0.3);

    span {
      display: block;
      width: 80 / 360 * 100vw;
      font-size: 20 / 360 * 100vw;
      color: rgb(59, 56, 56);
      opacity: 0.5;
    }
  }
}

.updatemsg {
  width: 80%;
  margin: 10 / 360 * 100vw auto;
}
</style>