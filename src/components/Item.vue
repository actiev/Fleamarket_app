<template>
    <div class="one_adds">
        <img :src="this.uploads + item.image" />
        <div class="description">
            <h2 class="title">
                <router-link v-if="isLoggedIn" :to="{name:'EditForm', params:{id: item.id} }">{{ item.title }}</router-link>
                <router-link v-else :to="{name:'ContactForm', params:{id: item.id} }">{{ item.title }}</router-link>
            </h2>
            <span class="price">Price: {{item.price}} $</span>
            <p>{{item.description}}</p>
        </div>
        <router-link :to="{name:'ContactForm', params:{id: item.id} }">
            <div class="contact_button">
                <span>Contact Now</span>
                <svg version="1.2" preserveAspectRatio="none" viewBox="0 -0.49606299212598515 63 63" class="contact_button_svg">
                    <g><path xmlns:default="http://www.w3.org/2000/svg" d="M19,0c0.5,0,0.4,0,0.7,0.2c0.3,0.2,1.1,1.3,1.3,2c0.1,0.7,0.1,2.2,0.4,3.6c0.2,1.4,1,5.4,1.9,7.7c0.9,2.4,1.3,3.4,0.3,4.8  c-1,1.5-6.9,7.5-6.9,7.5s1.7,3,3.4,5.2c1.7,2.2,4.1,5.2,7.4,8c3.3,2.8,6.5,5.2,10,7.1c3.5-3.4,6.4-6.4,7.2-7.1  c0.8-0.7,0.9-0.9,2.6-0.4c1.7,0.5,3.9,1.5,6.2,1.9c2.3,0.4,4.8,0.7,6.3,0.9c1.5,0.2,1.5,0.2,2,0.9c0.5,0.7,1,1.6,1.1,1.8  c0.1,0.2,0,1.2,0,4.3c0,3.1,0,7.5,0,8.4c0,0.9-0.1,0.9-0.3,1.5c-0.2,0.6-0.6,2.1-0.7,2.2c-0.1,0.2-1.4,1-2.5,1c-1,0-4.3-0.1-6.5-0.4  c-2.2-0.3-8.1-1.7-10.4-2.5c-2.3-0.8-9.6-3.2-18.2-9.6c-8.6-6.4-14.6-15-18.1-21.8C2.8,20.6,1.1,12.8,0.5,9  c-0.6-3.8-0.6-5.2-0.4-6.3C0.3,1.7,1.4,0.9,2,0.6C2.6,0.2,3.5-0.1,4.4,0c0.9,0.1,3.5,0,6.9,0S19,0,19,0z"></path></g>
                </svg>
                <svg version="1.2" preserveAspectRatio="none" viewBox="-22.5 0 60 60" class="contact_button_svg">
                    <g><g xmlns:default="http://www.w3.org/2000/svg">
                        <rect x="0" y="45" width="15" height="15" style="fill: rgb(255, 255, 255);"></rect>
                        <rect x="0" y="22" width="15" height="15" style="fill: rgb(255, 255, 255);"></rect>
                        <rect x="0" y="0" width="15" height="15" style="fill: rgb(255, 255, 255);"></rect>
                    </g></g>
                </svg>
            </div>
        </router-link>
        <button class="cancel_button delete_button" v-if="isLoggedIn" @click="deleteItem">
            Delete
            <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 24 24" class="ng-element" style="opacity: 1; fill: rgb(255, 255, 255); width: 24px; height: 24px;">
                <g>
                    <path xmlns:default="http://www.w3.org/2000/svg" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" style="fill: rgb(255, 255, 255);"></path>
                </g>
            </svg>
        </button>
        <div class="danger alert-danger" v-if="hasError.length > 1">{{hasError}}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Item',
  props: ['item'],
  data () {
    return {
      hasError: {}
    }
  },
  computed: {
    ...mapState({
      uploads: 'uploads'
    }),
    isLoggedIn () {
      return this.$store.state.isAuth
    }
  },
  methods: {
    deleteItem () {
      this.$store.dispatch('delete', this.item.id)
        .then(() => {
          this.hasError = false
          this.$emit('updateList', true)
        }).catch(err => {
          if (err.response.status !== 200) {
            this.hasError = err.response.data
          }
        })
    }
  }
}
</script>
