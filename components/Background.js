import Head from 'next/head'
import '../static/styles/background.scss'

const Background = () => (
    <div className="background">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <link
                rel="stylesheet"
                href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
            />
        </Head>
    </div>
)

export default Background