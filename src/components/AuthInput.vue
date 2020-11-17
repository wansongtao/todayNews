<template>
  <div>
    <!-- 只有输入框失去焦点或用户按下回车且输入的值改变了，才会更新父子组件的value -->
    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @change="updateValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
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
    },
  },
};
</script>

<style lang="less" scoped>
// @pxToVw: 360 * 100vw;

input {
  width: 100%;
  line-height: 40 / 360 * 100vw;
  font-size: 18 / 360 * 100vw;
  border: none;
  border-bottom: 1px solid #333;
}
</style>