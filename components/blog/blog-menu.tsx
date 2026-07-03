import { FC } from "react";
import { BlogMenuYear } from "./blog-menu-year";
import styles from "./blog-menu.module.css";
import { Blog } from "./types";

export type BlogMenuProps = {
  blogs: Blog[];
  slug: string;
};

export const BlogMenu: FC<BlogMenuProps> = ({ blogs, slug }) => {
  const sortedBlogs = [...blogs].sort((a: Blog, b: Blog) => {
    const aDate = Date.parse(a.published);
    const bDate = Date.parse(b.published);
    return bDate - aDate;
  });
  const years = Array.from(
    new Set(
      sortedBlogs.map((blog: Blog) =>
        new Date(blog.published).getUTCFullYear(),
      ),
    ),
  );

  return (
    <div className={styles["mm-blog-menu"]}>
      <h3>Archief</h3>
      <ul key="start">
        {years.map((year) => (
          <BlogMenuYear
            key={year}
            year={year}
            blogs={sortedBlogs}
            slug={slug}
          />
        ))}
      </ul>
    </div>
  );
};
