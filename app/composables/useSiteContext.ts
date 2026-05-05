import type { InjectionKey } from "vue";

type SiteContext = {
  siteName: string;
  author: string;
  year: number;
};

const siteContextKey: InjectionKey<SiteContext> = Symbol("site-context");

export function provideSiteContext(context: SiteContext) {
  provide(siteContextKey, context);
}

export function useSiteContext() {
  const context = inject(siteContextKey);

  if (!context) {
    throw new Error("useSiteContext must be used after provideSiteContext");
  }

  return context;
}
