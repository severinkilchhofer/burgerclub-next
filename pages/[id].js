import {Fragment} from "react";
import {getBlocks, getDatabase, getPage} from "../lib/notion";
import Link from "next/link";
import {BarDatabaseId, RestaurantDatabaseId} from "./index.js";
import styles from "../styles/post.module.css";
import Layout from "../components/layout";

export const Text = ({text}) => {
    if (!text) {
        return null;
    }
    return text.map((value) => {
        const {
            annotations: {bold, code, color, italic, strikethrough, underline},
            text,
        } = value;
        return (
            <span
                className={[
                    bold ? styles.bold : "",
                    code ? styles.code : "",
                    italic ? styles.italic : "",
                    strikethrough ? styles.strikethrough : "",
                    underline ? styles.underline : "",
                ].join(" ")}
                style={color !== "default" ? {color} : {}}
            >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
        );
    });
};

const renderBlock = (block) => {
    const {type, id} = block;
    const value = block[type];

    switch (type) {
        case "paragraph":
            return (
                <p>
                    <Text text={value.text}/>
                </p>
            );
        case "heading_1":
            return (
                <h1>
                    <Text text={value.text}/>
                </h1>
            );
        case "heading_2":
            return (
                <h2>
                    <Text text={value.text}/>
                </h2>
            );
        case "heading_3":
            return (
                <h3>
                    <Text text={value.text}/>
                </h3>
            );
        case "bulleted_list_item":
        case "numbered_list_item":
            return (
                <li>
                    <Text text={value.text}/>
                </li>
            );
        case "to_do":
            return (
                <div>
                    <label htmlFor={id}>
                        <input type="checkbox" id={id} defaultChecked={value.checked}/>{" "}
                        <Text text={value.text}/>
                    </label>
                </div>
            );
        case "toggle":
            return (
                <details>
                    <summary>
                        <Text text={value.text}/>
                    </summary>
                    {value.children?.map((block) => (
                        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                    ))}
                </details>
            );
        case "child_page":
            return <p>{value.title}</p>;
        case "image":
            const src = value.type === "external" ? value.external.url : value.file.url;
            const caption = value.caption === [] ? value.caption[0].plain_text : "";
            return (
                <figure>
                    <img src={src} alt={caption}/>
                    {caption && <figcaption>{caption}</figcaption>}
                </figure>
            );
        default:
            return ``;
    }
};

export default function Post({restaurant, blocks, bar}) {
    if (!restaurant || !blocks) {
        return <div/>;
    }
    return (
        <div>
            <Layout title={restaurant.properties.Restaurant.title[0].plain_text}>
                <article className="container mx-auto px-4 sm:px-16 md:px-32 lg:px-64 max-w-7xl">
                    <h1 className="pt-12 pb-4 md:pt-16">
                        <Text text={restaurant.properties.Restaurant.title}/>
                    </h1>
                    <p>
                        Bar: <Text text={bar.properties.Name.title}/>
                    </p>
                    <section>
                        {blocks.map((block) => (
                            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                        ))}
                        <Link href="/">
                            <a className="block py-8 font-display font-bold text-black">Bar</a>
                        </Link>
                        <Link href="/">
                            <a className="block py-8 font-display font-bold text-black">← Übersicht</a>
                        </Link>
                    </section>
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
    const blocks = await getBlocks(id);

    // Retrieve block children for nested blocks (one level deep), for example toggle blocks
    // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
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
    const blocksWithChildren = blocks.map((block) => {
        // Add child blocks if the block should contain children but none exists
        if (block.has_children && !block[block.type].children) {
            block[block.type]["children"] = childBlocks.find(
                (x) => x.id === block.id
            )?.children;
        }
        return block;
    });

    return {
        props: {
            restaurant,
            bar,
            blocks: blocksWithChildren,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 1 second
        revalidate: 1,
    };
};