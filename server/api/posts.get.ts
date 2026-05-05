import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, "blog")
    .where("draft", "=", false)
    .order("date", "DESC")
    .all();

  return posts.map((post) => {
    return {
      id: post.id,
      path: post.path,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags ?? [],
    };
  });
});
