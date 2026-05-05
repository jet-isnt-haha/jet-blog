<script setup lang="ts">
const { data: page } = await useAsyncData("about-page", () => {
  return queryCollection("pages").path("/about").first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "About page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
});
</script>

<template>
  <section class="section compact" v-if="page">
    <SectionHeader
      eyebrow="About"
      :title="page.title"
      :description="page.description"
      :level="1"
    />
    <ContentRenderer class="prose" :value="page" />
  </section>
</template>
