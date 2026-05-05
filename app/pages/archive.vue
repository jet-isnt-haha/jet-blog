<script setup lang="ts">
const { data: posts } = await useAsyncData("archive-posts", () => {
  return queryCollection("blog")
    .where("draft", "=", false)
    .order("date", "DESC")
    .all();
});

// [number] 取数组里的单个元素类型
type ArchivePost = NonNullable<typeof posts.value>[number];

const groups = computed(() => {
  const map = new Map<string, ArchivePost[]>();

  for (const post of posts.value ?? []) {
    const year = post.date.slice(0, 4);
    const list = map.get(year) ?? [];

    list.push(post);
    map.set(year, list);
  }

  return Array.from(map.entries()).map(([year, posts]) => {
    return {
      year,
      posts,
    };
  });
});

useSeoMeta({
  title: "归档",
  description: "按年份浏览所有文章",
});
</script>

<template>
  <section class="section compact">
    <SectionHeader
      eyebrow="Archive"
      title="归档"
      description="按年份浏览所有文章。"
      :level="1"
    />

    <div v-if="groups.length" class="archive-list">
      <section v-for="group in groups" :key="group.year" class="archive-group">
        <h2>{{ group.year }}</h2>

        <NuxtLink
          v-for="post in group.posts"
          :key="post.id"
          class="archive-item"
          :to="post.path"
        >
          <time>{{ post.date }}</time>
          <span>{{ post.title }}</span>
        </NuxtLink>
      </section>
    </div>

    <EmptyState v-else title="还没有可归档的文章。" />
  </section>
</template>
