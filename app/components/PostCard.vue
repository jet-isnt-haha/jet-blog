<script setup lang="ts">
import type { BlogPostListItem } from "~/types/blog";

defineProps<{
  post: BlogPostListItem;
}>();

const { $formatDate } = useNuxtApp();
</script>

<template>
  <article class="post-card">
    <NuxtLink class="post-card-main" :to="post.path">
      <p class="post-date">{{ $formatDate(post.date) }}</p>
      <h3>{{ post.title }}</h3>
      <p>{{ post.description }}</p>
    </NuxtLink>

    <div class="tag-row post-card-tags">
      <NuxtLink
        v-for="tag in post.tags"
        :key="tag"
        class="tag-pill"
        :to="`/tags/${encodeURIComponent(tag)}`"
      >
        {{ tag }}
      </NuxtLink>
    </div>
  </article>
</template>
