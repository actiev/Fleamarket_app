<template>
    <div class="login-wrap">
        <div class="danger" :key="err" v-if="hasError.length >= 1" v-for="err in hasError">{{err}}</div>
        <div>
            <input required v-model="login" type="text" name="email" placeholder="Email"/>
        </div>
        <div>
            <input required v-model="password" type="password" placeholder="Password" name="pass"/>
        </div>
        <div>
            <button @click="loginAction">Login</button>
        </div>
        <div class="danger">
            <router-link :to="{name: 'Register'}">create account</router-link>
        </div>
        <div>
            <span>forgot your password?</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      login: '',
      password: '',
      hasError: {}
    }
  },
  computed: {
    ...mapState(['isAuth'])
  },
  methods: {
    loginAction () {
      this.$store.dispatch('login', {login: this.login, password: this.password})
        .then(() => {
          this.hasError = false
          this.$router.push({name: 'ItemsList'})
        })
        .catch(err => {
          if (err.response.status !== 200) {
            this.hasError = err.response.data
          }
        })
    }
  },
  created () {
    if (this.isAuth) {
      this.$router.push({name: 'ItemsList'})
    }
  }
}
</script>
