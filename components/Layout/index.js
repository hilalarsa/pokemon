import Navbar from '../Navbar'
import Head from 'next/head'

const Layout = ({ children }) => {
    return (
        <>
            <div>
                <Head>
                    <title>Pokedex</title>
                    <meta
                        name="description"
                        content="Pokedex, pokemon index for your adventure!"
                    />
                    <link rel="icon" href="/pokemon-icon.ico" />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossorigin
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <Navbar></Navbar>
                <div className="layout-color">{children}</div>
                <style jsx>{`
                    .layout-color {
                        padding: 12px;
                    }
                `}</style>
            </div>
        </>
    )
}

export default Layout
