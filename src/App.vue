<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import './assets/styles.css';
</script>

<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
main {
  min-height: 60vh;
  padding: 20px;
  text-align: center;
  background-color: var(--background);
}
</style>
