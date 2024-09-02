export type Blog = {
  html: string;
  image?: string;
  published: string;
  slug: string;
  title: string;
  updated?: string;
};

export type BlogResponse = Blog[];