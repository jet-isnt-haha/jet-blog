import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  return queryCollection(event, "blog")
    .where("draft", "=", false)
    .order("date", "DESC")
    .all();
});
