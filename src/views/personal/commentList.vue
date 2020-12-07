<template>
  <div class="container">
    <head-title title="我的跟帖" @back="$router.back()"></head-title>

    <div v-if="commentList.length > 0" class="comment">
      <div
        class="comment_list"
        v-for="(item, index) in commentList"
        :key="'commentlist' + index"
        @click="jumpPage(item.newsId)"
      >
        <!-- 发布主评论的用户信息 -->
        <div class="comment_listtop">
          <img
            :src="item.head_img | imgUrl"
            alt="头像"
            v-if="item.head_img != null"
          />
          <img src="../../assets/user.jpg" alt="" v-else />
          <div>
            <span class="username">{{ item.nickName || "浮生若梦" }}</span
            ><br />
            <span class="date">{{
              item.commentDate.substr(0, 10) || "2020-11-11"
            }}</span>
          </div>
        </div>

        <!-- 主评论内容和子评论列表 -->
        <div class="comment_list_content">
          <!-- 主评论内容 -->
          <p>
            {{ item.commentContent || "不过是大梦一场空" }}
          </p>

          <!-- 子评论列表 -->
          <div class="childcomment" v-if="item.childComment.length > 0">
            <!-- 子评论内容 -->
            <p
              v-for="(value, key) in item.childComment"
              :key="'childComment' + key"
            >
              <span>{{ value.nickName || "幸运" }}</span>

              <strong v-if="value.replyUserName != null">回复</strong>
              <span v-if="value.replyUserName != null"
                >@{{ value.replyUserName }}</span
              >

              ：{{ value.commentContent || "不过是孤影照惊鸿" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      commentList: [],
    };
  },
  components: {
    "head-title": headertitle,
  },
  created() {
    this.$axios.get("/user_comments").then((res) => {
      let data = res.data;
      if (data.statusCode == 200) {
        this.commentList = data.data.commentList;
      } else if (data.statusCode == 201) {
        this.$toast.fail(data.message || "您还没有评论任何文章");
      }
    });
  },
  methods: {
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
.comment {
  padding-top: 10 / 360 * 100vw;
}
.comment_list {
  padding: 5 / 360 * 100vw 10 / 360 * 100vw;
  border-bottom: 1px solid rgb(190, 186, 186);

  .comment_listtop {
    display: flex;

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

    span {
      width: 10%;
      font-size: 13 / 360 * 100vw;
      color: rgb(161, 161, 161);
    }
  }

  .comment_list_content {
    padding: 10 / 360 * 100vw 0 10 / 360 * 100vw 40 / 360 * 100vw;

    p {
      line-height: 20 / 360 * 100vw;
      font-size: 14 / 360 * 100vw;
    }

    .childcomment {
      margin: 10 / 360 * 100vw 0;
      padding: 5 / 360 * 100vw;
      background: rgb(226, 224, 224);

      p {
        margin: 5 / 360 * 100vw 0;
        line-height: 20 / 360 * 100vw;
        font-size: 14 / 360 * 100vw;

        strong {
          font-size: 12 / 360 * 100vw;
          font-weight: 500;
        }

        span {
          color: #3c87a5;
        }
      }

      span {
        line-height: 16 / 360 * 100vw;
        font-size: 12 / 360 * 100vw;
        color: #3c87a5;

        i {
          line-height: 16 / 360 * 100vw;
          font-size: 12 / 360 * 100vw;
          color: #3c87a5;
        }
      }
    }
  }
}
</style>