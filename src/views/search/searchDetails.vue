<template>
  <div class="sea_detacontainer">
    <header>
      <!-- 搜索框 -->
      <div class="searchbox">
        <div class="searchlogo">
          <span class="iconfont iconsousuo"></span>
        </div>

        <div class="swipebox" v-if="isShowSwipe">
          <van-swipe
            class="swipeitemhg"
            vertical
            autoplay="2400"
            :show-indicators="false"
            @change="onChange"
          >
            <template v-for="(item, index) in hotNews">
              <van-swipe-item :key="index + 'swipeitem'"
                ><p>{{ item.newsTitle }}</p></van-swipe-item
              >
            </template>
          </van-swipe>
        </div>

        <div class="searchinput">
          <input ref="searchInput" type="text" v-model="keyword" @focus="$router.push('/search?keyword=' + keyword);" key="searchDetails"/>
          <span
            class="iconfont iconguanbi"
            v-show="isShowCloseBtn"
            @click="clearInput"
          ></span>
        </div>

        <div class="searchbtn" @click="search">
          <span>搜索</span>
        </div>
      </div>
    </header>

    <div class="title">
      <van-divider
        :style="{ padding: '0 20px', margin: '5px 0px', fontSize: '14px' }"
        >搜索结果</van-divider
      >
    </div>

    <main v-if="isShow">
      <article>
        <van-list
          v-model="loading"
          :immediate-check="false"
          :finished="finished"
          finished-text="我也是有底线的~"
          @load="LoadNews"
        >
          <news-list
            v-for="(item, index) in newsList"
            :newsData="item"
            :key="index + 'searchnewslist'"
            @click.native="jumpPage(item.newsId)"
          ></news-list>
        </van-list>
      </article>
    </main>
  </div>
</template>

<script>
import articleList from "../../components/articleList";

export default {
  components: {
    "news-list": articleList,
  },
  data() {
    return {
      hotNews: [
        { newsTitle: "大梦一场空" },
        { newsTitle: "孤影照惊鸿" },
        { newsTitle: "浮生若梦" },
      ],
      currIndex: 0,
      isShowCloseBtn: false,
      isShowSwipe: false,
      isShow: false,
      keyword: "",
      newsList: [],
      loading: false,
      finished: false,
      currentPage: 0,
      pageSize: 10,
    };
  },
  created() {
    this.$axios.get("/hotnews").then((res) => {
      if (res.data.statusCode == 200) {
        this.hotNews = res.data.data.hotNews;
      }
    });

    this.keyword = this.$route.query.keyword;
    this.getNews(this.keyword);
  },
  watch: {
    keyword() {
      if (this.keyword.length > 0) {
        //当搜索框有内容时，显示清除按钮并隐藏滚动列表
        this.isShowCloseBtn = true;
        this.isShowSwipe = false;

      } else {
        //用户没有输入任何内容时，隐藏清除按钮并显示滚动列表
        this.isShowCloseBtn = false;
        this.isShowSwipe = true;
      }
    },
  },
  methods: {
    clearInput() {
      this.keyword = "";
      this.$refs.searchInput.focus();
    },
    search() {
      if (this.keyword.length > 0) {
        this.getNews(this.keyword);
      } else {
        this.getNews(this.hotNews[this.currIndex].newsTitle);
      }
    },
    getNews(searchWord) {
      this.$axios
        .get("/searchnews", {
          params: {
            keyword: searchWord,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          if (res.data.statusCode == 200) {
            let data = res.data.data.newsList;

            this.isShow = true;
            this.loading = false;
            this.newsList = data;

            if (data.length < this.pageSize) {
              this.finished = true;
            }
          }
        });
    },
    onChange(index) {
      this.currIndex = index;
    },
    LoadNews() {
      this.currentPage += 1;

      if (this.keyword.length > 0) {
        this.getNews(this.keyword);
      } else {
        this.getNews(this.hotNews[this.currIndex].newsTitle);
      }
    },
    /**
     * @description 跳转到新闻详情
     * @param {number} id 新闻id
     */
    jumpPage(id) {
      //跳转并传参
      this.$router.push({ name: "NewDetails", params: { id: id } });
    },
  },
};
</script>

<style lang="less" scoped>
.sea_detacontainer {
  min-height: 100vh;
  background: #fff;
}

header {
  padding: 15 / 360 * 100vw 15 / 360 * 100vw;
  .searchbox {
    position: relative;
    height: 35 / 360 * 100vw;
    border: 2px solid #3d404d;
    border-radius: 10 / 360 * 100vw;

    .searchlogo {
      position: absolute;
      top: 0;
      left: 0;
      width: 30 / 360 * 100vw;
      text-align: center;
      line-height: 35 / 360 * 100vw;
      span {
        font-size: 16 / 360 * 100vw;
        color: #000;
      }
    }

    .swipebox {
      box-sizing: border-box;
      width: calc(100vw - 70 / 360 * 100vw);
      height: 35 / 360 * 100vw;
      padding-left: 30 / 360 * 100vw;

      .swipeitemhg {
        height: 35 / 360 * 100vw;
        line-height: 35 / 360 * 100vw;
        font-size: 14 / 360 * 100vw;
        color: #707070;
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .searchinput {
      position: absolute;
      top: 0;
      left: 30 / 360 * 100vw;
      width: calc(100% - 90 / 360 * 100vw);

      input {
        box-sizing: border-box;
        width: 100%;
        height: 35 / 360 * 100vw;
        padding-right: 20 / 360 * 100vw;
        line-height: 35 / 360 * 100vw;
        font-size: 14 / 360 * 100vw;
        border: none;
        background: rgba(255, 255, 255, 0);
        //改变光标颜色
        caret-color: red;
      }

      span {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 20 / 360 * 100vw;
        text-align: center;
        line-height: 35 / 360 * 100vw;
        font-size: 16 / 360 * 100vw;
        color: #cacaca;
      }
    }

    .searchbtn {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      width: 50 / 360 * 100vw;
      height: 21 / 360 * 100vw;
      margin: 7 / 360 * 100vw 5 / 360 * 100vw;
      border-left: 1px solid #eee;
      text-align: center;

      span {
        font-size: 16 / 360 * 100vw;
        line-height: 21 / 360 * 100vw;
        font-weight: 900;
      }
    }
  }
}

main {
  box-sizing: border-box;
  width: 100%;
  padding: 0 10 / 360 * 100vw;
}
</style>