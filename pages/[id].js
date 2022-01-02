import {Fragment} from "react";
import {getBlocks, getDatabase, getPage} from "../lib/notion";
import Link from "next/link";
import {BarDatabaseId, RestaurantDatabaseId} from "./index.js";
import Layout from "../components/layout";
import {Text} from "../components/text";
import {renderBlock} from "../components/render-block";

export default function Post({restaurant, restaurantBlocks, bar, barBlocks}) {
    if (!restaurant || !restaurantBlocks) {
        return <div/>;
    }
    return (
        <div>
            <Layout title={restaurant.properties.Restaurant.title[0].plain_text}>
                <article className="container mx-auto px-4 sm:px-16 md:px-32 lg:px-64 max-w-7xl">
                    <div
                        className="snap-x lg:snap-none snap-mandatory overflow-x-scroll lg:overflow-x-hidden flex flex-row lg:block">
                        <section className="snap-center shrink-0 w-full h-auto">
                            <h1 className="pt-12 pb-4 md:pt-16">
                                <Text text={restaurant.properties.Restaurant.title}/>
                            </h1>
                            {restaurantBlocks.map((block) => (
                                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                            ))}
                            <Link href="/">
                                <a className="block py-8 font-display font-bold text-black">Bar</a>
                            </Link>
                        </section>
                        <section className="snap-center shrink-0 w-full h-auto">
                            <h1 className="pt-12 pb-4 md:pt-16">
                                <Text text={bar.properties.Name.title}/>
                            </h1>
                            {barBlocks.map((block) => (
                                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                            ))}
                        </section>

                    </div>
                    <Link href="/">
                        <a className="block py-8 font-display font-bold text-black">← Übersicht</a>
                    </Link>
                </article>
            </Layout>
        </div>
    );
}

export async function getStaticPaths() {
    const restaurantDatabase = await getDatabase(RestaurantDatabaseId);
    return {
        paths: restaurantDatabase.map((restaurant) => {
            return {params: {id: restaurant.id}}
        }),
        fallback: false,
    };
}

export const getStaticProps = async (context) => {
    const {id} = context.params;
    const restaurant = await getPage(id);
    const barDatabase = await getDatabase(BarDatabaseId);
    const bar = barDatabase.find(item => item.properties.Related_to_Restaurant.relation[0].id === restaurant.id)
    const restaurantBlocks = await getBlocks(id);
    const barBlocks = await getBlocks(bar.id);

    // Retrieve block children for nested blocks (one level deep), for example toggle blocks
    // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks

    async function receiveChildBlocks(blocks) {
        const childBlocks = await Promise.all(
            blocks
                .filter((block) => block.has_children)
                .map(async (block) => {
                    return {
                        id: block.id,
                        children: await getBlocks(block.id),
                    };
                })
        );
        return blocks.map((block) => {
            // Add child blocks if the block should contain children but none exists
            if (block.has_children && !block[block.type].children) {
                block[block.type]["children"] = childBlocks.find(
                    (x) => x.id === block.id
                )?.children;
            }
            return block;
        });
    }

    return {
        props: {
            restaurant,
            bar,
            restaurantBlocks: await receiveChildBlocks(restaurantBlocks),
            barBlocks: await receiveChildBlocks(barBlocks),
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 1 second
        revalidate: 1,
    };
};