<template>
    <div class="list_container">
      <div class="destext">{{listtext}}</div>
        <div class="detailinfo">
          {{detailtext}}<i class="iconfont iconright"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        listtext: {
            type: String,
            required: true
        },
        detailtext: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
.list_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 15 / 360 * 100vw;
  padding-right: 10 / 360 * 100vw;
  line-height: 50 / 360 * 100vw;
  border-bottom: 1px solid rgb(214, 212, 212);
  .destext {
    font-size: 14 / 360 * 100vw;
  }

  .detailinfo {
    font-size: 14 / 360 * 100vw;
    color: rgb(204, 201, 201);
  }
}
</style>