<script setup lang="ts">
import type { BlogPostNeighbor } from "~/types/blog";

defineProps<{
  previousPost: BlogPostNeighbor | null;
  nextPost: BlogPostNeighbor | null;
}>();
</script>

<template>
  <nav
    v-if="previousPost || nextPost"
    class="post-neighbors"
    aria-label="Article navigation"
  >
    <NuxtLink v-if="previousPost" class="neighbor-link" :to="previousPost.path">
      <span>上一篇</span>
      {{ previousPost.title }}
    </NuxtLink>

    <NuxtLink
      v-if="nextPost"
      class="neighbor-link align-right"
      :to="nextPost.path"
    >
      <span>下一篇</span>
      {{ nextPost.title }}
    </NuxtLink>
  </nav>
</template>

<style scoped></style>
