import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "@/componenten/header/header";
import { BlogItem, BlogItemProps } from "@/componenten/blog";
import { Footer } from "@/componenten/footer/footer";
import { getBlogs } from "@/api/rest";
import { BlogMenu } from "@/componenten/blog/blog-menu";

const Home = async () => {
    const blogs = await getBlogs();
    console.log('XXX', JSON.stringify(blogs.props.blogs[0].attributes));
    const blog = blogs.props.blogs[0].attributes;
    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.content}>
                { blog && (
                    <BlogItem title={blog.title}
                        body={blog.body}
                        published={blog.published} 
                        image=""
                        slug={blog.slug} />
                )}
                <aside>
                    <BlogMenu blogs={blogs.props.blogs}></BlogMenu>
                </aside>
            </div>
            <Footer />
        </main>
    );
};

export default Home;
