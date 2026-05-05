<script setup lang="ts">
const route = useRoute()

const path = computed(() =>{
  const value = route.params.slug;
  const slug = Array.isArray(value)? value.join('/'):value;
  return  `/blog/${slug}`
})
const { data: post } = await useAsyncData(`post-${path.value}`, () => {
  return queryCollection('blog').path(path.value).first()
})

const { data: posts } = await useAsyncData('post-neighbors', () => {
  return queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
    fatal: true
  })
}


const readingMinutes = computed(() => {
  return countReadingMinutes([
    post.value?.title,
    post.value?.description,
    post.value?.body.value
  ])
})


const toc = computed(() => {
  return collectHeadings(post.value?.body?.value);
})

const currentIndex = computed(() => {
  return posts.value?.findIndex(item => item.path === post.value?.path) ?? -1;
})

const previousPost = computed(() => {
  if (currentIndex.value <= 0) {
    return null;
  }
  return posts.value?.[currentIndex.value - 1] ?? null;
})

const nextPost = computed(() => {
  if (currentIndex.value < 0) {
    return null;
  }

  return posts.value?.[currentIndex.value + 1] ?? null;
})

const config = useRuntimeConfig();

const canonicalUrl = computed(()=>{
  return new URL(path.value,config.public.siteUrl).toString();
})

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.description,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogType: 'article',
  ogUrl: () => canonicalUrl.value,
  twitterCard: 'summary_large_image',
  twitterTitle: () => post.value?.title,
  twitterDescription: () => post.value?.description,
  articlePublishedTime: () => post.value?.date,
  articleTag: () => post.value?.tags
})

useHead({
  link:[
    {
      rel:'canonical',
      href:canonicalUrl.value
    }
  ]
})
</script>

<template>
  <article class="article" v-if="post">
    <NuxtLink class="back-link" to="/blog">返回文章列表</NuxtLink>

    <ArticleHeader
      :title="post.title"
      :description="post.description"
      :date = "post.date"
      :tags = "post.tags??[]"
      :reading-minutes="readingMinutes"
    />

    <div class="article-body">
      <ArticleToc :items="toc"/>
      <ContentRenderer class="prose" :value="post" />
    </div>

    <ArticleNeighbors
      :previous-post="previousPost"
      :next-post="nextPost"
    />
  </article>
</template>
