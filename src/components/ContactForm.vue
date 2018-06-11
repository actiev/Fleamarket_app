<template>
    <div class="container">
        <breadcrumbs :categories="getCategory"></breadcrumbs>
        <div class="contact_form_box">
            <div class="row">
                <div class="col1">
                    <img v-if="item.image" :src="this.uploads+item.image"/>
                </div>
                <div class="col2">
                    <div class="description">
                        <h2 class="title">{{ item.title }}</h2>
                        <span class="price">Price: {{item.price}} $</span>
                        <p>{{item.description}}</p>
                    </div>
                    <div class="form_box">
                        <div>
                            <input type="text" name="name" placeholder="Your name">
                        </div>
                        <div>
                            <input type="email" name="email" placeholder="Email">
                        </div>
                        <div>
                            <input type="phone" name="phone" placeholder="Tel.">
                        </div>
                        <div>
                            <textarea name="message" placeholder="Message"></textarea>
                        </div>
                        <div>
                            <button>
                                <span>Send Message</span>
                                <svg version="1.2" preserveAspectRatio="none" viewBox="0 -8.5 67 67"  style="opacity: 1; fill: rgb(255, 255, 255); width: 32px; height: 32px;"><g><g xmlns:default="http://www.w3.org/2000/svg" id="Mail">
                                    <polygon fill-rule="evenodd" clip-rule="evenodd" points="0,14.5 0,49.1 66.2,49.1 66.2,14.5 33.1,30.9  " style="fill: rgb(255, 255, 255);"></polygon>
                                    <polygon fill-rule="evenodd" clip-rule="evenodd" points="0,0 0,9.2 33.1,25.7 66.2,9.2 66.2,0  " style="fill: rgb(255, 255, 255);"></polygon>
                                </g></g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumbs from './Breadcrumbs'
export default {
  name: 'ContactForm',
  components: {Breadcrumbs},
  computed: {
    ...mapState({
      item: 'item',
      categories: 'categoryList',
      uploads: 'uploads'
    }),
    getCategory () {
      for (let cat in this.categories) {
        for (let subCat in this.categories[cat].children) {
          if (this.categories[cat].children[subCat].id === this.item.category_id) {
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
    this.$store.dispatch('loadById', this.$route.params.id)
  }
}
</script>
