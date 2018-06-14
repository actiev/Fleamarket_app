<template>
    <div class="contact_form_box">
        <div class="row">
            <div class="col1">
                <img v-if="product.image" :src="this.uploads+product.image"/>
            </div>
            <div class="col2">
                <div class="description">
                    <h2 class="title">{{ product.title }}</h2>
                    <span class="price">Price: {{product.price}} $</span>
                    <p>{{product.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ContactForm',
  computed: {
    ...mapState({
      product: 'product',
      uploads: 'uploads'
    })
  },
  created () {
    this.$store.dispatch('loadById', this.$route.params.id)
  }
}
</script>
