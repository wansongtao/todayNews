<template>
  <div class="container">
    <head-title title="我的关注" @back="$router.back()"></head-title>
    <main v-if="followUserList.length > 0">
      <div
        class="comment_listtop"
        v-for="(item, index) in followUserList"
        :key="index + 'followuserlist'"
      >
        <img
          :src="item.head_img | imgUrl"
          alt="头像"
          v-if="item.head_img != null"
        />
        <img src="../../assets/user.jpg" alt="头像" v-else />
        <div>
          <span class="username">{{item.nickName || '浮生若梦'}}</span><br />
          <span class="date">{{item.followDate.substr(0, 10) || '2020-11-11'}}</span>
        </div>
        <span class="btn" @click="unFollow(index)"><p>取消关注</p></span>
      </div>
    </main>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      followUserList: [],
    };
  },
  components: {
    "head-title": headertitle,
  },
  created() {
    this.$axios.get("/followuserlist").then((res) => {
      let data = res.data;

      if (data.statusCode == 200) {
        this.followUserList = data.data.followUserList;
      } else if (data.statusCode == 201) {
        this.$toast.fail(data.message || "您没有关注任何用户");
      }
    });
  },
  methods: {
    unFollow(index) {
      let userId = this.followUserList[index].userId;
      
      this.$axios.get('/unfollow', {params: {followUserId: userId}}).then(res => {
        let data = res.data;
        if (data.statusCode == 200) {
          this.$toast.success(data.message || '取消关注成功');
          this.followUserList.splice(index, 1);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
main {
  box-sizing: border-box;
  width: 100%;
  padding: 20 / 360 * 100vw 10 / 360 * 100vw;
}

.comment_listtop {
  display: flex;
  padding: 5 / 360 * 100vw 0;
  border-bottom: 1px solid rgb(190, 188, 188);

  img {
    display: block;
    width: 40 / 360 * 100vw;
    height: 40 / 360 * 100vw;
    border-radius: 20 / 360 * 100vw;
  }

  div {
    flex: 1;
    margin-left: 10 / 360 * 100vw;
    .username {
      font-size: 14 / 360 * 100vw;
      color: #000;
    }

    .date {
      font-size: 12 / 360 * 100vw;
      color: rgb(185, 183, 183);
    }
  }

  .btn {
    height: 30 / 360 * 100vw;
    margin: 5 / 360 * 100vw 0;
    padding: 0 10 / 360 * 100vw;
    font-size: 13 / 360 * 100vw;
    color: rgb(10, 10, 10);
    background: rgb(172, 169, 169);
    border-radius: 20 / 360 * 100vw;
    p {
      line-height: 30 / 360 * 100vw;
    }
  }
}
</style>