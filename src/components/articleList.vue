<template>
  <div class="article">
    <div class="article_left">
      <p>{{ newsData.newsTitle }}</p>
      <span>{{ newsData.nickName }}</span>
      <span>评论 {{ newsData.commentNums || 0 }}</span>
    </div>

    <div class="article_right">
      <img
        src="../assets/user.jpg"
        alt="新闻封面"
        v-if="newsData.newsCover === ''"
      />
      <img :src="newsData.newsCover | imgUrl" :alt="newsData.newsTitle" v-else />
    </div>
  </div>
</template>

<script>
export default {
    // props: ['newsData']
    props: {
        newsData: {
            /**
             * @description 传入的newsData对象必须要包含newsTitle和nickName属性
             */
            validator(value) {
                let {newsTitle, nickName} = value;

                if(newsTitle === undefined || nickName === undefined) {
                    return false;
                }else {
                    return true;
                }
            }
        }
    }
};
</script>

<style lang="less" scoped>
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
        margin-right: 10 / 360 * 100vw;
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
</style>