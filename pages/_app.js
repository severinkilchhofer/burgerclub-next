import '../styles/global.css'
import NextNProgress from 'nextjs-progressbar';

export default function App({Component, pageProps}) {
    return (
        <>
            <NextNProgress color="#000" options={{showSpinner: false}}/>
            <Component {...pageProps} />
        </>
    )
}