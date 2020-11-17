<template>
    <!-- 只有输入框失去焦点或用户按下回车且输入的值改变了，才会更新父子组件的value -->
    <input
      type="text"
      :value="value"
      @change="updateValue"
      :placeholder="placeholder"
    />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: String,
  },
  methods: {
    updateValue(event) {
      //将修改后的值发送给父组件
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style>
</style>