<template>
    <div class="container">
        <breadcrumbs :categories="getCategory"></breadcrumbs>
        <product-form v-if="this.userAccess || this.isAuth" :create="this.isCreate"></product-form>
        <product-preview v-else></product-preview>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumbs from './Breadcrumbs'
import ProductPreview from './ProductPreview'
import ProductForm from './ProductForm'
export default {
  name: 'ProductActions',
  data () {
    return {
      isCreate: false
    }
  },
  components: {ProductPreview, ProductForm, Breadcrumbs},
  computed: {
    ...mapState({
      categories: 'categoryList',
      product: 'product',
      userAccess: 'access',
      isAuth: 'isAuth'
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
    this.$route.params.id !== 'new' ? this.isCreate = false : this.isCreate = true
    if (!this.isCreate) {
      this.$store.dispatch('loadById', this.$route.params.id)
        .catch(() => {
          this.$router.push({name: 'Page404'})
        })
    } else if (this.isCreate && !this.isAuth) {
      this.$router.push({name: 'Login'})
    }

    this.$store.dispatch('setCategories')
  }
}
</script>
