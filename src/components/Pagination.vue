<template>
    <div class="pagination" @click="changePage">
        <span class="prev" data-action="prev">«</span>
        <span class="active">{{this.currentPage}}</span>
        <div class="pages" v-show="(this.currentPage+this.default) < pageCount">
            <span data-action="next">{{this.currentPage+this.default}}</span>
            <span>...</span>
        </div>
        <span v-show="this.currentPage !== pageCount & pageCount !== 0" data-action="last">{{pageCount}}</span>
        <span class="next" data-action="next">»</span>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Pagination',
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapState({
      currentPage: 'currentPage'
    }),
    pageCount () {
      return Math.ceil(this.adds.length / this.limit)
    }
  },
  props: ['adds', 'limit', 'default'],
  methods: {
    changePage (e) {
      let action = e.target.dataset.action

      if (this.currentPage < this.pageCount && action === 'next') {
        this.page = this.currentPage + this.default
      } else if (this.currentPage !== this.default && action === 'prev') {
        this.page = this.currentPage - this.default
      } else if (this.currentPage < this.pageCount && action === 'last') {
        this.page = this.pageCount
      }

      this.$store.dispatch('setPage', {data: this.page})
    }
  }
}
</script>
