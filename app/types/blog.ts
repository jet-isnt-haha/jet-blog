export type BlogPostListItem = {
  id: string;
  path: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

export type BlogPostNeighbor = {
  path: string;
  title: string;
};

export type TocItem = {
  id: string;
  text: string;
  depth: number;
};
