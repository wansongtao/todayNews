<template>
  <div class="personal_container">
    <!-- 用户信息 -->
    <router-link to="/personal/useredit">
      <div class="userinfo">
        <img :src="head_img" alt="头像" />
        <div class="username">
          <p><i :class="['iconfont', gender === 0 ? 'iconnan1' : 'iconnv']"></i>{{nickname}}</p>
          <span class="date">2020-11-20</span>
        </div>
        <span class="iconfont iconright"></span>
      </div>
    </router-link>

    <!-- 工具列表 -->
    <div class="barlist">
      <!-- <router-link to="/">
        <div class="destext">我的关注</div>
        <div class="detailinfo">
          关注的用户<i class="iconfont iconright"></i>
        </div>
      </router-link> -->
      <personal-list
        url="/personal/attention"
        listtext="我的关注"
        detailtext="关注的用户"
      ></personal-list>
      <personal-list
        url="/personal/commentlist"
        listtext="我的跟帖"
        detailtext="跟帖/回复"
      ></personal-list>
      <personal-list
        url="/personal/collect"
        listtext="我的收藏"
        detailtext="文章/视频"
      ></personal-list>
      <personal-list url="/login" listtext="退出登录" @click.native="handlerClick"></personal-list>
      <personal-list url="/" listtext="返回首页"></personal-list>
    </div>
  </div>
</template>

<script>
import personalList from "../components/personalList";
export default {
  data() {
      return {
          gender: 1,
          head_img: '../assets/user.jpg',
          nickname: ''
      }
  },
  components: {
    "personal-list": personalList,
  },
  created() {
      this.$axios.get('/user/' + localStorage.userId, {
        headers: {
            Authorization: localStorage.token
        }
      }).then(res => {
          const {gender, head_img, nickname, username} = res.data.data;

          this.gender = gender;
          if(head_img) {
              if(head_img.indexof('http') == -1) {
                  this.head_img = sessionStorage.baseURL + head_img;
              }
          }
          this.nickname = nickname || username;
      });
  },
  methods: {
      handlerClick() {
          delete localStorage.token;
          delete localStorage.userId;
      }
  }
};
</script>

<style lang="less" scoped>
.userinfo {
  display: flex;
  padding: 10 / 360 * 100vw;
  align-items: center;
  justify-content: space-between;
  border-bottom: 5px solid #e4e4e4;

  img {
    width: 60 / 360 * 100vw;
    height: 60 / 360 * 100vw;
    border-radius: 30 / 360 * 100vw;
  }

  .username {
    flex: 1;
    padding: 0 10 / 360 * 100vw;
    height: 60 / 360 * 100vw;
    p {
      height: 15 / 360 * 100vw;
      padding-top: 15 / 360 * 100vw;
      font-size: 15 / 360 * 100vw;
      i {
        margin-right: 5 / 360 * 100vw;
        font-size: 15 / 360 * 100vw;
      }
    }

    .date {
      display: inline-block;
      height: 30 / 360 * 100vw;
      font-size: 15 / 360 * 100vw;
      line-height: 30 / 360 * 100vw;
      color: rgb(182, 179, 179);
    }
  }

  span {
    font-size: 20 / 360 * 100vw;
    line-height: 60 / 360 * 100vw;
  }
}
</style>