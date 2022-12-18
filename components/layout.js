import Head from 'next/head'
import Footer from "./footer";

const name = 'Sevi'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({children, title}) {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            <Head>
                <title>{title}</title>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <main>{children}</main>
            <Footer/>
        </div>
    )
}