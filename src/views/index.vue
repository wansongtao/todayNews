<template>
  <div class="box">
      <h1>我的第一个vue.cli项目</h1>
      <p>不过是大梦一场空</p>
      <p>不过是孤影照惊鸿</p>
      <my-input v-model="value" :placeholder="placeholder"></my-input>
      <!-- <van-button type="primary">主要按钮</van-button> -->
  </div>
</template>

<script>
//引入组件
import AuthInput from '../components/AuthInput.vue';
import {Button} from 'vant';

export default {
    data() {
        return {
            value: '万松涛',
            placeholder: '请输入您的姓名'
        }
    },
    //注册组件
    components: {
        'my-input': AuthInput,
        [Button.name]: Button
    },
    updated() {
        console.log(this.value);
    }
}
</script>

<style lang="less" scoped>
    .box {
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