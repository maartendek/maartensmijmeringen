import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "@/components/header/header";
import { BlogItem, BlogMenu, Blog, BlogSearch } from "@/components/blog";
import { Footer } from "@/components/footer/footer";
import { getBlogs } from "@/api/rest";
import { Suspense } from "react";

const Home = async () => {
    const blogs: Blog[] = await getBlogs();
    const blog: Blog | undefined = blogs ? blogs[0] : undefined;
    
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
                            <Suspense>
                                <BlogSearch blogs={blogs}></BlogSearch>
                            </Suspense>
                        </aside>
                    </div>
                    <Footer date={blog.published} />
                </>
            )}
        </main>
    );
};

export default Home;
