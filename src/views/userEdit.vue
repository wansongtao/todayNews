<template>
  <div class="edit_container">
    <h4><router-link to="/personal"><i class="iconfont icondayu"></i></router-link>编辑资料</h4>
    <div class="userimg">
      <img src="../assets/user.jpg" alt="头像">
    </div>
    <div class="edit_list">
      <personal-list
        listtext="昵称"
        detailtext="浮生若梦"
      ></personal-list>
      <personal-list
        listtext="密码"
        detailtext="******"
      ></personal-list>
      <personal-list
        listtext="性别"
        detailtext="男"
      ></personal-list>
    </div>
  </div>
</template>

<script>
import personalList from "../components/personalList";

export default {
  components: {
    "personal-list": personalList,
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
  margin: 20 / 360 * 100vw;
  img {
    display: block;
    width: 80 / 360 * 100vw;
    height: 80 / 360 * 100vw;
    margin: 0 auto;
    border-radius: 40 / 360 * 100vw;
  }
}
</style>