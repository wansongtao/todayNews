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
            :key="item.categoryId + 'category'"
            @click.self="getNewsList(item.categoryId, index)"
          >
            {{ item.categoryName }}
          </li>

          <li><span class="iconfont iconjia"></span></li>
        </ul>
      </div>
    </header>
    <main>
      <ul>
        <li
          v-for="(item, index) in postContent[currentIndex].newList"
          :key="index + 'newlist'"
          class="article"
          @click="jumpPage(item.newsId)"
        >
          <div class="article_left">
            <p>{{ item.newsTitle }}</p>
            <span>评论 {{ item.commentNums || 0 }}</span>
          </div>

          <div class="article_right">
            <img :src="item.newsCover | imgUrl" :alt="item.newsTitle" />
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
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
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover:
                "http://cms-bucket.ws.126.net/2019/09/17/703782e03135454781ae73ef602e71ba.jpeg?imageView&thumbnail=750x0&quality=85&type=jpg&interlace=1",
              commentNums: 12,
            },
          ],
        },
        {
          categoryId: 2,
          categoryName: "历史",
          newList: [
            {
              newsId: 1,
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover:
                "http://cms-bucket.ws.126.net/2019/09/17/703782e03135454781ae73ef602e71ba.jpeg?imageView&thumbnail=750x0&quality=85&type=jpg&interlace=1",
              commentNums: 12,
            },
          ],
        },
        {
          categoryId: 3,
          categoryName: "军事",
          newList: [
            {
              newsId: 1,
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover:
                "http://cms-bucket.ws.126.net/2019/09/17/703782e03135454781ae73ef602e71ba.jpeg?imageView&thumbnail=750x0&quality=85&type=jpg&interlace=1",
              commentNums: 12,
            },
          ],
        },
        {
          categoryId: 4,
          categoryName: "娱乐",
          newList: [
            {
              newsId: 1,
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover:
                "http://cms-bucket.ws.126.net/2019/09/17/703782e03135454781ae73ef602e71ba.jpeg?imageView&thumbnail=750x0&quality=85&type=jpg&interlace=1",
              commentNums: 12,
            },
          ],
        },
        {
          categoryId: 5,
          categoryName: "社会",
          newList: [
            {
              newsId: 1,
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover:
                "http://cms-bucket.ws.126.net/2019/09/17/703782e03135454781ae73ef602e71ba.jpeg?imageView&thumbnail=750x0&quality=85&type=jpg&interlace=1",
              commentNums: 12,
            },
          ],
        },
        {
          categoryId: 6,
          categoryName: "政治",
          newList: [
            {
              newsId: 1,
              newsTitle: "阿信发文谈与周杰伦合作",
              newsCover:
                "http://cms-bucket.ws.126.net/2019/09/17/703782e03135454781ae73ef602e71ba.jpeg?imageView&thumbnail=750x0&quality=85&type=jpg&interlace=1",
              commentNums: 12,
            },
          ],
        },
      ],
    };
  },
  created() {
    //获取栏目列表数据
    this.$axios.get("/category").then((res) => {
      let categoryArr = [];

      categoryArr = res.data.data.category.slice(0, 6);

      this.postContent = categoryArr.map((item) => {
        return {
          ...item,
          newList: [],
        };
      });

      this.getNewsList(this.postContent[0].categoryId, 0);
    });
  },
  methods: {
    /**
     * @description 获取对应栏目的新闻列表
     * @param {number} id 类目id
     * @param {number} index 当前点击栏目元素的索引
     */
    getNewsList(id, index) {
      this.currentIndex = index;

      if (this.postContent[this.currentIndex].newList.length == 0) {
        this.$axios
          .get("/newsList", {
            params: {
              categoryId: id,
            },
          })
          .then((res) => {
            let data = res.data.data;
            if (data.length === 0) {
              this.$toast.fail("您没有关注任何新闻");
              this.newList = [];
            } else {
              this.postContent[this.currentIndex].newList = data.newList;
            }
          });
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
    background: #e4e4e4;

    ul {
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 16 / 360 * 100vw;
      line-height: 30 / 360 * 100vw;

      li span {
        font-size: 20 / 360 * 100vw;
        color: #d43d3d;
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

  .article {
    display: flex;
    padding: 10 / 360 * 100vw 0;
    border-bottom: 1px solid rgb(149, 147, 147);

    .article_left {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      justify-items: center;
      flex: 6;
      p {
        width: 100%;
        font-size: 16 / 360 * 100vw;
      }

      span {
        width: 100%;
        font-size: 14 / 360 * 100vw;
        color: rgb(163, 162, 162);
      }
    }

    .article_right {
      flex: 4;
      img {
        width: 100%;
      }
    }
  }
}
</style>