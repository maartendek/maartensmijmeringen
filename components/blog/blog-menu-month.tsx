"use client"

import { Blog } from "@/api/types";
import { FC, useState } from "react";
import styles from './blog-menu.module.css';
import Link from "next/link";

export type BlogMenuMonthProps = {
    blogs: Blog[],
    month: number,
    slug: string,
    year: number;
  };
  
export const BlogMenuMonth: FC<BlogMenuMonthProps> = ({ month, year, blogs, slug }) => {

    const monthBlogs = blogs.filter(b => {
        const date = new Date(b.published);
        return date.getFullYear() === year && date.getMonth() === month;
    });
    const hasCurrentBlog: boolean = !!monthBlogs.find(b => b.slug === slug);
    const date = new Date(monthBlogs[0].published);
    const monthString: string = new Intl.DateTimeFormat("nl-NL", { month: 'long'}).format(date);
    const [isOpen, setIsOpen] = useState(hasCurrentBlog);
    
    return (
        <li>
            <a id={`y${year}-m${month}`} key={`y${year}-m${month}`}
                className={`${styles.toggleLink} ${isOpen ? styles.open : styles.close}`}
                onClick={e => setIsOpen(!isOpen)}>{monthString}</a>
            <ul key={`${year}-${month}`}>
                { monthBlogs.map((blog: Blog) => (
                    <li key={blog.slug}>
                        <Link href={`/blog/${blog.slug}`} className={`${slug === blog.slug && 'active'}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}
