<script setup lang="ts">
    defineProps<{
        title:string,
        description:string,
        date:string,
        tags:string[],
        readingMinutes:number
    }>()
</script>

<template>
    <header class="article-header">
      <p class="eyebrow">{{ date }} • {{ readingMinutes }} 分钟阅读</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="tag-row">
        <span v-for="tag in tags" :key="tag" class="tag-pill">{{ tag }}</span>
      </div>
    </header>
</template>
