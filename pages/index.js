import {getDatabase} from "../lib/notion";
import styles from "../styles/index.module.css";
import {Card} from "../components/card";
import Layout from "../components/layout";
import PreviousRestaurants from "../components/previous-restaurants";

export const RestaurantDatabaseId = process.env.NOTION_RESTAURANT_DATABASE_ID;
export const BarDatabaseId = process.env.NOTION_BAR_DATABASE_ID;

export default function Home({restaurants, bars}) {
    return (
        <div>
            <Layout title={'Burgerclub Zurich'}>
                <div className="container mx-auto px-4 sm:px-16 md:px-32 lg:px-64 max-w-7xl">
                    <header className="container max-w-2xl m-auto py-16 sm:py-24">
                        <h1>Burgerclub Zurich</h1>
                        <p className="pt-8">Hier findest du die Besten Burger in Zürich,
                            welche von einer Fachjury ausgezeichnet und bewertet wurden.</p>
                    </header>

                    <h2 className="text-center mb-12">Restaurants</h2>

                    <ol className="container max-w-2xl m-auto">
                        {restaurants.map((restaurant) => {
                            const date = new Date(restaurant.created_time).toLocaleString(
                                "de-DE",
                                {
                                    month: "long",
                                    year: "numeric",
                                }
                                // day: "2-digit",
                            );
                            return (
                                <Card key={restaurant.id} restaurant={restaurant} date={date}/>
                            );
                        })}
                    </ol>
                    <PreviousRestaurants/>
                </div>
            </Layout>
        </div>
    );
}

export const getServerSideProps = async () => {
    const restaurantDatabase = await getDatabase(RestaurantDatabaseId);
    const barDatabase = await getDatabase(BarDatabaseId);
    return {
        props: {
            restaurants: restaurantDatabase,
            bars: barDatabase
        },
    };
};