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

  const tags = Array.from(
    new Set(posts.flatMap((post) => post.tags ?? [])),
  ).map((tag) => `/tags/${encodeURIComponent(tag)}`);

  const paths = [
    "/",
    "/blog",
    "/archive",
    "/about",
    ...posts.map((post) => post.path),
    ...tags,
  ];

  const urls = paths
    .map((path) => {
      const loc = new URL(path, siteUrl).toString();

      return `
        <url>
          <loc>${escapeXml(loc)}</loc>
        </url>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `;

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");

  return xml.trim();
});
