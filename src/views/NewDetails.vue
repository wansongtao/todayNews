<template>
  <div class="new_container">
    <!-- 头部返回和关注按钮 -->
    <header>
      <div class="logo_btn">
        <i class="iconfont icondayu"></i>
        <span class="iconfont iconnew"></span>
      </div>
      <div class="follow_btn">关注</div>
    </header>
    <!-- 新闻内容 -->
    <main>
      <h4>车主注意啦！9月下旬部分临时泊位进行清洁保养</h4>
      <p>火星时报<span>2019-10-10</span></p>
      <p class="content">
        为营造临时泊位“干静、整洁、平安、有序”面貌迎国庆，市交通部门拟在9月下旬对部分城市道路临时泊位进行清洁保养，请市民群众配合在清洁保养期间将车辆驶离泊位。第一阶段临时泊位清洁保养计划（涉及17条路段）：
      </p>
    </main>

    <!-- 评论 -->
    <footer></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 1,
    };
  },
  created() {
    console.log(this.test);
    console.log(this.$router.currentRoute.params);
  },
};
</script>

<style lang="less" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100% - (20 / 360 * 100vw);
  padding: 10 / 360 * 100vw;
  justify-content: space-between;
  align-items: center;

  .logo_btn {
    width: 70 / 360 * 100vw;

    i {
      color: rgb(126, 123, 123);
      font-size: 20 / 360 * 100vw;
      line-height: 20 / 360 * 100vw;
    }
    span {
      position: absolute;
      font-size: 48 / 360 * 100vw;
      // line-height: 48 / 360 * 100vw;
    }
  }

  .follow_btn {
    width: 50 / 360 * 100vw;
    height: 20 / 360 * 100vw;
    text-align: center;
    font-size: 12 / 360 * 100vw;
    line-height: 20 / 360 * 100vw;
    color: #fff;
    border: 1px solid rgb(206, 205, 205);
    border-radius: 10 / 360 * 100vw;
    background: #ff0000;
  }
}

main {
  margin-top: 50 / 360 * 100vw;
  padding: 10 / 360 * 100vw;
  h4 {
    // text-align: center;
    font-size: 18 / 360 * 100vw;
    line-height: 30 / 360 * 100vw;
  }
  p {
    font-size: 14 / 360 * 100vw;
    color: rgb(167, 165, 165);
    span {
      margin-left: 20 / 360 * 100vw;
    }
  }
  .content {
      margin: 20 / 360 * 100vw 0;
      text-indent: 2em;
      color: #000;
  }
}
</style>