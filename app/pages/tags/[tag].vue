<script setup lang="ts">
const route = useRoute();

const tag = computed(() => {
  const value = route.params.tag;
  return typeof value === "string" ? decodeURIComponent(value) : "";
});

const tagPath = computed(() => {
  return `/tags/${encodeURIComponent(tag.value)}`;
});

const { data: posts } = await useAsyncData(`blog-posts`, () => {
  return queryCollection("blog")
    .where("draft", "=", false)
    .order("date", "DESC")
    .all();
});

const taggedPosts = computed(() => {
  return posts.value?.filter((post) => post.tags?.includes(tag.value)) ?? [];
});

useSeoMeta({
  title: () => `标签: ${tag.value}`,
  description: () => `浏览 ${tag.value} 标签下的文章`,
});

const config = useRuntimeConfig();

const canonicalUrl = computed(() => {
  return new URL(tagPath.value, config.public.siteUrl).toString();
});

useHead({
  link: [
    {
      rel: "canonical",
      href: canonicalUrl.value,
    },
  ],
});
</script>

<template>
  <section class="section compact">
    <NuxtLink class="back-link" to="/blog">返回文章列表</NuxtLink>

    <SectionHeader
      eyebrow="Tag"
      :title="tag"
      :description="`这个标签下共有 ${taggedPosts.length} 篇文章。`"
      :level="1"
    />
    <PostList :posts="taggedPosts" empty-title="这个标签下还没有文章。">
      <template #empty>
        <p>可能是链接里的标签不存在，或者相关文章还没有发布。</p>
        <NuxtLink class="text-button" to="/blog"> 浏览全部文章 </NuxtLink>
      </template>
    </PostList>
  </section>
</template>
