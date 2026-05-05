<script setup lang="ts">
const { data: posts } = await useFetch("/api/posts", {
  key: "home-posts",
});

const latestPosts = computed(() => {
  return posts.value?.slice(0, 3) ?? [];
});

const tagCloud = computed(() => {
  const names = posts.value?.flatMap((post) => post.tags ?? []) ?? [];
  const countMap = new Map<string, number>();

  for (const name of names) {
    countMap.set(name, (countMap.get(name) ?? 0) + 1);
  }

  return Array.from(countMap.entries()).map(([name, count]) => {
    return {
      name,
      count,
      path: `/tags/${encodeURIComponent(name)}`,
    };
  });
});

const postCount = computed(() => {
  return posts.value?.length ?? 0;
});

const tagCount = computed(() => {
  return tagCloud.value.length;
});

useSeoMeta({
  title: "首页",
  description: "记录技术、阅读与生活思考的个人博客。",
});
</script>

<template>
  <section class="hero">
    <p class="eyebrow">Notes / Essays / Archive</p>
    <h1>Jet Blog</h1>
    <p class="hero-copy">
      记录技术实践、阅读笔记和长期思考，把零散的经验整理成可以回看的文字。
    </p>
    <div class="hero-actions">
      <NuxtLink class="button" to="/blog">阅读文章</NuxtLink>
      <NuxtLink class="button secondary" to="/archive">查看归档</NuxtLink>
    </div>

    <div class="hero-stats">
      <NuxtLink to="/archive">
        <strong>{{ postCount }}</strong>
        <span>篇文章</span>
      </NuxtLink>

      <NuxtLink to="/blog">
        <strong>{{ tagCount }}</strong>
        <span>个标签</span>
      </NuxtLink>
    </div>
  </section>

  <section class="section">
    <SectionHeader eyebrow="Latest" title="最近文章" split>
      <NuxtLink class="text-button" to="/archive"> 查看归档 </NuxtLink>
    </SectionHeader>

    <PostList :posts="latestPosts" layout="grid" empty-title="还没有文章。" />
  </section>
  <section class="section">
    <SectionHeader eyebrow="Tags" title="标签" />

    <div class="tag-cloud">
      <NuxtLink
        v-for="tag in tagCloud"
        :key="tag.name"
        class="tag-cloud-item"
        :to="tag.path"
      >
        <span>{{ tag.name }}</span>
        <small>{{ tag.count }}</small>
      </NuxtLink>
    </div>
  </section>
</template>
