import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, "blog")
    .where("draft", "=", false)
    .all();

  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      tags.add(tag);
    }
  }

  return {
    postCount: posts.length,
    tagCount: tags.size,
    generatedAt: new Date().toISOString(),
  };
});
