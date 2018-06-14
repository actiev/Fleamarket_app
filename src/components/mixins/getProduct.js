import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      product: 'product',
      uploads: 'uploads'
    })
  },
  created () {
    this.$store.dispatch('loadById', this.$route.params.id)
      .catch(() => {
        this.$router.push({name: 'Page404'})
      })
  }
}
