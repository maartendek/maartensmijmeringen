import styles from "../../page.module.css";
import { Header } from "@/componenten/header/header";
import { BlogItem, BlogMenu } from "@/componenten/blog";
import { Footer } from "@/componenten/footer/footer";
import { getBlogs } from "@/api/rest";

export async function generateStaticParams() {
    const blogs = await getBlogs();
   
    return blogs.props.blogs.map((post) => ({
        slug: post.attributes.slug,
    }))
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {
    const blogs = await getBlogs();

    const blog = blogs.props.blogs.find(blog => blog.attributes.slug === params.slug);

    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.content}>
                { blog && (
                    <BlogItem title={blog.attributes.title}
                        body={blog.attributes.html}
                        published={blog.attributes.published} 
                        image=""
                        slug={blog.attributes.slug} />
                )}
                <aside>
                    <BlogMenu blogs={blogs.props.blogs} slug={params.slug}></BlogMenu>
                </aside>
            </div>
            <Footer date={blog?.attributes.published} />
        </main>
    );
};

export default BlogPage;
