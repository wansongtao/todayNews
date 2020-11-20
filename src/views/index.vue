<template>
  <div class="index-container" @click.capture="'capture';">
    <header>
      <!-- 顶部工具栏 -->
      <div class="top_bar">
        <!-- 用户按钮 -->
        <div class="top_bar_l">
          <a href="javascript:;"><span class="iconfont iconyonghu"></span></a>
        </div>
        <!-- logo -->
        <div class="top_bar_m">
          <span class="iconfont iconjinritoutiao"></span>
        </div>
        <!-- 搜索按钮 -->
        <div class="top_bar_r">
          <a href="javascript:;"><span class="iconfont iconsousuo"></span></a>
        </div>
      </div>
      <!-- 热门栏目 -->
      <div class="top_menu_list">
        <ul>
          <li
            v-for="(item, index) of category"
            :class="{ check_menu: index == liIndex }"
            :key="item.id"
            @click.self="getNewsList(item.id, index)"
          >
            {{ item.name }}
          </li>

          <li><span class="iconfont iconjia"></span></li>
        </ul>
      </div>
    </header>
    <main>
      <ul>
        <li
          v-for="(item, index) in newList"
          :key="index + 'newlist'"
          class="article"
          @click.self="jumpPage(item.id)"
        >
          <div class="article_left">
            <p>{{ item.title }}</p>
            <span>评论 {{ item.comment }}</span>
          </div>

          <div class="article_right">
            <img :src="item.img | imgUrl" :alt="item.title" />
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
      liIndex: 0,
      category: [
        { id: 1, name: "游戏" },
        { id: 2, name: "历史" },
        { id: 3, name: "军事" },
        { id: 4, name: "娱乐" },
        { id: 5, name: "社会" },
        { id: 6, name: "政治" },
      ],
      newList: [
        {
          id: 1,
          title: "阿信发文谈与周杰伦合作",
          img:
            "http://cms-bucket.ws.126.net/2019/09/17/703782e03135454781ae73ef602e71ba.jpeg?imageView&thumbnail=750x0&quality=85&type=jpg&interlace=1",
          comment: 12,
        },
      ],
    };
  },
  mounted() {
    //获取栏目列表数据
    this.$axios
      .get("/category")
      .then((res) => {
        let categoryName = new Set(),
          categoryArr = [];

        //去重
        res.data.data.forEach((element) => {
          if (!categoryName.has(element.name)) {
            categoryName.add(element.name);
            categoryArr.push(element);
          }
        });

        this.category = categoryArr.slice(0, 6);
        this.getNewsList(this.category[0].id, 0);
      })
      .catch((err) => {
        this.$toast.fail("服务器繁忙，请稍后再试。");
        console.error(err);
      });
  },
  methods: {
    /**
     * @description 获取对应栏目的新闻列表
     * @param {number} id 类目id
     * @param {number} index 当前点击栏目元素的索引
     */
    getNewsList(id, index) {
      this.liIndex = index;

      this.$axios
        .get("/post", {
          params: {
            category: id,
          },
        })
        .then((res) => {
          let data = res.data.data;

          if (data.length === 0) {
            this.$toast.fail("该栏目不存在");
          } else {
            this.newList = [];

            data.forEach((item) => {
              this.newList.push({
                id: item.id,
                title: item.title,
                img: item.cover[0].url,
                comment: item.comment_length,
              });
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * @description 跳转到新闻详情
     * @param {number} id 新闻id
     */
    jumpPage(id) {
      //跳转并传参
      this.$router.push({ name: 'NewDetails', params: { id: id }});
    },
  },
  // filters: {
  //   /**
  //    * @description 给图片路径加上服务器地址
  //    */
  //   imgUrl(value) {
  //     if (value.indexOf("http") == -1 && value.indexOf("https") == -1) {
  //       return "http://157.122.54.189:9083" + value;
  //     } else {
  //       return value;
  //     }
  //   },
  // },
};
</script>

<style lang="less" scoped>
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