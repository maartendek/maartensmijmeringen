import styles from "../../page.module.css";
import { Header } from "@/components/header/header";
import { Blog, BlogItem, BlogMenu, BlogSearch } from "@/components/blog";
import { Footer } from "@/components/footer/footer";
import { getBlogs } from "@/api/rest";
import { Suspense } from "react";

export async function generateStaticParams() {
    const blogs = await getBlogs();
   
    return blogs?.map((b: Blog) => ({
        slug: b.slug!,
    }))
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {
    const blogs: Blog[] = await getBlogs();
    const blog: Blog | undefined = blogs ? blogs.find(blog => blog.slug === params.slug) : undefined;
    return (
        <main className={styles.main}>
            <Header />
            { blogs && blog && (
                <>
                    <div className={styles.content}>
                        <BlogItem title={blog.title}
                            body={blog.html}
                            published={blog.published} 
                            image=""
                            slug={blog.slug} />
              
                        <aside>
                            <BlogMenu blogs={blogs} slug={params.slug}></BlogMenu>
                            <Suspense>
                                <BlogSearch blogs={blogs}></BlogSearch>
                            </Suspense>
                        </aside>
                    </div>
                    <Footer date={blog.published} />
                </>)}
        </main>
    );
};

export default BlogPage;
