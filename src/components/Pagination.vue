<template>
    <div class="pagination" @click="changePage">
        <span class="prev" :data-page="this.value-1">«</span>
        <span class="active" v-show="this.value <= this.total" :data-page="this.value">{{this.value}}</span>
        <div class="pages" v-show="this.value+1 < this.total">
            <span :data-page="this.value+1" v-show="this.value+1 >= this.total">{{this.value+1}}</span>
            <span>...</span>
        </div>
        <span v-show="this.value !== this.total && this.total !== 0" :data-page="this.total">{{this.total}}</span>
        <span class="next" :data-page="this.value+1">»</span>
    </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    limit: {
      type: Number
    },
    total: {
      type: Number
    },
    value: {
      type: Number
    }
  },
  methods: {
    changePage (e) {
      if (e.target.dataset.page > 0 && e.target.dataset.page <= this.total) this.$emit('change', parseInt(e.target.dataset.page))
    }
  }
}
</script>
