import type { TocItem } from "~/types/blog";

export function collectText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    const [, maybeProps, ...children] = value;
    const hasProps =
      maybeProps &&
      typeof maybeProps === "object" &&
      !Array.isArray(maybeProps);
    const textChildren = hasProps ? children : value;

    return textChildren.map(collectText).join(" ");
  }

  if (value && typeof value === "object") {
    return Object.values(value).map(collectText).join(" ");
  }

  return "";
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function collectHeadings(value: unknown): TocItem[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    const [tag, props, ...children] = value;

    if (
      (tag === "h2" || tag === "h3") &&
      props &&
      typeof props === "object" &&
      !Array.isArray(props)
    ) {
      const text = collectText(children).trim();

      if (!text) {
        return [];
      }

      const nodeProps = props as Record<string, unknown>;

      return [
        {
          id: typeof nodeProps.id === "string" ? nodeProps.id : slugify(text),
          text,
          depth: tag === "h2" ? 2 : 3,
        },
      ];
    }

    return value.flatMap(collectHeadings);
  }

  if (typeof value !== "object") {
    return [];
  }

  const node = value as {
    type?: string;
    tag?: string;
    props?: Record<string, unknown>;
    children?: unknown;
    value?: unknown;
  };

  const tag = node.tag ?? node.type;

  if (tag === "h2" || tag === "h3") {
    const text = collectText(node.children).trim();

    if (!text) {
      return [];
    }

    return [
      {
        id: typeof node.props?.id === "string" ? node.props.id : slugify(text),
        text,
        depth: tag === "h2" ? 2 : 3,
      },
    ];
  }

  return collectHeadings(node.children ?? node.value);
}

export function countReadingMinutes(value: unknown, wordsPerMinute = 220) {
  const text = collectText(value);
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
