import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "@/components/header/header";
import { BlogItem, BlogMenu } from "@/components/blog";
import { Footer } from "@/components/footer/footer";
import { getBlogs } from "@/api/rest";
import { Blog } from "@/api/types";

const Home = async () => {
    const blogs: Blog[] = await getBlogs();
    const blog: Blog | undefined = blogs ? blogs[0] : undefined;
    console.log('SSS', blogs)
    return (
        <main className={styles.main}>
            <Header />
            { blogs && blog && (
                <>
                    <div className={styles.content}>
                        { blog && (
                            <BlogItem title={blog.title}
                                body={blog.html}
                                published={blog.published} 
                                image=""
                                slug={blog.slug} />
                        )}
                        <aside>
                            <BlogMenu slug={blog.slug} blogs={blogs}></BlogMenu>
                        </aside>
                    </div>
                    <Footer date={blog.published} />
                </>
            )}
        </main>
    );
};

export default Home;
