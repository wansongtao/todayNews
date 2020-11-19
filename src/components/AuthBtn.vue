<template>
  <div class="btn">
      {{text}}
  </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '登录'
        }
    }
}
</script>

<style lang="less" scoped>
.btn {
    height: 48 / 360 * 100vw;
    margin: 50 / 360 * 100vw auto;
    background: #cc3300;
    line-height: 48 / 360 * 100vw;
    font-size: 18 / 360 * 100vw;
    color: #fff;
    border-radius: 24 / 360 * 100vw;
    text-align: center;
}
</style>