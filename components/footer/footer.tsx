import { FC } from "react";
import styles from "./footer.module.css";

export type FooterProps = {
    date?: string
}

export const Footer: FC<FooterProps> = ({ date }) => {
    let dateRender;

    if (date) {
        const mydate = new Date(date);
        dateRender = <>
            op {mydate.toLocaleDateString()}
        </>
    }
    
    return (
        <footer className={styles.footer}>
            Door Maarten Dekker {
                date && dateRender
            }
            
            <div>
                <a href="https://www.linkedin.com/in/maartendek" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/maartendek" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                </a>
            </div>
        </footer>
    );
};
