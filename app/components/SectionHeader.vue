<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    description?: string;
    level?: 1 | 2;
    split?: boolean;
  }>(),
  {
    level: 2,
    split: false,
  },
);
</script>

<template>
  <div class="section-heading" :class="{ 'split-heading': split }">
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 v-if="level === 1">{{ title }}</h1>
      <h2 v-else>{{ title }}</h2>

      <p v-if="description">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
