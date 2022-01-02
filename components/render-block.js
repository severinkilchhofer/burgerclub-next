import {Text} from "./text";
import {Fragment} from "react";

export const renderBlock = (block) => {
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