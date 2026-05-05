<script setup lang="ts">
import type { BlogPostListItem } from "~/types/blog";

withDefaults(
  defineProps<{
    posts: readonly BlogPostListItem[];
    layout?: "list" | "grid";
    emptyTitle?: string;
  }>(),
  {
    layout: "list",
    emptyTitle: "还没有文章。",
  },
);
</script>

<template>
  <div
    v-if="posts.length"
    :class="layout === 'grid' ? 'post-grid' : 'post-list'"
  >
    <slot v-for="post in posts" name="item" :post="post">
      <PostCard :post="post" />
    </slot>
  </div>

  <EmptyState v-else :title="emptyTitle">
    <slot name="empty" />
  </EmptyState>
</template>
