<template>
  <div class="searchcontainer">
    <header>
      <!-- 搜索框 -->
      <div class="searchbox">
        <div class="searchlogo">
          <span class="iconfont iconsousuo"></span>
        </div>

        <div class="swipebox" v-if="isShow.swipe">
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
          <input
            ref="searchInput"
            type="text"
            v-model="keyword"
            v-focus
            @input="searchInput"
          />
          <span
            class="iconfont iconguanbi"
            v-show="isShow.clearSearch"
            @click="clearInput"
          ></span>
        </div>

        <div class="searchbtn" @click="getKeyword">
          <span>搜索</span>
        </div>
      </div>
    </header>

    <!-- 历史记录 -->
    <div v-if="searchHistory.length > 0">
      <h6 class="historytitle">
        历史记录
        <i
          class="iconfont iconhuishouzhan"
          v-show="isShow.clearHistoryBtn"
          @click="isShow.clearHistoryBtn = false"
        ></i>
        <span
          v-show="isShow.clearHistoryBtn === false"
          @click="isShow.clearHistoryBtn = true"
          >完成</span
        >
        <span v-show="isShow.clearHistoryBtn === false" @click="clearAllHistory"
          >全部删除</span
        >
      </h6>

      <ul class="searchHistory">
        <li
          v-for="(item, index) in searchHistory"
          :key="index + 'searchHistory'"
        >
          <p @click.self="search(item)">
            {{ item }}
            <i
              class="iconfont iconx"
              v-show="isShow.clearHistoryBtn === false"
              @click.stop="clearOneHistory(index)"
            ></i>
          </p>
        </li>
      </ul>
    </div>

    <!-- 猜你想搜 -->
    <div>
      <h6 class="historytitle">猜你想搜</h6>

      <ul class="guess">
        <li
          v-for="(item, index) in guessNews"
          :key="index + 'guessNews'"
        >
          <p class="guesstext" @click.self="search(item.newsTitle)">
            {{ item.newsTitle}}
            <i class="iconfont iconjian" v-if="index == 0"></i>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotNews: [
        { newsTitle: "大梦一场空" },
        { newsTitle: "孤影照惊鸿" },
        { newsTitle: "浮生若梦" },
      ],
      currIndex: 0,
      isShow: {
        swipe: true,
        clearSearch: false,
        clearHistoryBtn: true,
      },
      keyword: "",
      searchHistory: [],
      guessNews: [
        { newsTitle: "大梦一场空" },
        { newsTitle: "孤影照惊鸿" },
        { newsTitle: "浮生若梦" },
      ],
    };
  },
  created() {
    //滚动列表
    this.$axios.get("/hotnews").then((res) => {
      if (res.data.statusCode == 200) {
        this.hotNews = res.data.data.hotNews;
      }
    });

    // 历史记录列表
    let history = [];
    if (localStorage.searchHistory) {
      history = JSON.parse(localStorage.searchHistory);
    }

    if (history instanceof Array) {
      this.searchHistory = history.slice(0, 6);
    }

    //猜你想搜列表
    this.$axios
      .get("/hotnews", {
        params: {
          currentPage: 2,
          pageSize: 6,
        },
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          this.guessNews = res.data.data.hotNews;
        }
      });
  },
  watch: {
    keyword() {
      if (this.keyword.length > 0) {
        //当用户输入搜索内容时，显示清除按钮并隐藏滚动列表
        this.isShow.clearSearch = true;
        this.isShow.swipe = false;
      } else {
        //用户没有输入任何内容时，隐藏清除按钮并显示滚动列表
        this.isShow.clearSearch = false;
        this.isShow.swipe = true;
      }
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    onChange(index) {
      this.currIndex = index;
    },
    clearInput() {
      this.keyword = "";
      this.$refs.searchInput.focus();
    },
    searchInput() {
      //当用户输入搜索内容时，显示清除按钮并隐藏滚动列表
      this.isShow.clearSearch = true;
      this.isShow.swipe = false;
    },
    search(item) {
      this.$router.push("/searchdetails?keyword=" + item);
    },
    getKeyword() {
      let history = [];

      if(localStorage.searchHistory) {
        history = JSON.parse(localStorage.searchHistory);
      }

      if (this.keyword.length > 0) {
        history.unshift(this.keyword);   
        this.search(this.keyword);
      } else {
        let item = this.hotNews[this.currIndex].newsTitle;
        history.unshift(item);   
        this.search(item);
      }
      localStorage.searchHistory = JSON.stringify(history);
    },
    clearAllHistory() {
      this.searchHistory = [];
      delete localStorage.searchHistory;
    },
    clearOneHistory(index) {
      this.searchHistory.splice(index, 1);

      localStorage.searchHistory = JSON.stringify(this.searchHistory);
    },
  },
};
</script>

<style lang="less" scoped>
.searchcontainer {
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

.historytitle {
  margin: 10 / 360 * 100vw 15 / 360 * 100vw;
  color: #cacaca;
  font-size: 12 / 360 * 100vw;
  line-height: 20 / 360 * 100vw;

  i {
    float: right;
    width: 30 / 360 * 100vw;
    text-align: center;
    font-size: 12 / 360 * 100vw;
    line-height: 20 / 360 * 100vw;
    color: #cacaca;
  }

  span {
    float: right;
    padding-left: 10 / 360 * 100vw;
    text-align: right;
    font-size: 12 / 360 * 100vw;
    line-height: 20 / 360 * 100vw;
    color: #cacaca;
  }
}

.searchHistory {
  display: flex;
  margin: 0 15 / 360 * 100vw;
  flex-wrap: wrap;
  border-bottom: 1px solid #f6f5f5;

  li {
    width: 50%;
    height: 30 / 360 * 100vw;
    font-size: 14 / 360 * 100vw;
    line-height: 30 / 360 * 100vw;
    
    p {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      padding-right: 15 / 360 * 100vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      i {
        float: right;
        width: 30 / 360 * 100vw;
        text-align: center;
        font-size: 12 / 360 * 100vw;
        line-height: 30 / 360 * 100vw;
        color: #cacaca;
      }
    }

    
  }
}

.guess {
  display: flex;
  margin: 0 15 / 360 * 100vw;
  flex-wrap: wrap;

  li {
    width: 50%;
    height: 30 / 360 * 100vw;
    font-size: 14 / 360 * 100vw;
    line-height: 30 / 360 * 100vw;

    p {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      padding-right: 15 / 360 * 100vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      i {
        margin: 0 5 / 360 * 100vw;
        color: #4a90e2;
        font-size: 14 / 360 * 100vw;
        line-height: 30 / 360 * 100vw;
      }
    }
  }
}
</style>