<template>
  <div class="container">
    <head-title title="我的关注" @back="$router.back()"></head-title>
    <main>
      <div class="comment_listtop">
        <!-- <img
          :src="item.head_img | imgUrl"
          alt="头像"
          v-if="item.head_img != null"
          @click="hideInput"
        /> -->
        <img src="../../assets/user.jpg" alt="头像"/>
        <div>
          <span class="username">浮生若梦</span
          ><br />
          <span class="date">2020-11-11</span>
        </div>
        <span class="btn"><p>取消关注</p></span>
      </div>
    </main>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  components: {
    "head-title": headertitle,
  },
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