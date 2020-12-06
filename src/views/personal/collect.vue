<template>
  <div class="container">
    <head-title title="我的收藏" @back="$router.back()"></head-title>
    <main>
      <article v-if="newList.length > 0">
        <van-list
          v-model="loading"
          :immediate-check="false"
          :finished="finished"
          finished-text="我也是有底线的~"
          @load="LoadNews"
        >
          <news-list
            v-for="(item, index) in newList"
            :newsData="item"
            :key="index + 'newlist'"
          ></news-list>
        </van-list>
      </article>
    </main>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
import articleList from "../../components/articleList";
export default {
  data() {
    return {
      newList: [],
      pageSize: 10,
      currentPage: 0,
      loading: false,
      finished: false,
    };
  },
  components: {
    "head-title": headertitle,
    "news-list": articleList,
  },
  created() {
    this.getCollectNews();
  },
  methods: {
    getCollectNews() {
      this.$axios
        .get("/userstar", {
          params: { pageSize: this.pageSize, currentPage: this.currentPage },
        })
        .then((res) => {
          this.loading = false;  //加载完成了，收到服务器的响应了

          let data = res.data;
          
          if (data.statusCode == 200) {
            this.newList = this.newList.concat(data.data.newList);

            if (data.data.newList.length < this.pageSize) {
              //当返回的数据不足时，设置为加载完状态
              this.finished = true;
            }

          } else if (data.statusCode == 201 && this.currentPage == 0) {
            this.$toast.fail(data.message || "您没有收藏任何新闻");
          }
          else {
            this.finished = true;
          }
        });
    },
    LoadNews() {
      this.currentPage++;
      this.getCollectNews();
    }
  },
};
</script>

<style lang="less" scoped>
main {
  box-sizing: border-box;
  width: 100%;
  padding: 20 / 360 * 100vw 10 / 360 * 100vw;
}
</style>