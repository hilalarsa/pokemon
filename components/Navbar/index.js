import { jsx, css } from '@emotion/react'
import { useRouter } from 'next/router'
import Button from '../Button'
import Image from 'next/image'

import { AiOutlineArrowLeft } from 'react-icons/ai'

const Navbar = () => {
    const router = useRouter()
    const handleRedirect = (href) => {
        router.push(href)
    }
    return (
        <>
            <div className="navbar-container">
                <div onClick={() => handleRedirect('/')}>
                    {router.pathname == '/' ? (
                        <div className="image-container pointer zoomhover">
                            <Image
                                src="/pokemon-logo.png"
                                width={75}
                                height={25}
                                alt="Logo"
                                quality={25}
                            />
                        </div>
                    ) : (
                        <AiOutlineArrowLeft
                            size={24}
                            className="pointer"
                            color="black"
                        />
                    )}
                </div>
                <div className="normaltext zoomhover">
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
                        background-color: #ffcb47;
                        color: white;
                        overflow: hidden;
                    }
                    .image-container {
                        width: 75px;
                        height: 100%;
                    }
                `}
            </style>
        </>
    )
}

export default Navbar
