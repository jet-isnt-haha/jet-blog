<script setup lang="ts">
const site = useSiteContext();
</script>

<template>
  <footer class="site-footer">
    <p>&copy; {{ site.year }} {{ site.siteName }}. All rights reserved.</p>
    <NuxtLink to="/about"> about this project </NuxtLink>
  </footer>
</template>
