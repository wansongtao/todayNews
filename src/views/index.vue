<template>
  <!-- @click.capture="'capture';" -->
  <div class="index-container">
    <header>
      <!-- 顶部工具栏 -->
      <div class="top_bar">
        <!-- 用户按钮 -->
        <div class="top_bar_l">
          <!-- <a href="javascript:;"></a> -->
          <router-link to="/personal">
            <span class="iconfont iconyonghu"></span>
          </router-link>
        </div>
        <!-- logo -->
        <div class="top_bar_m">
          <span class="iconfont iconjinritoutiao"></span>
        </div>
        <!-- 搜索按钮 -->
        <div class="top_bar_r">
          <router-link to="/search">
            <span class="iconfont iconsousuo"></span>
          </router-link>
        </div>
      </div>
      <!-- 热门栏目 -->
      <div class="top_menu_list">
        <ul>
          <li
            v-for="(item, index) of postContent"
            :class="{ check_menu: index == currentIndex }"
            :key="'index_category' + item.categoryId"
            @click.self="currentIndex = index"
          >
            {{ item.categoryName }}
          </li>
        </ul>
        <div class="addcategory"><span class="iconfont iconjia"></span></div>
      </div>
    </header>
    <main>
      <article>
        <van-list
          v-model="postContent[currentIndex].loading"
          :immediate-check="false"
          :finished="postContent[currentIndex].finished"
          finished-text="我也是有底线的~"
          @load="LoadNews"
        >
          <news-list
            v-for="(item, index) in postContent[currentIndex].newList"
            :newsData="item"
            :key="index + 'newlist'"
            @click.native="jumpPage(item.newsId)"
          ></news-list>
        </van-list>
      </article>
    </main>
  </div>
</template>

<script>
import articleList from "../components/articleList";

export default {
  components: {
    "news-list": articleList,
  },
  data() {
    return {
      currentIndex: 0,
      postContent: [
        {
          categoryId: 1,
          categoryName: "游戏",
          newList: [
            {
              newsId: 1,
              nickName: "梅花日报",
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover: "",
              commentNums: 12,
            },
          ],
          currentPage: 1,
          pageSize: 3,
          finished: false,
          loading: false,
        },
        {
          categoryId: 11,
          categoryName: "游戏",
          newList: [
            {
              newsId: 1,
              nickName: "梅花日报",
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover: "",
              commentNums: 12,
            },
          ],
          currentPage: 1,
          pageSize: 3,
          finished: false,
          loading: false,
        },
        {
          categoryId: 111,
          categoryName: "游戏",
          newList: [
            {
              newsId: 1,
              nickName: "梅花日报",
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover: "",
              commentNums: 12,
            },
          ],
          currentPage: 1,
          pageSize: 3,
          finished: false,
          loading: false,
        },
        {
          categoryId: 1111,
          categoryName: "游戏",
          newList: [
            {
              newsId: 1,
              nickName: "梅花日报",
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover: "",
              commentNums: 12,
            },
          ],
          currentPage: 1,
          pageSize: 3,
          finished: false,
          loading: false,
        },
        {
          categoryId: 12,
          categoryName: "游戏",
          newList: [
            {
              newsId: 1,
              nickName: "梅花日报",
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover: "",
              commentNums: 12,
            },
          ],
          currentPage: 1,
          pageSize: 3,
          finished: false,
          loading: false,
        },
        {
          categoryId: 8,
          categoryName: "游戏",
          newList: [
            {
              newsId: 1,
              nickName: "梅花日报",
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover: "",
              commentNums: 12,
            },
          ],
          currentPage: 1,
          pageSize: 3,
          finished: false,
          loading: false,
        },
      ],
    };
  },
  created() {
    //获取栏目列表数据
    this.$axios.get("/category").then((res) => {
      let categoryArr = [];

      categoryArr = res.data.data.category.slice(0, 10);

      this.postContent = categoryArr.map((item) => {
        return {
          ...item,
          newList: [],
          currentPage: 1,
          pageSize: 10,
          finished: false,
          loading: false,
        };
      });

      this.getNewsList();
    });
  },
  watch: {
    currentIndex() {
      //当前分类没有数据时，才请求数据
      if (this.postContent[this.currentIndex].newList.length == 0) {
        this.getNewsList();
      }
    },
  },
  methods: {
    /**
     * @description 获取对应栏目的新闻列表
     */
    getNewsList() {
      const categoryData = this.postContent[this.currentIndex];

      this.$axios
        .get("/newsList", {
          params: {
            categoryId: categoryData.categoryId,
            currentPage: categoryData.currentPage,
            pageSize: categoryData.pageSize,
          },
        })
        .then((res) => {
          if (res.data.statusCode == 200) {
            let data = res.data.data;

            //加载完成
            this.postContent[this.currentIndex].loading = false;

            if (data.newList.length < categoryData.pageSize) {
              //当返回的数据不足时，设置为加载完状态
              this.postContent[this.currentIndex].finished = true;
            }

            let newArr = this.postContent[this.currentIndex].newList.concat(
              data.newList
            );
            this.postContent[this.currentIndex].newList = newArr;
          }
        });
    },
    /**
     * @description 跳转到新闻详情
     * @param {number} id 新闻id
     */
    jumpPage(id) {
      //跳转并传参
      this.$router.push({ name: "NewDetails", params: { id: id } });
    },
    /**
     * @description 滚动到页面底部时加载更多新闻
     */
    LoadNews() {
      this.postContent[this.currentIndex].currentPage += 1;

      this.getNewsList();
    },
  },
};
</script>

<style lang="less" scoped>
// /deep/ img {
//   max-width: 100%;
// }

header {
  position: fixed;
  top: 0;
  width: 100%;
  .top_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44 / 360 * 100vw;
    padding: 0 10 / 360 * 100vw;
    background: #d43d3d;

    .top_bar_l a span {
      color: #fff;
      font-size: 24 / 360 * 100vw;
    }

    .top_bar_m span {
      font-size: 24 / 360 * 100vw;
      color: #fff;
    }

    .top_bar_r a span {
      color: #fff;
      font-size: 24 / 360 * 100vw;
    }
  }

  .top_menu_list {
    position: relative;
    background: #e4e4e4;

    ul {
      overflow-x: auto;
      margin-right: 40 / 360 * 100vw;
      white-space: nowrap;
      font-size: 16 / 360 * 100vw;
      line-height: 30 / 360 * 100vw;

      //不显示滚动条
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      li {
        display: inline-block;
        padding: 0 8 / 360 * 100vw;
      }
    }

    .addcategory {
      position: absolute;
      top: 0;
      right: 0;
      background: #e4e4e4;
      padding: 0 8 / 360 * 100vw;
      box-shadow: -1px 0px 2px 1px rgba(139, 138, 138, 0.2);
      span {
        font-size: 20 / 360 * 100vw;
        color: #d43d3d;
        line-height: 30 / 360 * 100vw;
      }
    }
  }

  .check_menu {
    color: #d43d3d;
  }
}

main {
  box-sizing: border-box;
  width: 100%;
  margin-top: 64 / 360 * 100vw;
  padding: 20 / 360 * 100vw 10 / 360 * 100vw;
}
</style>