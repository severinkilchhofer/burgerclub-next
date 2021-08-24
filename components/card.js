import Link from "next/link";
import {Text} from "../pages/[id]";

export const Card = ({post, date}) => {
    return <Link href={`/${post.id}`}>
        <li className="shadow-card px-12 py-6 rounded-md mb-12 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <div className="flex content-between items-baseline	">
                <h3 className="w-full text-blue-500">
                    <Text text={post.properties.Restaurant.title}/>
                </h3>
                <h1 className="w-full text-right">{post.properties.Burger_Rating ? post.properties.Burger_Rating.number : ''}</h1>
            </div>
            <p className="pb-2">
                <Text text={post.properties.Description.rich_text}/>
            </p>
            <div className="flex content-between">
                <p className="font-display font-bold w-full">{date}</p>

                <Link href={`/${post.id}`}>
                    <a className="font-display font-bold w-full text-black text-right">Weiterlesen →</a>
                </Link>
            </div>
        </li>
    </Link>
}