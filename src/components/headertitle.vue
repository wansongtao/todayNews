<template>
  <div>
    <h4><i class="iconfont icondayu" @click="$emit('back')"></i>{{title}}</h4>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
};
</script>

<style lang="less" scoped>
h4 {
  position: relative;
  text-align: center;
  font-size: 16 / 360 * 100vw;
  line-height: 40 / 360 * 100vw;
  color:#fff;
  background: #d43d3d;

  i {
    position: absolute;
    top: 0;
    left: 15 / 360 * 100vw;
    font-size: 16 / 360 * 100vw;
    color: #fff;
  }
}
</style>