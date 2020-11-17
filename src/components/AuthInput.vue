<template>
  <div>
    <!-- 只有输入框失去焦点或用户按下回车且输入的值改变了，才会更新父子组件的value -->
    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="updateValue"
      :class="{ error: isAdd }"
      @blur="verifyInput"
      v-if="isfocus"
      v-focus
    />

    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="updateValue"
      :class="{ error: isAdd }"
      @blur="verifyInput"
      v-else
    />
  </div>
</template>

<script>
export default {
  props: {
    //可选，默认文本框
    type: {
      type: String,
      default: "text",
    },
    //不需要传
    value: String,
    isfocus: {
      type: Boolean,
      default: false,
    },
    //必选参数
    placeholder: String,
    pattern: String,
    msg: {
      type: String,
      default: "输入有误",
    },
  },
  data() {
    return {
      isAdd: false,
    };
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  watch: {
    value() {
      //监听用户输入的值是否符合规范
      if (this.value.length != 0) {
        const regExp = new RegExp(this.pattern);

        if (regExp.test(this.value)) {
          this.isAdd = false;
        } else {
          this.isAdd = true;
        }
      }else {
        this.isAdd = false;
      }
    },
  },
  methods: {
    updateValue(event) {
      //将修改后的值发送给父组件
      this.$emit("input", event.target.value);
    },
    verifyInput(event) {
      //输入框失去焦点后验证用户输入
      if (this.value.length != 0) {
        const regExp = new RegExp(this.pattern);

        if (!regExp.test(this.value)) {
          this.isAdd = true;
          this.$toast.fail(this.msg);

          //选中错误文本
          event.target.select();
          // setTimeout(() => {
          //   document.getElementById('myinput').focus();
          // }, 1600);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
// @pxToVw: 360 * 100vw;

input {
  width: 100%;
  margin-bottom: 10 / 360 * 100vw;
  padding: 0 5 / 360 * 100vw;
  line-height: 40 / 360 * 100vw;
  font-size: 18 / 360 * 100vw;
  border: none;
  border-bottom: 1px solid #333;
  background-color: #f2f2f2;
}

.error {
  border: 1px solid #cc3300;
}
</style>