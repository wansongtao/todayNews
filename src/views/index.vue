<template>
  <div>
      <h1>我的第一个vue.cli项目</h1>
      <p>不过是大梦一场空</p>
      <p>不过是孤影照惊鸿</p>
      <my-input v-model="value" :placeholder="placeholder"></my-input>
  </div>
</template>

<script>
//引入组件
import myinput from '../components/myinput.vue'

export default {
    data() {
        return {
            value: '万松涛',
            placeholder: '请输入您的姓名'
        }
    },
    //注册组件
    components: {
        'my-input': myinput
    },
    updated() {
        console.log(this.value);
    }
}
</script>

<style lang="less">
    div {
        width: 300px;
        height: 150px;
        margin: 100px auto;
        h1 {
            font-family: 'kaiti', 'songti', sans-serif;
            font-size: 24px;
        }
        p {
            font-size: 16px;
        }
    }
</style>