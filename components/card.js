import styles from "../styles/index.module.css";
import Link from "next/link";
import {Text} from "../pages/[id]";

export const Card = ({post, date}) => {
    return <li className="shadow-card p-12 rounded-md mb-12">
        <h1 className="text-right">{post.properties.Burger_Rating ? post.properties.Burger_Rating.number : ''}</h1>
        <h3>
            <Link href={`/${post.id}`}>
                <a>
                    <Text text={post.properties.Restaurant.title}/>
                </a>
            </Link>
        </h3>
        <div className="flex content-between">
            <p className="font-display font-bold w-full">{date}</p>

            <Link href={`/${post.id}`}>
                <a className="font-display font-bold w-full text-black text-right">Weiterlesen →</a>
            </Link>
        </div>
    </li>
}