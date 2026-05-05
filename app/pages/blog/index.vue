<script setup lang="ts">
const { data: posts } = await useAsyncData("blog-posts", () => {
  return queryCollection("blog")
    .where("draft", "=", false)
    .order("date", "DESC")
    .all();
});

const {
  keyword,
  selectedTag,
  tags,
  filteredPosts,
  hasFilters,
  emptyMessage,
  resetFilter,
} = usePostFilter(posts);

useSeoMeta({
  title: "文章",
  description: "浏览全部文章。",
});
</script>

<template>
  <section class="section compact">
    <SectionHeader :level="1" title="文章" eyebrow="blog" />

    <PostFilter
      v-model:keyword="keyword"
      v-model:selected-tag="selectedTag"
      :tags="tags"
      :has-filters="hasFilters"
      @reset="resetFilter"
    />

    <PostList :posts="filteredPosts" :empty-title="emptyMessage">
      <template #empty>
        <p v-if="hasFilters">换一个关键词，或者清空筛选条件</p>
      </template>
    </PostList>
  </section>
</template>
