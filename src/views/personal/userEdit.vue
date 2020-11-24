<template>
  <div class="edit_container">
    <h4>
      <router-link to="/personal"><i class="iconfont icondayu"></i></router-link
      >编辑资料
    </h4>
    <div class="userimg">
      <img :src="head_img" alt="头像" v-if="head_img != ''" />
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
        @click.native="
          showDialog('昵称', /^[\u4e00-\u9fa5]{2,7}$/, '请输入2-7位中文昵称')
        "
      ></personal-list>

      <personal-list
        listtext="密码"
        detailtext="******"
        @click.native="
          showDialog(
            '密码',
            /^[a-zA-Z][\w]{5,15}$/,
            '请输入6-16位字母、数字、下划线组合且以字母开头的密码',
            'password'
          )
        "
      ></personal-list>

      <personal-list
        listtext="性别"
        :detailtext="gender === 0 ? '男' : '女'"
        @click.native="sexShow = true"
      ></personal-list>
    </div>

    <!-- 弹出框修改昵称和密码 -->
    <van-dialog
      v-model="show"
      :title="'修改' + title"
      show-cancel-button
      @confirm="updatemsg"
      @cancel="updateText = ''"
      :before-close="beforeClose"
    >
      <div class="updatemsg">
        <auth-input
          :type="type"
          v-model="updateText"
          :placeholder="title"
          :pattern="rules"
          :msg="msg"
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
import personalList from "../../components/personalList";
import AuthInput from "../../components/AuthInput";
export default {
  data() {
    return {
      head_img: "",
      gender: 1,
      nickname: "浮生若梦",
      show: false,
      updateText: "",
      rules: "",
      title: "",
      msg: "",
      type: "",
      sexShow: false,
      actions: [{ name: '男' }, { name: '女' }],
    };
  },
  components: {
    "personal-list": personalList,
    "auth-input": AuthInput,
  },
  created() {
    this.$axios.get("/userdetail").then((res) => {
      const { gender, head_img, nickName, userName } = res.data.data.userDetail;
      
      this.gender = parseInt(gender);
      if (head_img) {
        if (head_img.indexOf("http") == -1) {
          this.head_img = sessionStorage.baseURL + head_img;
        } else {
          this.head_img = head_img;
        }
      }
      this.nickname = nickName || userName;
    });
  },
  methods: {
    onOversize() {
      this.$toast.fail("文件大小不能超过500kb");
    },
    afterRead(file) {
      // console.log(file);

      const data = new FormData();
      data.append("file", file.file);

      this.$axios.post("/upload", data).then((res) => {
        this.head_img = sessionStorage.baseURL + res.data.data.url;

        this.$axios
          .post("/user_update/" + localStorage.userId, {
            head_img: this.head_img,
          })
          .then((res) => {
            this.$toast.success("修改成功");
          });
      });
    },
    /**
     * @description 显示弹出框
     * @param {string} text 修改信息名称
     * @param {RegExp} rule 验证的正则
     * @param {string} msg 验证失败的提示文本
     * @param {string} type 输入框类型
     */
    showDialog(text = "昵称", rule = /[0-9]/, msg = "失败", type = "text") {
      this.title = text;
      this.rules = rule;
      this.msg = msg;
      this.type = type;
      this.show = true;
    },
    /**
     * @description 点击确认按钮后，修改用户信息
     */
    updatemsg() {
      if (this.rules.test(this.updateText)) {
        let data = {};
        if (this.type == "password") {
          data = { password: this.updateText };
        } else {
          data = { nickname: this.updateText };
        }

        this.$axios
          .post("/user_update/" + localStorage.userId, data)
          .then((res) => {
            this.$toast.success("修改成功");

            if (this.type != "password") {
              this.nickname = this.updateText;
            }
          });
      }
      
    },
    updateSex(action, index) {
      this.$axios.post('/user_update/' + localStorage.userId, {
        gender: index
      })
      .then(res => {
        this.$toast.success("修改成功");
        this.gender = res.data.data.gender;
      });
    },
    beforeClose(action, done) {
      if(action == 'confirm') {
        if(!this.rules.test(this.updateText)) {
          this.$toast.fail(this.msg);
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    }
  },
};
</script>

<style lang="less" scoped>
h4 {
  text-align: center;
  font-size: 16 / 360 * 100vw;
  line-height: 40 / 360 * 100vw;
  color: rgb(126, 122, 122);

  i {
    position: absolute;
    top: 0;
    left: 15 / 360 * 100vw;
    font-size: 16 / 360 * 100vw;
  }
}

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