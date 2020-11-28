<template>
  <div class="category_container">
      <head-title title="栏目管理" @back="$router.back()"></head-title>
      <div class="deletecategory">
          <h5>点击删除以下栏目</h5>
          <ul class="category_list">
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
          </ul>
      </div>
      <div class="addcategory">
          <h5>点击添加以下栏目</h5>
          <ul class="category_list">
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
              <li>头条</li>
          </ul>
      </div>
  </div>
</template>

<script>
import headertitle from '../components/headertitle';

export default {
    components: {
        'head-title': headertitle
    }
}
</script>

<style lang="less" scoped>
.deletecategory {
    padding: 5 / 360 * 100vw 0;
}

h5 {
    padding-left: calc((20% - 8px) / 8);
    font-size: 10 / 360 * 100vw;
    color: rgb(107, 105, 105);
}

.addcategory {
    padding: 5 / 360 * 100vw 0;
}

.category_list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    li {
        width: 20%;
        margin: 5 / 360 * 100vw calc((20% - 8px) / 8);
        text-align: center;
        font-size: 14 / 360 * 100vw;
        line-height: 30 / 360 * 100vw;
        border: 1px solid #cccccc;
    }
}
</style>