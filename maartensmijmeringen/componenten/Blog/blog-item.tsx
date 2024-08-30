import { FC } from "react";
import Image from "next/image";
import styles from './blog-item.module.css';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export type BlogItemProps = {
  body: string;
  image?: string;
  published: string;
  slug: string;
  title: string;
  updated?: string;
};

export const BlogItem: FC<BlogItemProps> = ({ title, body }) => {
    return (
        <section className={styles['mm-blog-item']}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html: body}}/>
        </section>
    );
};
