<script setup lang="ts">
import type { TocItem } from "~/types/blog";

defineProps<{
  items: TocItem[];
}>();
</script>

<template>
  <aside v-if="items.length" class="toc">
    <p>目录</p>
    <a
      v-for="item in items"
      :key="item.id"
      :class="{ nested: item.depth === 3 }"
      :href="`#${item.id}`"
    >
      {{ item.text }}
    </a>
  </aside>
</template>
