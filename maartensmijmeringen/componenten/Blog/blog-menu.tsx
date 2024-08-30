import { FC } from "react";
import Image from "next/image";
import styles from './blog-menu.module.css';
import { Blog } from "@/api/types";
import Link from "next/link";

export type BlogMenuProps = {
  blogs: Blog[]
};

export const BlogMenu: FC<BlogMenuProps> = ({ blogs }) => {
    return (
        <section className={styles['mm-blog-menu']}>
            <h3>Archief</h3>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <Link href={`/blog/${blog.attributes.slug}`}>{blog.attributes.title}</Link></li>
                ))}
            </ul>
        </section>
    );
};
