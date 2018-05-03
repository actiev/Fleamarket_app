<template>
    <div class="pagination">
        <span class="prev" @click="prev">«</span>
        <span class="active">{{this.page}}</span>
        <div class="pages" v-show="(this.page+this.firstPage) < pageCount">
            <span @click="next">{{this.page+this.firstPage}}</span>
            <span>...</span>
        </div>
        <span v-show="this.page !== pageCount" @click="lastPage">{{pageCount}}</span>
        <span class="next" @click="next">»</span>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: 1,
      firstPage: 1
    }
  },
  name: 'Pagination',
  computed: {
    ...mapState({
      list: 'addsList'
    }),
    pageCount () {
      return this.list.length / this.limit
    }
  },
  props: ['limit'],
  methods: {
    next () {
      if (this.page < this.pageCount) {
        this.page++
        this.changePage(this.page)
      }
    },
    prev () {
      if (this.page !== this.firstPage) {
        this.page--
        this.changePage(this.page)
      }
    },
    lastPage () {
      if (this.page < this.pageCount) {
        this.page = this.pageCount
        this.changePage(this.pageCount)
      }
    },
    changePage (page) {
      this.$store.dispatch('setPage', {data: page})
    }
  }
}
</script>
