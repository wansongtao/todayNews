<template>
  <div class="edit_container">
    <h4>
      <router-link to="/personal"><i class="iconfont icondayu"></i></router-link
      >编辑资料
    </h4>
    <div class="userimg">
      <img :src="head_img" alt="头像" v-if="head_img != ''" />
      <img src="../assets/user.jpg" alt="头像" v-else />
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
      <personal-list listtext="昵称" :detailtext="nickname"></personal-list>
      <personal-list listtext="密码" detailtext="******"></personal-list>
      <personal-list listtext="性别" :detailtext="gender === 1 ? '男' : '女'"></personal-list>
    </div>
  </div>
</template>

<script>
import personalList from "../components/personalList";

export default {
  data() {
    return {
      head_img: "",
      gender: 1,
      nickname: '浮生若梦'
    };
  },
  components: {
    "personal-list": personalList,
  },
  created() {
    this.$axios.get("/user/" + localStorage.userId).then((res) => {
      const { gender, head_img, nickname } = res.data.data;

      this.gender = gender;
      if (head_img) {
        if (head_img.indexOf("http") == -1) {
          this.head_img = sessionStorage.baseURL + head_img;
        }
      }
      this.nickname = nickname;
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
            this.$toast.success('修改成功');
          });
      });
    },
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
</style>