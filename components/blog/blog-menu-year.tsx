"use client";

import { FC, useState } from "react";
import { BlogMenuMonth } from "./blog-menu-month";
import styles from "./blog-menu.module.css";
import { Blog } from "./types";

export type BlogMenuYearProps = {
  blogs: Blog[];
  slug: string;
  year: number;
};

export const BlogMenuYear: FC<BlogMenuYearProps> = ({ blogs, slug, year }) => {
  const yearBlogs = blogs.filter(
    (b) => new Date(b.published).getFullYear() === year,
  );
  const hasCurrentBlog: boolean = !!yearBlogs.find((b) => b.slug === slug);
  const months = Array.from(
    new Set(yearBlogs.map((blog: Blog) => new Date(blog.published).getMonth())),
  );
  const [isOpen, setIsOpen] = useState(hasCurrentBlog);

  return (
    <li>
      <a
        id={`y${year}`}
        key={`y${year}`}
        className={`${styles.toggleLink} ${isOpen ? styles.open : styles.close}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {year}
      </a>
      <ul key={year}>
        {months.map((month) => (
          <BlogMenuMonth
            key={month}
            month={month}
            year={year}
            blogs={yearBlogs}
            slug={slug}
          />
        ))}
      </ul>
    </li>
  );
};
