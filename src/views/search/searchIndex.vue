<template>
  <div class="search_container">
    <!-- 背景图片 -->
    <div class="headbg">
      <svg xmlns="http://www.w3.org/2000/svg" class="bgImg" fill="none">
        <path
          transform="rotate(40.768 .076 73)"
          fill="url(#paint0_linear)"
          d="M.076 73h100.525v87.406H.076z"
        />
        <circle cx="336.5" cy="-1.5" r="91.5" fill="url(#paint1_linear)" />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="59.586"
            y1="101.553"
            x2="78.889"
            y2="158.776"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#EBECF3" />
            <stop offset="1" stop-color="#EBECF3" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="353.334"
            y1="-33.22"
            x2="398.331"
            y2="82.764"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#EBECF3" />
            <stop offset="1" stop-color="#EBECF3" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <!-- logo头条搜索 -->
    <div class="logo">
      <svg
        class="logosvg"
        viewBox="0 0 120 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 35.7933H58.8889V1.55762H0V35.7933Z"
          fill="#F04142"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M46.6509 10.9728L35.7215 10.9713C36.9747 11.7627 38.6891 12.6791 41.2214 13.5939C43.7587 12.6787 45.4524 11.7629 46.6509 10.9728ZM52.4887 16.3487V19.6359C47.6529 18.8684 43.9694 17.9488 41.1184 17.0022C38.232 17.9745 34.5762 18.8935 29.9104 19.6306V16.3441C32.3585 15.945 34.4756 15.5089 36.3182 15.0543C34.3166 14.0579 33.028 13.1306 32.0533 12.4291L32.0531 12.4289C31.905 12.3223 30.5401 11.2912 30.5401 11.2912L33.9532 6.34961L37.3549 7.89046L47.9262 7.89198L51.2345 7.89255V10.9733V11.4766C50.2059 12.3704 48.6536 13.6625 45.9523 15.0176C47.8241 15.4876 49.9841 15.9379 52.4887 16.3487ZM18.4765 7.12344L22.0723 7.12401C21.9811 13.6816 21.8558 17.6059 20.8758 20.6385L28.323 20.6397V23.7202L19.4003 23.7191C17.975 25.8794 15.7573 27.8693 12.2816 30.6741L6.61746 30.6733L7.3316 30.1074C10.8254 27.3397 13.2253 25.4383 14.852 23.7185L5.74493 23.7172V20.6364L17.0283 20.6379C18.2857 17.905 18.3831 14.0039 18.4765 7.12344ZM7.77775 8.68562L15.5555 9.76541V13.1031L7.77775 12.0234V8.68562ZM7.77775 14.208L15.5555 15.2878V18.6255L7.77775 17.5457V14.208ZM52.2221 24.7132V21.5372L42.8952 21.5359V19.7308L39.2739 19.7304V21.5353L29.9999 21.5339V24.7099L39.2739 24.7112V31.8779L42.8952 31.8785V24.7118L52.2221 24.7132ZM20.4939 25.2634L23.9807 30.6739L28.3196 30.6745L24.8326 25.264L20.4939 25.2634ZM44.6901 25.2634L49.0288 25.264L52.5156 30.6745L48.1771 30.6738L44.6901 25.2634ZM29.9249 30.6711L34.2636 30.6716L37.7504 25.2622L33.4117 25.2614L29.9249 30.6711Z"
          fill="white"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M108.052 10.7233H114.66H118.874V13.7784V16.7564H114.66V13.7784H97.2307V16.7564H93.017V13.7784V10.7233H97.2307H103.839V9.37927H93.9746V5.94229H103.839V4.12891H108.052V5.94229H117.916V9.37927H108.052V10.7233ZM117.533 23.6689V25.2992H108.052V32.7702H103.839V25.2992H94.3577V22.2441H100.598C101.277 21.7045 101.932 21.1634 102.565 20.6211H95.5215V19.0384L95.5322 19.0307L95.5215 19.0181C97.4387 17.3741 98.784 16.0079 99.8256 14.733H104.538C103.512 15.8977 102.529 16.917 101.677 17.7569H105.676C106.37 17.0676 107.027 16.3776 107.644 15.6877H112.608C110.538 18.3086 108.056 20.6146 106.124 22.2441H113.272L112.272 19.1023H116.079L117.533 23.6626H117.528L117.533 23.6689ZM93.017 32.7702H97.8495L100.929 27.3041H96.096L93.017 32.7702ZM114.041 32.7702L110.962 27.3041H115.795L118.874 32.7702H114.041ZM71.2553 11.3842H72.7397V7.75609H71.2553V4.12893H67.3289V7.75609H64.2856V11.3842H67.3289V20.6742C65.6174 21.74 64.2856 22.542 64.2856 22.542V26.9581C64.2856 26.9581 65.5932 26.2025 67.3289 25.1611V32.7697H71.2553V22.7442C71.7686 22.4179 72.2693 22.0944 72.7397 21.7826V19.2822V19.0939V17.1602C72.2896 17.4745 71.7859 17.8148 71.2553 18.1657V11.3842ZM81.851 26.1928C83.0862 24.9945 84.1204 23.861 84.957 22.7579H78.7451C79.5817 23.861 80.6158 24.9945 81.851 26.1928ZM89.568 21.4205V21.8945C88.5523 23.9689 86.8787 26.0805 84.6855 28.2659C86.3554 29.7117 88.2899 31.2115 90.4945 32.7702H84.0892C83.3078 32.1363 82.5635 31.5107 81.8514 30.8913C81.1389 31.5107 80.3944 32.1363 79.6131 32.7702H73.2077C75.4126 31.2111 77.3477 29.7109 79.0176 28.2649C76.7976 26.0513 75.1107 23.9133 74.0956 21.8127V19.7032H76.9077H79.9967V18.1756H73.6974V17.4947V15.1206V5.94287H73.7126V5.9421L78.8146 5.03589V8.28192L77.3365 8.54447V10.9133H78.8146V13.5865H77.3365V15.1206H79.9967V4.12891H83.8274V15.1206H86.5123V13.5865H85.0406V10.9133H86.5123V9.18814H85.0406V5.9421H90.1426V5.94287H90.1514V17.4947H90.1426V18.1756H83.8274V19.7032H86.7944H89.568V21.4205Z"
          fill="#2C2321"
        ></path>
      </svg>
    </div>

    <!-- 搜索框 -->
    <div class="searchbox">
      <div class="swipebox" @click="$router.push('/search')">
        <van-swipe
          class="swipeitemhg"
          vertical
          autoplay="1800"
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
      <div class="searchbtn iconfont iconsousuo" @click="jumpSearchDetails"></div>
    </div>

    <div class="title">
      <van-divider :style="{ padding: '0 20px', marginBottom: '0px', fontSize: '14px' }"
        >热门推荐</van-divider
      >
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
    };
  },
  created() {
    this.$axios.get("/hotnews").then((res) => {
      if (res.data.statusCode == 200) {
        this.hotNews = res.data.data.hotNews;
      }
    });
  },
  methods: {
    onChange(index) {
      this.currIndex = index;
    },
    jumpSearchDetails() {
      this.$router.push('/searchdetails?keyword=' + this.hotNews[this.currIndex].newsTitle);
    },
    
  },
};
</script>

