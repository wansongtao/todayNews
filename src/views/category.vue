<template>
  <div class="category_container">
    <head-title title="栏目管理" @back="$router.back()"></head-title>
    <div class="deletecategory">
      <h5>点击删除以下栏目</h5>
      <ul class="category_list">
        <li
          :class="{ default: index === 0 }"
          v-for="(item, index) in activeCategory"
          :key="'activeCategory' + index"
          @click="deleteCategory(index)"
        >
          {{ item.categoryName }}
        </li>
      </ul>
    </div>
    <div class="addcategory">
      <h5>点击添加以下栏目</h5>
      <ul class="category_list">
        <li
          v-for="(item, index) in staticCategory"
          :key="'static' + index"
          @click="addCategory(index)"
        >
          {{ item.categoryName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headertitle from "../components/headertitle";

export default {
  components: {
    "head-title": headertitle,
  },
  data() {
    return {
      activeCategory: [
        {
          categoryId: 11,
          categoryName: "头条",
        },
        {
          categoryId: 12,
          categoryName: "热点",
        },
        {
          categoryId: 13,
          categoryName: "娱乐",
        },
      ],
      staticCategory: [
        {
          categoryId: 18,
          categoryName: "政治",
        },
        {
          categoryId: 19,
          categoryName: "社会",
        },
      ],
    };
  },
  created() {
    if (localStorage.activeCategory) {
      this.activeCategory = JSON.parse(localStorage.activeCategory);
      this.staticCategory = JSON.parse(localStorage.staticCategory);
    } else {
      this.$axios.get("/category").then((res) => {
        if (res.data.statusCode == 200) {
          let categoryList = res.data.data.category;

          this.activeCategory = categoryList.splice(0, 7);
          this.staticCategory = categoryList;
        }
      });
    }
  },
  methods: {
    deleteCategory(index) {
      if (index !== 0) {
        let category = this.activeCategory.splice(index, 1);

        this.staticCategory.push(category[0]);
      }
    },
    addCategory(index) {
      let category = this.staticCategory.splice(index, 1);

      this.activeCategory.push(category[0]);
    },
  },
  updated() {
    localStorage.activeCategory = JSON.stringify(this.activeCategory);
    localStorage.staticCategory = JSON.stringify(this.staticCategory);
  },
};
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

.default {
  background: #e7e4e4;
}
</style>