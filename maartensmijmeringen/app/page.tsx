import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "@/componenten/header/header";
import { BlogItem } from "@/componenten/Blog/blog-item";

const myTitle:string = "Test title";
const myBody: string = "My body text";

export default function Home() {
    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.content}>
                <BlogItem title={myTitle}
                    body={myBody}
                    date={Date.now().toLocaleString()} 
                    image=""
                    link="blog" />
                <aside>
                    Menu
                </aside>
            </div>
        </main>
    );
}
