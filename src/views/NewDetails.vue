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
        <div
          class="iconfont iconlogin_"
          @click="$toast('该功能正在加紧开发中')"
        ></div>
      </div>
    </main>

    <!-- 评论 -->
    <footer>
      <div class="comment_demo">
        <h4>精彩评论</h4>

        <!-- 评论 -->
        <div v-if="commentList.length > 0">
          <div
            class="comment_list"
            v-for="(item, index) in commentList"
            :key="'commentlist' + index"
          >
            <!-- 发布主评论的用户信息 -->
            <div class="comment_listtop">
              <img
                :src="item.head_img | imgUrl"
                alt="头像"
                v-if="item.head_img != null"
              />
              <img src="../assets/user.jpg" alt="" v-else />
              <div>
                <span class="username">{{ item.nickName || "浮生若梦" }}</span
                ><br />
                <span class="date">{{
                  item.commentDate.substr(0, 10) || "2020-11-11"
                }}</span>
              </div>
              <span @click="showInput">回复</span>
            </div>

            <!-- 主评论内容和子评论列表 -->
            <div class="comment_list_content">
              <p>{{ item.commentContent || "不过是大梦一场空" }}</p>

              <!-- 子评论列表 -->
              <div class="childcomment" v-if="item.childComment.length > 0">
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
                <span v-if="item.childComment.length > 2"
                  >更多回复...<i class="iconfont iconright"></i
                ></span>
              </div>
            </div>
          </div>
        </div>

        <div class="space" v-if="commentList.length == 0">
          暂无跟帖,抢占沙发
        </div>
      </div>

      <div class="writeComment">
        <!-- 评论框未激活状态 -->
        <div class="defInput" v-show="!isActiveInput">
          <div class="inputBtn" @click="showInput">写跟帖</div>
          <span class="iconfont iconxinxi"
            ><span class="message">{{
              newDetails.commentNums || 0
            }}</span></span
          >
          <span class="iconfont iconshoucang"></span>
          <span class="iconfont iconfenxiang"></span>
        </div>

        <!-- 评论框激活状态 -->
        <div class="activeInput" v-show="isActiveInput">
          <input
            ref="comInput"
            type="text"
            v-model="commentContent"
            class="commentInput"
            placeholder="发条友善的评论"
            @blur="inputBlur"
          />
          <div class="sendBtn">发表</div>
        </div>
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
        commentNums: 0,
      },
      isFollow: false,
      isLike: false,
      isActiveInput: false,
      commentContent: "",
      commentList: [],
    };
  },
  created() {
    //请求新闻内容
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

    //请求评论内容
    this.$axios
      .get("/newscomment", {
        params: {
          newsId: this.$route.params.id,
        },
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          this.commentList = res.data.data.commentList;
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
    showInput() {
      //显示评论框，并聚焦到评论框
      this.isActiveInput = true;

      this.$nextTick(() => {
        this.$refs.comInput.focus();
      });
    },
    inputBlur() {
      //当评论输入框失去焦点且用户未输入任何内容时，隐藏评论输入框
      if (this.commentContent.length == 0) {
        this.isActiveInput = false;
      }
    }
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
    width: 100% - 20 / 360 * 100vw;
    padding: 10 / 360 * 100vw;
    background: rgb(165, 161, 161);

    .defInput {
      display: flex;
      align-items: center;
      justify-content: space-between;

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

    .activeInput {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .commentInput {
        flex: 1;
        padding: 0 15 / 360 * 100vw;
        height: 30 / 360 * 100vw;
        font-size: 12 / 360 * 100vw;
        line-height: 30 / 360 * 100vw;
        color: rgb(0, 0, 0);
        background: #d7d7d7;
        border: none;
        border-radius: 15 / 360 * 100vw;
      }

      .sendBtn {
        padding: 0 10 / 360 * 100vw;
        height: 30 / 360 * 100vw;
        line-height: 30 / 360 * 100vw;
        font-size: 14 / 360 * 100vw;
        color: #fff;
      }
    }
  }
}

.comment_demo {
  margin-bottom: 100 / 360 * 100vw;
}
</style>