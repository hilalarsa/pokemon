import { jsx, css } from '@emotion/react'

const Navbar = () => {
    return (
        <>
            <div className="navbar-container">
                <div>
                    <a href="/" target="#">
                        <img
                            src="/pokemon-logo.png"
                            width="75px"
                            height="100%"
                        />
                    </a>
                </div>
                <div>
                    <a href="/" target="#">
                        My Pokemon
                    </a>
                </div>
            </div>
            <style jsx>
                {`
                    .navbar-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem;
                        background-color: #ffde00;
                        color: white;
                        overflow: hidden;
                    }
                `}
            </style>
        </>
    )
}

export default Navbar
