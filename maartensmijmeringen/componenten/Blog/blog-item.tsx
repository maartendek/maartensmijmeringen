import { FC } from "react";
import Image from "next/image";
import styles from './blog-item.module.css';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export type BlogItemProps = {
  body: any;
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
            <BlocksRenderer content={body} />
        </section>
    );
};
