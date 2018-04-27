<template>
  <div id="app">
      <Header></Header>
      <div class="main">
        <router-view/>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  export default {
    name: 'App',
      components: {
          Header,
          Footer
      },
  }
</script>

