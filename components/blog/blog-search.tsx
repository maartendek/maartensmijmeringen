"use client"

import { ChangeEvent, FC, useState } from "react";
import styles from './blog-menu.module.css';
import { Blog } from "./types";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type BlogSearchProps = {
  blogs: Blog[],
};

export const BlogSearch: FC<BlogSearchProps> = ({ blogs }) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || "";
    
    const [ searchString, setSearchString ] = useState(q);

    const filteredBlogs = blogs.filter((b:Blog) => {
        return searchString && b.title.toLowerCase().includes(searchString.toLowerCase())})
        .sort((a: Blog, b: Blog) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);
    
    const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        // set to state
        setSearchString(value);
        // set query string param
        if (value?.length >= 2) {
            router.push(`/${ pathname }?q=${ value }`);
        }
    }
        
    return (
        <div className={styles['mm-blog-search']}>
            <h3>Search</h3>
            <input type="text" onChange={searchChange} value={searchString}/>
            <ul key="search">
                { filteredBlogs.map((blog: Blog, index: number) => {
                    return (<li key={blog.slug}>
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </li>)
                })}
            </ul>
        </div>
    );
};



