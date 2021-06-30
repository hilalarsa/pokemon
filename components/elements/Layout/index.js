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
