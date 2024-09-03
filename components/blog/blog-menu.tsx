import { FC, PointerEvent } from "react";
import styles from './blog-menu.module.css';
import { BlogMenuYear } from "./blog-menu-year";
import { Blog } from "./types";

export type BlogMenuProps = {
  blogs: Blog[],
  slug: string
};

let loopYear: number;

export const BlogMenu: FC<BlogMenuProps> = ({ blogs, slug }) => {
    const sortedBlogs = blogs.sort((a: Blog, b: Blog) => {
        const aDate = Date.parse(b.published);
        const bDate = Date.parse(b.published);
        return bDate - aDate ;
    });

    return (
        <div className={styles['mm-blog-menu']}>
            <h3>Archief</h3>
            <ul key="start">
                { sortedBlogs.map((blog: Blog, index: number) => {
                    const thisDate = new Date(blog.published);
                    const thisYear = thisDate.getUTCFullYear();
                
                    if (thisYear !== loopYear) {
                        
                        loopYear = thisYear;
                        return <BlogMenuYear key={thisYear} year={thisYear} blogs={sortedBlogs} slug={slug} />;

                    }
                })}
            </ul>
        </div>
    );
};



