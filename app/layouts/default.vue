<script setup lang="ts">
const navItems = [
  { label: "首页", to: "/" },
  { label: "文章", to: "/blog" },
  { label: "归档", to: "/archive" },
  { label: "关于", to: "/about" },
];

const year = new Date().getFullYear();

provideSiteContext({
  siteName: "Jet Blog",
  author: "Jet",
  year,
});

const route = useRoute();
function isActiveNav(to: string) {
  if (to === "/") {
    return route.path === "/";
  }

  return route.path.startsWith(to);
}
</script>

<template>
  <div>
    <header class="site-header">
      <NuxtLink class="brand" to="/">Jet Blog</NuxtLink>

      <nav class="site-nav" aria-label="Primary navigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="{ active: isActiveNav(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="page-shell">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
