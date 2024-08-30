import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "@/componenten/header/header";
import { BlogItem, BlogMenu } from "@/componenten/blog";
import { Footer } from "@/componenten/footer/footer";
import { getBlogs } from "@/api/rest";

const Home = async () => {
    const blogs = await getBlogs();
    const blog = blogs.props.blogs[0].attributes;
    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.content}>
                { blog && (
                    <BlogItem title={blog.title}
                        body={blog.html}
                        published={blog.published} 
                        image=""
                        slug={blog.slug} />
                )}
                <aside>
                    <BlogMenu slug={blog.slug} blogs={blogs.props.blogs}></BlogMenu>
                </aside>
            </div>
            <Footer />
        </main>
    );
};

export default Home;
