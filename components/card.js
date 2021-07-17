import styles from "../styles/index.module.css";
import Link from "next/link";
import {Text} from "../pages/[id]";

export const Card = ({post, date}) => {
    return <li className={styles.post}>
        <h3 className={styles.postTitle}>
            <Link href={`/${post.id}`}>
                <a>
                    <Text text={post.properties.Restaurant.title}/>
                </a>
            </Link>
        </h3>

        <p className={styles.postDescription}>{date}</p>
        <Link href={`/${post.id}`}>
            <a> Read post →</a>
        </Link>
    </li>
}