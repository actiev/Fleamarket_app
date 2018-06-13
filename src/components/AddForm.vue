<template>
    <div class="container">
        <div class="path">
            <ul>
                <li>
                    <router-link :to="{name: 'AddsList'}">Home</router-link>
                    <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 256 256" style="opacity: 1; fill: rgb(199, 199, 199); width: 12px; height: 12px;">
                        <path fill="#343434" d="M203.438,116.838c3.26,3.226,4.89,6.995,4.89,11.307c0,4.346-1.63,8.115-4.89,11.34L91.609,251.179 C88.384,254.37,84.649,256,80.371,256c-4.244,0-8.013-1.63-11.239-4.821l-16.638-16.638c-3.226-3.26-4.821-6.995-4.821-11.273 s1.596-8.013,4.821-11.204l84.58-84.564l-84.58-83.562c-3.226-3.226-4.821-6.927-4.821-11.069c0-4.142,1.596-7.843,4.821-11.069 L69.132,4.822C72.357,1.596,76.126,0,80.473,0c4.312,0,8.047,1.596,11.137,4.822L203.438,116.838L203.438,116.838z" style="fill: rgb(199, 199, 199);"></path>
                    </svg>
                </li>
                <li class="current">
                    Add form
                </li>
            </ul>
        </div>
        <div class="edit_form_wrap">
            <div class="row">
                <uploadimage @add="getImage"></uploadimage>
                <div class="col2">
                    <div class="form">
                        <div class="form_row">
                            <label for="title">Title</label>
                            <input id="title" type="text" v-model="title" placeholder="Enter title">
                            <p class="danger" v-if="!this.title">this field is required</p>
                        </div>
                        <div class="form_row">
                            <label for="price">Price</label>
                            <input id="price" type="text" v-model="price" placeholder="Enter price">
                            <p class="danger" v-if="!this.price">this field is required</p>
                        </div>
                        <div class="form_row" >
                            <label for="price">Select category</label>
                            <select v-model="selCategory">
                                <optgroup v-for="cat in categories" :label="cat.category.name" :key="cat.category.id">
                                    <option :key="child.id" v-for="child in cat.children" :value="child.id">{{child.name}}</option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form_row">
                            <label for="overview">Overview</label>
                            <textarea id="overview" v-model="description" placeholder="Enter full description"></textarea>
                            <p class="danger" v-if="!this.description">this field is required</p>
                        </div>
                        <div class="form_row_buttons">
                            <button @click="checkForm" class="save_button">
                                <span>Add</span>
                                <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 24 24" style="opacity: 1; fill: rgb(255, 255, 255); width: 24px; height: 24px;">
                                    <g>
                                        <path xmlns:default="http://www.w3.org/2000/svg" d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" style="fill: rgb(255, 255, 255);"></path>
                                    </g>
                                </svg>
                            </button>
                            <button class="cancel_button">
                                <router-link :to="{name: 'AddsList'}">Cancel</router-link>
                                <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 24 24" class="ng-element" style="opacity: 1; fill: rgb(255, 255, 255); width: 24px; height: 24px;">
                                    <g>
                                        <path xmlns:default="http://www.w3.org/2000/svg" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" style="fill: rgb(255, 255, 255);"></path>
                                    </g>
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
import { HTTP } from '@/api/api'
import UploadImage from '@/components/UploadImage'
export default {
  data () {
    return {
      title: null,
      price: null,
      description: null,
      selCategory: null,
      image: null
    }
  },
  components: {
    'uploadimage': UploadImage
  },
  name: 'AddForm',
  computed: {
    ...mapState({
      categories: 'categoryList',
      item: 'addItem'
    })
  },
  methods: {
    getImage (image) {
      this.image = image
    },
    checkForm () {
      if (!this.title || !this.price || !this.description || !this.selCategory || !this.image) return
      this.addNewAdds()
    },
    addNewAdds () {
      let bodyFormData = new FormData()

      bodyFormData.append('title', this.title)
      bodyFormData.append('price', this.price)
      bodyFormData.append('description', this.description)
      bodyFormData.append('category_id', this.selCategory)
      bodyFormData.append('image', this.image, this.image.name)
      // bodyFormData.append('user_id', '')

      HTTP.post('product', bodyFormData)
        .then(response => {
          if (response.status !== 400) {
            this.$router.push('/')
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
