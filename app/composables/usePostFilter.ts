import type { Ref } from "vue";

type FilterablePost = {
  title: string;
  description: string;
  tags?: string[];
};

type FilterState = {
  keyword: string;
  selectedTag: string;
};

export function usePostFilter<TPost extends FilterablePost>(
  posts: Ref<ReadonlyArray<TPost> | undefined | null>,
) {
  const route = useRoute();
  const router = useRouter();

  function getQueryState(query: typeof route.query): FilterState {
    return {
      keyword: typeof query.q === "string" ? query.q : "",
      selectedTag: typeof query.tag === "string" ? query.tag : "全部",
    };
  }

  const initialState = getQueryState(route.query);

  const keyword = ref(initialState.keyword);
  const selectedTag = ref(initialState.selectedTag);

  const tags = computed(() => {
    const names = posts.value?.flatMap((post) => post.tags ?? []) ?? [];
    return ["全部", ...Array.from(new Set(names))];
  });

  const filteredPosts = computed(() => {
    const source = posts.value ?? [];

    const byTag =
      selectedTag.value === "全部"
        ? source
        : source.filter((post) => post.tags?.includes(selectedTag.value));

    const text = keyword.value.trim().toLowerCase();

    if (!text) {
      return byTag;
    }

    return byTag.filter((post) => {
      return (
        post.title.toLowerCase().includes(text) ||
        post.description.toLowerCase().includes(text) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(text))
      );
    });
  });

  const hasFilters = computed(() => {
    return keyword.value.trim().length > 0 || selectedTag.value !== "全部";
  });

  const emptyMessage = computed(() => {
    if (!hasFilters.value) {
      return "还没有文章。";
    }
    return "没有找到匹配的文章。";
  });

  const resetFilter = () => {
    keyword.value = "";
    selectedTag.value = "全部";
  };

  function getNextQuery(state: FilterState) {
    return {
      ...route.query,
      q: state.keyword.trim() || undefined,
      tag: state.selectedTag === "全部" ? undefined : state.selectedTag,
    };
  }

  function isSameQueryValue(a: unknown, b: unknown) {
    return String(a ?? "") === String(b ?? "");
  }

  watch([keyword, selectedTag], ([nextKeyword, nextTag]) => {
    const nextState: FilterState = {
      keyword: nextKeyword,
      selectedTag: nextTag,
    };

    const nextQuery = getNextQuery(nextState);

    if (
      isSameQueryValue(route.query.q, nextQuery.q) &&
      isSameQueryValue(route.query.tag, nextQuery.tag)
    ) {
      return;
    }

    router.replace({
      query: nextQuery,
    });
  });

  // 反向watch
  watch(
    () => route.query,
    (query) => {
      const { keyword: nextKeyword, selectedTag: nextTag } =
        getQueryState(query);

      if (keyword.value !== nextKeyword) {
        keyword.value = nextKeyword;
      }

      if (selectedTag.value !== nextTag) {
        selectedTag.value = nextTag;
      }
    },
  );

  return {
    // writable state
    keyword,
    selectedTag,

    // readonly derived state
    tags: readonly(tags),
    filteredPosts: readonly(filteredPosts),
    hasFilters: readonly(hasFilters),
    emptyMessage: readonly(emptyMessage),

    // actions
    resetFilter,
  };
}
