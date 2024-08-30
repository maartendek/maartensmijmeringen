import { FC, PointerEvent } from "react";
import Image from "next/image";
import styles from './blog-menu.module.css';
import { Blog } from "@/api/types";
import Link from "next/link";
import { BlogMenuYear } from "./blog-menu-year";

export type BlogMenuProps = {
  blogs: Blog[],
  slug: string
};

let loopYear: number;

export const BlogMenu: FC<BlogMenuProps> = ({ blogs, slug }) => {
    const sortedBlogs = blogs.sort((a: Blog, b: Blog) => {
        const aDate = Date.parse(b.attributes.published);
        const bDate = Date.parse(b.attributes.published);
        return bDate - aDate ;
    });

    return (
        <section className={styles['mm-blog-menu']}>
            <h3>Archief</h3>
            <ul key="start">
                { sortedBlogs.map((blog: Blog, index: number) => {
                    const thisDate = new Date(blog.attributes.published);
                    const thisYear = thisDate.getUTCFullYear();
                
                    if (thisYear !== loopYear) {
                        
                        loopYear = thisYear;
                        return <BlogMenuYear key={thisYear} year={thisYear} blogs={sortedBlogs} slug={slug} />;

                    }
                })}
            </ul>
        </section>
    );
};



