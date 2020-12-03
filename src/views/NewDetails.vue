<template>
  <div class="new_container">
    <!-- 头部返回和关注按钮 -->
    <header>
      <div class="logo_btn" @click="$router.back()">
        <i class="iconfont icondayu"></i>
        <span class="iconfont iconnew"></span>
      </div>
      <div
        :class="['follow_btn', isFollow === true ? 'follow' : 'nofollow']"
        @click="following"
      >
        {{ isFollow === true ? "已关注" : "关注" }}
      </div>
    </header>
    <!-- 新闻内容 -->
    <main>
      <article>
        <h4>{{ newDetails.newsTitle }}</h4>
        <p>
          {{ newDetails.nickName
          }}<span>{{ newDetails.newsDate.substr(0, 10) }}</span>
        </p>
        <div class="content" v-html="newDetails.newsContent"></div>
      </article>
      <div class="article_btn">
        <div @click="like">
          <span
            :class="[
              'iconfont',
              isLike === true ? 'icondianzan like' : 'iconzan',
            ]"
          >
          </span>
          {{ newDetails.newsHot || 0 }}
        </div>
        <div><span class="iconfont iconcai1"></span>10</div>
      </div>
    </main>

    <!-- 评论 -->
    <footer>
      <div class="comment_demo">
        <h4>精彩跟帖</h4>
        <div class="comment_list">
          <div class="comment_listtop">
            <img src="../assets/user.jpg" alt="头像" />
            <div>
              <span class="username">浮生若梦</span><br />
              <span class="date">2020-11-20</span>
            </div>
            <span> 回复 </span>
          </div>
          <div class="comment_list_content">
            <p>不过是大梦一场空</p>
          </div>
        </div>
      </div>
      <!-- <div class="space">
        暂无跟帖,抢占沙发
      </div> -->

      <div class="writeComment">
        <div class="inputBtn">写跟帖</div>
        <span class="iconfont iconxinxi"><span class="message">102</span></span>
        <span class="iconfont iconshoucang"></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDetails: {
        newsId: 10001,
        userId: 1001,
        nickName: "火气日报",
        newsTitle: "我没胆量犯错，才把一切错过",
        newsContent: "<div>...</div>",
        newsHot: 11,
        newsDate: "2020-11-11",
      },
      isFollow: false,
      isLike: false,
    };
  },
  created() {
    this.$axios
      .get("/getnewcontent", {
        params: {
          newsId: this.$route.params.id,
        },
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          let data = res.data.data;
          this.newDetails = data.newDetails;
          this.isFollow = data.isFollow;
          this.isLike = data.isLike;
        }
      });
  },
  methods: {
    following() {
      if (!this.isFollow) {
        //关注
        this.$axios
          .get("/following", {
            params: {
              followUserId: this.newDetails.userId,
            },
          })
          .then((res) => {
            if (res.data.statusCode == 200) {
              this.isFollow = !this.isFollow;

              this.$toast.success(res.data.message || "关注成功");
            }
          });
      } else {
        //取消关注
        this.$axios
          .get("/unfollow", {
            params: { followUserId: this.newDetails.userId },
          })
          .then((res) => {
            if (res.data.statusCode == 200) {
              this.isFollow = !this.isFollow;

              this.$toast.success(res.data.message || "取消关注成功");
            }
          });
      }
    },
    like() {
      if (!this.isLike) {
        //点赞
        this.$axios
          .get("/like", {
            params: { newsId: this.newDetails.newsId },
          })
          .then((res) => {
            if (res.data.statusCode == 200) {
              this.isLike = true;
              this.newDetails.newsHot++;
            }
          });
      } else {
        //取消点赞
        this.$axios
          .get("/unlike", {
            params: { newsId: this.newDetails.newsId },
          })
          .then((res) => {
            if (res.data.statusCode == 200) {
              this.isLike = false;
              this.newDetails.newsHot--;
            }
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.new_container {
  min-height: 100vh;
  background: #fff;
}

header {
  // position: fixed;
  // top: 0;
  // left: 0;
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
    }
  }

  .follow_btn {
    width: 50 / 360 * 100vw;
    height: 20 / 360 * 100vw;
    text-align: center;
    font-size: 12 / 360 * 100vw;
    line-height: 20 / 360 * 100vw;
    border: 1px solid rgb(206, 205, 205);
    border-radius: 10 / 360 * 100vw;
  }

  .nofollow {
    color: #fff;
    background: #ff0000;
  }

  .follow {
    color: #000;
  }
}

main {
  // margin-top: 10 / 360 * 100vw;
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

    /deep/ .poem {
      text-align: center;

      h4 {
        color: #000;
        font-size: 16 / 360 * 100vw;
        line-height: 30 / 360 * 100vw;
      }

      h5 {
        color: rgb(155, 151, 151);
        font-size: 15 / 360 * 100vw;
        line-height: 25 / 360 * 100vw;
      }

      p {
        text-indent: 0em;
        color: #000;
        font-size: 14 / 360 * 100vw;
        line-height: 20 / 360 * 100vw;
      }
    }

    /deep/ p {
      text-indent: 2em;
      color: #000;
      font-size: 14 / 360 * 100vw;
      line-height: 20 / 360 * 100vw;
    }

    /deep/ h6 {
      text-align: center;
      color: #000;
      font-size: 15 / 360 * 100vw;
      line-height: 30 / 360 * 100vw;
    }

    /deep/ span {
      display: inline-block;
      width: 100%;
      text-align: right;
      font-size: 14 / 360 * 100vw;
      line-height: 20 / 360 * 100vw;
      color: #bdb7b7;
    }
  }

  .article_btn {
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      width: 80 / 360 * 100vw;
      text-align: center;
      border: 1px solid rgb(148, 146, 146);
      font-size: 16 / 360 * 100vw;
      line-height: 30 / 360 * 100vw;
      border-radius: 15 / 360 * 100vw;

      span {
        margin-right: 10 / 360 * 100vw;
        font-size: 16 / 360 * 100vw;
      }
    }

    .like {
      color: red;
    }
  }
}

footer {
  border-top: 5px solid rgb(214, 212, 212);
  h4 {
    font-family: "Kaiti", sans-serif;
    font-size: 18 / 360 * 100vw;
    line-height: 40 / 360 * 100vw;
    text-align: center;
    color: rgb(173, 171, 171);
  }

  .comment_list {
    padding: 10 / 360 * 100vw;
    border-bottom: 1px solid rgb(190, 186, 186);
    .comment_listtop {
      display: flex;

      img {
        display: block;
        width: 60 / 360 * 100vw;
        height: 60 / 360 * 100vw;
        border-radius: 30 / 360 * 100vw;
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
      padding: 10 / 360 * 100vw 0;
      p {
        text-indent: 2em;
        font-size: 14 / 360 * 100vw;
      }
    }
  }

  .space {
    text-align: center;
    font-size: 14 / 360 * 100vw;
    line-height: 80 / 360 * 100vw;
    color: rgb(155, 149, 149);
    border-bottom: 1px solid rgb(190, 186, 186);
  }

  .writeComment {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100% - 20 / 360 * 100vw;
    padding: 10 / 360 * 100vw;
    align-items: center;
    justify-content: space-between;
    background: rgb(165, 161, 161);

    div {
      flex: 1;
      padding: 0 15 / 360 * 100vw;
      height: 30 / 360 * 100vw;
      font-size: 12 / 360 * 100vw;
      line-height: 30 / 360 * 100vw;
      color: rgb(128, 121, 121);
      background: #d7d7d7;
      border-radius: 15 / 360 * 100vw;
    }

    span {
      position: relative;
      padding: 0 10 / 360 * 100vw;
      font-size: 16 / 360 * 100vw;

      .message {
        position: absolute;
        display: block;
        top: -8 / 360 * 100vw;
        left: 15 / 360 * 100vw;
        padding: 0 5 / 360 * 100vw;
        font-size: 10 / 360 * 100vw;
        line-height: 14 / 360 * 100vw;
        background: red;
        color: #fff;
        border-radius: 7 / 360 * 100vw;
      }
    }
  }
}

.comment_demo {
  margin-bottom: 100 / 360 * 100vw;
}
</style>