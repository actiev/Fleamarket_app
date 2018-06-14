import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      categories: 'categoryList'
    }),
    getCategory () {
      for (let cat in this.categories) {
        for (let subCat in this.categories[cat].children) {
          if (this.categories[cat].children[subCat].id === this.product.category_id) {
            return {
              'category': this.categories[cat].category.name,
              'subCategory': this.categories[cat].children[subCat].name
            }
          }
        }
      }
    }
  },
  created () {
    this.$store.dispatch('setCategories')
  }
}
