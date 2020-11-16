<template>
  <input type="text" :value="value" @input="updateValue" :placeholder="placeholder">
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        placeholder: String
    },
    methods: {
        updateValue(event) {
            //将修改后的值发送给父组件
            this.$emit('input', event.target.value);
        }
    }
}
</script>

<style>

</style>