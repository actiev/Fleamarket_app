<template>
    <div class="container content_box">
        <div class="content_box_top">
            <div class="menu_box">
                <div class="select_category" @click="showMenu = !showMenu">
                    <span>Categories</span>
                    <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 256 256" style="opacity: 1; fill: rgb(117, 117, 117); width: 10px; height: 10px;">
                        <path fill="#343434" d="M239.999,56.243c6.916,0,11.753,3.267,14.553,9.8c2.758,6.534,1.57,12.346-3.521,17.48L139.555,195.168 c-3.732,3.182-7.637,4.709-11.624,4.582c-4.031,0-7.849-1.527-11.456-4.582L4.979,83.523c-5.134-5.134-6.279-10.946-3.521-17.48 s7.764-9.8,14.977-9.8H239.999L239.999,56.243z" style="fill: rgb(117, 117, 117);"></path>
                    </svg>
                </div>
                <nav class="menu" v-show="showMenu" @click="showMenu = !showMenu">
                    <div class="close_category">
                        <span>Categories</span>
                        <svg version="1.2" preserveAspectRatio="none" viewBox="0 0 256 256" style="opacity: 1; fill: rgb(111, 111, 111); width: 9px; height: 10px; transform: rotate(0deg) rotate(180deg);"><path fill="#343434" d="M239.999,56.243c6.916,0,11.753,3.267,14.553,9.8c2.758,6.534,1.57,12.346-3.521,17.48L139.555,195.168 c-3.732,3.182-7.637,4.709-11.624,4.582c-4.031,0-7.849-1.527-11.456-4.582L4.979,83.523c-5.134-5.134-6.279-10.946-3.521-17.48 s7.764-9.8,14.977-9.8H239.999L239.999,56.243z" style="fill: rgb(111, 111, 111);"></path>
                        </svg>
                    </div>
                    <span @click="selCategory = null, getList(1)">Get all</span>
                    <div class="menu__items">
                        <div v-for="cat in categories" :key="cat.category.id">
                            <h3>{{cat.category.name}}</h3>
                            <ul>
                                <li @click="selCategory = child.id, getList(1)" :key="child.id" v-for="child in cat.children">{{child.name}}</li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="search_wrap">
                <input type="search" id="Search" @change="getList" v-model="searchText" placeholder="Search">
                <div class="search_ico">
                    <svg version="1.2" preserveAspectRatio="none" viewBox="-0.5100000000000016 0 51 51" style="opacity: 1; fill: rgb(255, 255, 255); width: 16px; height: 20px;"><g>
                        <g>
                            <path class="st0" d="M35,6C27-2,14-2,6,6c-8,8-8,21,0,29c8,8,21,8,29,0C43,27,43,14,35,6z M33.6,33.6c-7.2,7.2-18.9,7.2-26.2,0    c-7.2-7.2-7.2-18.9,0-26.2c7.2-7.2,18.9-7.2,26.2,0C40.8,14.6,40.8,26.4,33.6,33.6z M38,37l-2,2l12,12l2-2L38,37z" style="fill: rgb(255, 255, 255);"></path>
                        </g>
                    </g></svg>
                </div>
            </div>
            <div class="content_top_triggers">
                <span class="active_button" :class="{ active: isActive }" @click="isActive = true, getList(1)">Active</span>
                <span class="inactive_button" :class="{ active: !isActive }" @click="isActive = false, getList(1)">Inactive</span>
            </div>
            <div class="check_box_container">
                <label>
                    My ads
                    <input type="checkbox" @click="userAdds = !userAdds">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div>
                <router-link :to="{name:'AddForm'}">
                    <button class="add_new_adds">
                        Add New
                        <svg class="contact_button_svg" version="1.2" preserveAspectRatio="none" viewBox="0 0 800 800">
                            <g><polygon xmlns:default="http://www.w3.org/2000/svg" points="800,327.3 472.7,327.3 472.7,0 327.3,0 327.3,327.3 0,327.3 0,472.7 327.3,472.7 327.3,800 472.7,800 472.7,472.7   800,472.7 "></polygon></g>
                        </svg>
                    </button>
                </router-link>
            </div>
        </div>
        <div class="content_box_center">
            <item @updateList="getList" v-for="item in this.list" :item="item" :key="item.id"></item>
        </div>
        <div class="content_box_bottom">
            <pagination @change="getPage" :limit="this.addsLimit" :total="parseInt(this.howPages)" :value="this.currentPage"></pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import Item from '@/components/Item'
export default {
  name: 'ItemsList',
  data () {
    return {
      showMenu: false,
      isActive: true,
      addsLimit: 10,
      currentPage: 1,
      searchText: '',
      selCategory: null,
      userAdds: false
    }
  },
  computed: {
    ...mapState({
      list: 'ItemsList',
      categories: 'categoryList',
      howPages: 'pages'
    })
  },
  methods: {
    getPage (page) {
      this.currentPage = page
      this.getList()
    },
    getList (page, category, active, search) {
      if (page) this.currentPage = page
      this.$store.dispatch('setList', {
        params: {
          state: 1,
          page: this.currentPage,
          category: category || this.selCategory,
          active: active || this.isActive,
          search: search || this.search,
          sorting: 'newest'
        }
      })
    }
  },
  components: {
    Item,
    'pagination': Pagination
  },
  mounted () {
    this.getList()
    this.$store.dispatch('setCategories')
  }
}
</script>
