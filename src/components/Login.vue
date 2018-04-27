<template>
    <div class="login-wrap">
        <div>
            <input type="text" name="email" placeholder="Email"/>
        </div>
        <div>
            <input type="password" placeholder="Password" name="pass"/>
        </div>
        <div>
            <button @click="loginAction">Login</button>
        </div>
        <div>
            <span>forgot your password?</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            // login: 'test',
            // pass: 'test'
        }
    },
    methods: {
        'loginAction': function () {
           console.log(this.email);
           console.log(this.pass);
        }
    }
}
</script>
