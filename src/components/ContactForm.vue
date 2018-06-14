<template>
    <div class="container">
        <breadcrumbs :categories="getCategory"></breadcrumbs>
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
                    <div class="danger" v-if="hasError.length > 1">{{hasError}}</div>
                    <div class="form_box">
                        <div>
                            <input type="text" name="name" placeholder="Your name" v-model="data.name">
                            <p class="danger" v-if="!data.name">field required</p>
                        </div>
                        <div>
                            <input type="email" name="email" placeholder="Email" v-model="data.email">
                            <p class="danger" v-if="!data.email">field required</p>
                        </div>
                        <div>
                            <input type="tel" name="phone" placeholder="Tel." v-model="data.phone">
                            <p class="danger" v-if="!data.phone">field required</p>
                        </div>
                        <div>
                            <textarea name="message" placeholder="Message" v-model="data.message"></textarea>
                            <p class="danger" v-if="!data.message">field required</p>
                        </div>
                        <div>
                            <button @click="sendMessage">
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
import Breadcrumbs from './Breadcrumbs'
import getCategory from './mixins/getCategory'
import getProduct from './mixins/getProduct'
export default {
  name: 'ContactForm',
  components: {Breadcrumbs},
  mixins: [getCategory, getProduct],
  data () {
    return {
      hasError: {},
      data: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    }
  },
  methods: {
    sendMessage () {
      for (let field in this.data) {
        if (!this.data[field]) return
      }

      this.$store.dispatch('sendMessage', this.data)
        .then(() => {
          this.hasError = 'Thank you, your message send'
          this.data = {}
        })
        .catch((err) => {
          if (err.response.status !== 200) {
            this.hasError = err.response.data
          }
        })
    }
  }
}
</script>
