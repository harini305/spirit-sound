import { SITE_URL, seo } from "@/content/site";

export default function sitemap() {
  return Object.values(seo).map(({ path }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