<style lang="less" scoped>
.search_container {
  position: relative;
  min-height: 100vh;
  background: #fff;
}

.headbg {
  background: #f6f6f8;
}

.bgImg {
  width: 100%;
  height: 26vh;
}

.logo {
  position: absolute;
  top: 0;
  left: 50%;
  width: 120 / 360 * 100vw;
  height: 38 / 360 * 100vw;
  margin-left: -60 / 360 * 100vw;
  margin-top: 50 / 360 * 100vw;

  .logosvg {
    width: 120 / 360 * 100vw;
    height: 38 / 360 * 100vw;
  }
}

.searchbox {
  position: absolute;
  top: 0;
  width: calc(100% - 20 / 360 * 100vw);
  height: 45 / 360 * 100vw;
  margin: 0 10 / 360 * 100vw;
  margin-top: 105 / 360 * 100vw;
  border: 2px solid #3d404d;
  border-radius: 5 / 360 * 100vw;
  background: #fff;
  box-shadow: 0 0 10px rgb(179, 177, 177);

  .swipebox {
    box-sizing: border-box;
    width: calc(100vw - 70 / 360 * 100vw);
    height: 45 / 360 * 100vw;
    padding-left: 15 / 360 * 100vw;

    .swipeitemhg {
      height: 45 / 360 * 100vw;
      line-height: 45 / 360 * 100vw;
      font-size: 14 / 360 * 100vw;
      color: #707070;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .searchbtn {
    position: absolute;
    top: 0;
    right: 0;
    width: 50 / 360 * 100vw;
    height: 45 / 360 * 100vw;
    background: #3d404d;
    color: #fff;
    text-align: center;
    line-height: 45 / 360 * 100vw;
    font-size: 16 / 360 * 100vw;
  }
}

main {
  box-sizing: border-box;
  width: 100%;
  padding: 0 10 / 360 * 100vw;
}
</style>