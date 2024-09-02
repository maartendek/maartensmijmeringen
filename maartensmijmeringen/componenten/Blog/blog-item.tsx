"use client"

import { FC, useEffect } from "react";
import Image from "next/image";
import styles from './blog-item.module.css';

export type BlogItemProps = {
  body: string;
  image?: string;
  published: string;
  slug: string;
  title: string;
  updated?: string;
};

export const BlogItem: FC<BlogItemProps> = ({ title, body }) => {
    // set title
    useEffect(() => {
        if (title) {
            const description = document.querySelector('meta[name="description"]')?.getAttribute("content");
            const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute("content");
            document.title = `${title} - Maartens Mijmeringen`;
            document.querySelector('meta[name="description"]')?.setAttribute("content", `${title} - ${description}`);
            document.querySelector('meta[name="keywords"]')?.setAttribute("content", `${title},${keywords}`);
        }
    }, [title]);
      
    return (
        <section className={styles['mm-blog-item']}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html: body}}/>
        </section>
    );
};
