<template>
    <div class="container">
        <div class="edit_form_wrap">
            <div class="row">
                <upload-image @add="getImage"></upload-image>
                <div class="col2">
                    <div class="form">
                        <div class="danger" v-if="hasError.length > 1">{{hasError}}</div>
                        <div class="form_row">
                            <label for="title">Title</label>
                            <input id="title" type="text" v-model="product.title"/>
                            <p class="danger" v-if="!product.title">this field is required</p>
                        </div>
                        <div class="form_row">
                            <label for="price">Price</label>
                            <input id="price" type="text" v-model="product.price"/>
                            <p class="danger" v-if="!product.price">this field is required</p>
                        </div>
                        <div class="form_row">
                            <label for="price">Select category</label>
                            <select title="categories" v-model="product.category_id">
                                <optgroup v-for="cat in categories" :label="cat.category.name" :key="cat.category.id">
                                    <option class="category" :key="child.id" v-for="child in cat.children" :value="child.id">{{child.name}}</option>
                                </optgroup>
                            </select>
                            <p class="danger" v-if="!product.category_id">this field is required</p>
                        </div>
                        <div class="form_row">
                            <label for="overview">Overview</label>
                            <textarea id="overview" v-model="product.description"></textarea>
                            <p class="danger" v-if="!product.description">this field is required</p>
                        </div>
                        <div class="form_row_buttons">
                            <button @click="checkForm" class="save_button">
                                <span v-if="!this.create">Save</span>
                                <span v-else>Add</span>
                                <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 24 24" style="opacity: 1; fill: rgb(255, 255, 255); width: 24px; height: 24px;">
                                    <g>
                                        <path xmlns:default="http://www.w3.org/2000/svg" d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" style="fill: rgb(255, 255, 255);"></path>
                                    </g>
                                </svg>
                            </button>
                            <button  v-if="this.userAccess" class="cancel_button delete_button" @click="deleteProduct">
                                Delete
                                <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 24 24" class="ng-element" style="opacity: 1; fill: rgb(255, 255, 255); width: 24px; height: 24px;">
                                    <g>
                                        <path xmlns:default="http://www.w3.org/2000/svg" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" style="fill: rgb(255, 255, 255);"></path>
                                    </g>
                                </svg>
                            </button>
                            <router-link :to="{name: 'ProductsList'}">
                                <button class="cancel_button">
                                    Cancel
                                    <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 24 24" class="ng-element" style="opacity: 1; fill: rgb(255, 255, 255); width: 24px; height: 24px;">
                                        <g>
                                            <path xmlns:default="http://www.w3.org/2000/svg" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" style="fill: rgb(255, 255, 255);"></path>
                                        </g>
                                    </svg>
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import UploadImage from './UploadImage'
export default {
  name: 'ProductForm',
  data () {
    return {
      hasError: {}
    }
  },
  props: ['create'],
  components: {UploadImage},
  computed: {
    ...mapState({
      userAccess: 'access',
      product: 'product',
      categories: 'categoryList'
    })
  },
  methods: {
    deleteProduct () {
      this.$store.dispatch('delete', this.product.id)
        .then(() => {
          this.hasError = false
          this.$router.push({name: 'ProductsList'})
        }).catch(err => {
          if (err.response.status !== 200) {
            this.hasError = err.response.data
          }
        })
    },
    getImage (image) {
      this.product.image = image
    },
    checkForm () {
      if (!this.product.title || !this.product.price || !this.product.description || !this.product.category_id || !this.product.image) {
        return false
      }
      this.create ? this.save('create') : this.save('update')
    },
    save (action) {
      if (!this.create && this.product.image instanceof Object) {
        this.$store.dispatch('updateImage', {id: this.$route.params.id, image: this.product.image})
      }

      this.$store.dispatch(action, this.product)
        .then(() => {
          this.hasError = false
          this.$router.push({name: 'ProductsList'})
        })
        .catch(err => {
          if (err.response.status !== 200) {
            this.hasError = err.response.data
          }
        })
    }
  }
}
</script>
