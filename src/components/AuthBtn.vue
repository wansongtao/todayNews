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
    background: #cc3300;
    line-height: 48 / 360 * 100vw;
    font-size: 18 / 360 * 100vw;
    color: #fff;
    border-radius: 24 / 360 * 100vw;
}
</style>