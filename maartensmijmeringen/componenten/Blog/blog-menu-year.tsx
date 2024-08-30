"use client"

import { Blog } from "@/api/types";
import { FC, useEffect, useState } from "react";
import styles from './blog-menu.module.css';
import Link from "next/link";
import { BlogMenuMonth } from "./blog-menu-month";

export type BlogMenuYearProps = {
    blogs: Blog[],
    slug: string,
    year: number;
  };
  
export const BlogMenuYear: FC<BlogMenuYearProps> = ({ blogs, slug, year }) => {

    const yearBlogs = blogs.filter(b => new Date(b.attributes.published).getFullYear() === year);
    const hasCurrentBlog: boolean = !!yearBlogs.find(b => b.attributes.slug === slug);
    let loopMonth: number;
    const [isOpen, setIsOpen] = useState(hasCurrentBlog);

    return (
        <li>
            <a id={`y${year}`} key={`y${year}`} 
                className={`${styles.toggleLink} ${isOpen ? styles.open : styles.close}`}
                onClick={e => setIsOpen(!isOpen)}>{year}</a>
            <ul key={year}>
                { yearBlogs.map((blog: Blog) => {

                    const thisDate = new Date(blog.attributes.published);
                    const thisMonth = thisDate.getMonth();
                
                    if (thisMonth !== loopMonth) {
                        
                        loopMonth = thisMonth;
                        return <BlogMenuMonth key={thisMonth} month={thisMonth} year={year} blogs={yearBlogs} slug={slug} />
                    }

                })}
            </ul>
        </li>
    )
}

