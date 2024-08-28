import { FC } from "react";
import Image from "next/image";
import styles from './blog-item.module.css';

export type BlogItemProps = {
  body: string;
  date: string;
  image: string;
  link: string;
  title: string;
};

export const BlogItem: FC<BlogItemProps> = ({ title, body }) => {
    return (
        <section className={styles['mm-blog-item']}>
            <h1>{title}</h1>
            {body}
        </section>
    );
};
