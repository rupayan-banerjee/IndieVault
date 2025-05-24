<template>
  <div class="container mt-4">
    <nav class="nav mb-4">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/news">News</router-link>
      <router-link class="nav-link" to="/about">About</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Responsive support, minor padding fix */
.nav-link {
  font-weight: bold;
}
</style>