const { Client } = require('@notionhq/client');
const dotenv = require("dotenv")
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });


// (async () => {
//     const databaseId = '0b8e5ad4e98b4e0eb091f9a326bc22a0';
//     const response = await notion.databases.query({
//         database_id: databaseId });
//     console.log(JSON.stringify(response));
// })();

export async function getSortedPostsData() {

    const databaseId = '0b8e5ad4e98b4e0eb091f9a326bc22a0';
    const data = await notion.databases.query(
        {database_id: databaseId})

    return { data }
}