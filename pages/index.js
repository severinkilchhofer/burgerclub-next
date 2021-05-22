import Head from 'next/head'
import Link from 'next/link'
import Layout, {siteTitle} from '../components/layout'
import {getSortedPostsData} from "../lib/posts";

export async function getServerSideProps(context) {
    const notionData = getSortedPostsData()
    let result = notionData.then(function (item) {
        return item.data
    });
    return {
        props: {
            res: await result
        }
    }
}

export default function Home({res}) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            {console.log(res.results)}

            <section>
                {res.results.map((item, index) => {
                    return <li className="text-2xl text-blue-500" key={index}>{item.properties.Name.title.length !== 0 ? item.properties.Name.title[0].text.content : ''}</li>
                })}

                <Link href="/posts/first-post">
                    <a>Blog Post</a>
                </Link>
            </section>
        </Layout>
    )
}