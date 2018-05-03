<template>
    <div class="container content_box">
        <div class="content_box_top">
            <div class="menu_box">
                <div class="select_category" @click="show = !show">
                    <span>Catigories</span>
                    <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 256 256" style="opacity: 1; fill: rgb(117, 117, 117); width: 10px; height: 10px;">
                        <path fill="#343434" d="M239.999,56.243c6.916,0,11.753,3.267,14.553,9.8c2.758,6.534,1.57,12.346-3.521,17.48L139.555,195.168 c-3.732,3.182-7.637,4.709-11.624,4.582c-4.031,0-7.849-1.527-11.456-4.582L4.979,83.523c-5.134-5.134-6.279-10.946-3.521-17.48 s7.764-9.8,14.977-9.8H239.999L239.999,56.243z" style="fill: rgb(117, 117, 117);"></path>
                    </svg>
                </div>
                <nav class="menu" v-show="show">
                    <div class="close_category" @click="show = !show">
                        <span>Catigories</span>
                        <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 256 256" style="opacity: 1; fill: rgb(111, 111, 111); width: 9px; height: 10px; transform: rotate(0deg) rotate(180deg);"><path fill="#343434" d="M239.999,56.243c6.916,0,11.753,3.267,14.553,9.8c2.758,6.534,1.57,12.346-3.521,17.48L139.555,195.168 c-3.732,3.182-7.637,4.709-11.624,4.582c-4.031,0-7.849-1.527-11.456-4.582L4.979,83.523c-5.134-5.134-6.279-10.946-3.521-17.48 s7.764-9.8,14.977-9.8H239.999L239.999,56.243z" style="fill: rgb(111, 111, 111);"></path>
                        </svg>
                    </div>
                    <div class="menu__items">
                        <div class="colum1">
                            <span>title</span>
                            <ul>
                                <li><a href="#">Account</a></li>
                                <li><a href="#">Preferences</a></li>
                            </ul>
                        </div>
                        <div class="colum2">

                        </div>
                    </div>
                </nav>
            </div>
            <div class="search_wrap">
                <input type="search" id="Search" name="q" placeholder="Search">
                <div class="search_ico">
                    <svg version="1.2" preserveAspectRatio="none" viewBox="-0.5100000000000016 0 51 51" style="opacity: 1; fill: rgb(255, 255, 255); width: 16px; height: 20px;"><g>
                        <g>
                            <path class="st0" d="M35,6C27-2,14-2,6,6c-8,8-8,21,0,29c8,8,21,8,29,0C43,27,43,14,35,6z M33.6,33.6c-7.2,7.2-18.9,7.2-26.2,0    c-7.2-7.2-7.2-18.9,0-26.2c7.2-7.2,18.9-7.2,26.2,0C40.8,14.6,40.8,26.4,33.6,33.6z M38,37l-2,2l12,12l2-2L38,37z" style="fill: rgb(255, 255, 255);"></path>
                        </g>
                    </g></svg>
                </div>
            </div>
            <div class="content_top_triggers">
                <span class="active_button" :class="{ active: isActive }" @click="isActive = !isActive">Active</span>
                <span class="inactive_button" :class="{ active: !isActive }" @click="isActive = false">Inactive</span>
            </div>
            <div class="check_box_container">
                <label>
                    My ads
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div>
                <router-link :to="{name: 'AddForm'}">
                    <button class="add_new_adds">
                        Add New
                        <svg class="contact_button_svg" version="1.2" preserveAspectRatio="none" viewBox="0 0 800 800" data-id="5fc86a9c4523066c4675124fcc01e01f">
                            <g><polygon xmlns:default="http://www.w3.org/2000/svg" points="800,327.3 472.7,327.3 472.7,0 327.3,0 327.3,327.3 0,327.3 0,472.7 327.3,472.7 327.3,800 472.7,800 472.7,472.7   800,472.7 "></polygon></g>
                        </svg>
                    </button>
                </router-link>
            </div>
        </div>
        <div class="content_box_center">
            <one-add v-for="item in items" :item="item" :key="item.id"></one-add>
        </div>
        <div class="content_box_bottom">
            <pagination :limit="this.addsLimit"></pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { HTTP } from '@/api/api'
import OneAdd from '@/components/OneAdd'
import Pagination from '@/components/Pagination'
export default {
  name: 'AddsList',
  data () {
    return {
      errors: [],
      show: false,
      isActive: true,
      addsLimit: 10
    }
  },
  computed: {
    ...mapState({
      list: 'addsList',
      currentPage: 'currentPage'
    }),
    items () {
      return this.list.filter((item, index) => {
        return index >= ((this.addsLimit * this.currentPage) - this.addsLimit) &
          index < this.addsLimit * this.currentPage
      })
    }
  },
  components: {
    'one-add': OneAdd,
    'pagination': Pagination
  },
  created () {
    HTTP.get('posts')
      .then(response => {
        this.$store.dispatch('setList', {data: response.data})
      })
      .catch(e => {
        this.errors.push(e)
        console.log(this.errors)
      })
  }
}
</script>
