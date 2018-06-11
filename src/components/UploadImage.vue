<template>
    <div class="col1">
        <img v-if="imageData" :src="imageData" />
        <img v-else-if="item.image" :src="uploads + item.image" />
        <div class="imageActions">
            <input type="file" id="file" accept="image/*" @change="onFileChange" v-if="!item.image && !imageData" >
            <p class="danger" v-if="!item.image && !imageData">Please upload image</p>
            <label for="file" v-if="!item.image && !imageData">
                <span>
                <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 24 24" style="opacity: 1; fill: rgb(0, 0, 0); width: 32px; height: 32px;">
                    <g><path xmlns:default="http://www.w3.org/2000/svg" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" style="fill: rgb(0, 0, 0);"></path></g>
                </svg>
                </span>
            </label>
            <span @click="removeImage" v-else>
                <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 20 20" style="opacity: 1; fill: rgb(0, 0, 0); width: 24px; height: 24px;">
                    <g>
                        <rect display="none" fill="#FFA400" width="20" height="20" style="fill: rgb(0, 0, 0);"></rect>
                        <rect display="none" fill="none" width="20" height="20" style="fill: rgb(0, 0, 0);"></rect>
                        <polygon fill-rule="evenodd" clip-rule="evenodd" points="20,3 17,0 10,7 3,0 0,3 7,10 0,17 3,20 10,13 17,20 20,17 13,10 " style="fill: rgb(0, 0, 0);"></polygon>
                    </g>
                </svg>
            </span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UploadImage',
  data () {
    return {
      imageData: null
    }
  },
  computed: {
    ...mapState({
      item: 'item',
      uploads: 'uploads'
    })
  },
  methods: {
    onFileChange (e) {
      if (e.target.files) {
        this.imageData = e.target.files[0]
      }
      this.createImage(this.imageData)
      this.$emit('add', this.imageData)
    },
    createImage (file) {
      let reader = new FileReader()

      reader.onload = (e) => {
        this.imageData = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage () {
      this.item.image = null
      this.imageData = null
    }
  },
  created () {
    this.$store.dispatch('loadById', this.$route.params.id)
  }
}
</script>
