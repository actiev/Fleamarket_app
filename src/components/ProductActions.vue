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
import getCategory from './mixins/getCategory'
export default {
  name: 'ProductActions',
  mixins: [getCategory],
  data () {
    return {
      isCreate: false
    }
  },
  components: {ProductPreview, ProductForm, Breadcrumbs},
  computed: {
    ...mapState({
      product: 'product',
      userAccess: 'access',
      isAuth: 'isAuth'
    })
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
  }
}
</script>
