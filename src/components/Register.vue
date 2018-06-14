<template>
    <div class="login-wrap">
        <div class="danger" :key="err" v-if="hasError" v-for="err in hasError">{{err}}</div>
        <div>
            <input v-model="data.login" type="text" name="email" placeholder="Email"/>
            <p class="danger" v-if="!data.login">this field is required</p>
        </div>
        <div>
            <input v-model="data.password" type="password" placeholder="Password" name="pass"/>
            <p class="danger" v-if="!data.password">this field is required</p>
        </div>
        <div>
            <input v-model="data.confirm_password" type="password" placeholder="Confirm password" name="confpass"/>
            <p class="danger" v-if="!data.confirm_password">this field is required</p>
        </div>
        <div>
            <button @click="registerAction">Create account</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      data: {
        login: '',
        password: '',
        confirm_password: ''
      },
      hasError: {}
    }
  },
  computed: {
    ...mapState(['isAuth'])
  },
  methods: {
    registerAction () {
      if (!this.data.login && !this.data.password && this.data.password !== this.data.confirm_password) return false
      this.$store.dispatch('register', this.data)
        .then(() => {
          this.hasError = false
          this.$router.push({name: 'Login'})
        }).catch(err => {
          if (err.response.status !== 200) {
            this.hasError = err.response.data
          }
        })
    },
    created () {
      if (this.isAuth) {
        this.$router.push({name: 'Page404'})
      }
    }
  }
}
</script>
