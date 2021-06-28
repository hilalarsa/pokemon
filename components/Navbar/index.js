import { jsx, css } from '@emotion/react'
import { useRouter } from 'next/router'
import Button from '../Button'

const Navbar = () => {
    const router = useRouter()
    const handleRedirect = (href) => {
        router.push(href)
    }
    return (
        <>
            <div className="navbar-container">
                <div onClick={() => handleRedirect('/')}>
                    <img src="/pokemon-logo.png" width="75px" height="100%" />
                </div>
                <div className="normaltext">
                    <Button handleClick={() => handleRedirect('/my-pokemon')}>
                        <div className="normaltext">My Pokemon</div>
                    </Button>
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
                        box-shadow: 0px 15px 20px #3b4cca;
                    }
                `}
            </style>
        </>
    )
}

export default Navbar
