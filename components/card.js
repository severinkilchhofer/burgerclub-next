import Link from "next/link";
import {Text} from "./text";

export const Card = ({restaurant, date}) => {
    return <Link href={`/${restaurant.id}`} className="hover:no-underline text-black group">
        <li className="shadow-card px-6 md:px-12 py-6 md:py-6 rounded-md mb-12 cursor-pointer md:transition md:duration-500 md:ease-in-out md:transform md:hover:-translate-y-1 md:hover:scale-105">
            <div className="flex content-between items-baseline">
                {restaurant.icon ? <img src={restaurant.icon.file.url} alt="Restaurant Logo" className="w-6/12 md:w-3/12"/>
                    : <h3 className="w-full"><Text text={restaurant.properties.Restaurant.title}/></h3>
                }
                <h1 className="w-full text-right">{restaurant.properties.Burger_Rating ? restaurant.properties.Burger_Rating.number : ''}</h1>
            </div>
            <p className="pb-2">
                <Text text={restaurant.properties.Description.rich_text}/>
            </p>
            <div className="flex justify-between">
                <p className="font-display font-bold">{date}</p>
                <p className="font-display group-hover:font-bold group-hover:transition-all">&nbsp;→</p>
            </div>
        </li>
    </Link>
}