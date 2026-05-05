import { queryCollection } from "@nuxt/content/server";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = config.public.siteUrl;

  const posts = await queryCollection(event, "blog")
    .where("draft", "=", false)
    .order("date", "DESC")
    .all();

  const items = posts
    .map((post) => {
      const url = new URL(post.path, siteUrl).toString();

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid>${escapeXml(url)}</guid>
          <description>${escapeXml(post.description)}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Jet Blog</title>
        <link>${escapeXml(siteUrl)}</link>
        <description>记录技术、阅读与生活思考的个人博客。</description>
        <language>zh-CN</language>
        ${items}
      </channel>
    </rss>
  `;

  setHeader(event, "Content-Type", "application/rss+xml; charset=utf-8");

  return xml.trim();
});
