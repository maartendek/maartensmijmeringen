import { FC } from "react";
import Image from "next/image";
import styles from './blog-menu.module.css';
import { Blog } from "@/api/types";

export type BlogMenuProps = {
  blogs: Blog[]
};

export const BlogMenu: FC<BlogMenuProps> = ({ blogs }) => {
    return (
        <section className={styles['mm-blog-menu']}>
            <h3>Archief</h3>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>{blog.attributes.title}</li>
                ))}
            </ul>
        </section>
    );
};
