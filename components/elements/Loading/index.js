const Loading = ({ text = '' }) => {
    return (
        <>
            <div className="loading">{text}</div>
            <style jsx>{`
                /* loading dots */
                loading {
                    color: white;
                    text-align: center;
                }

                .loading:after {
                    content: ' .';
                    animation: dots 2s steps(5, end) infinite;
                }

                @keyframes dots {
                    0%,
                    20% {
                        color: rgba(0, 0, 0, 0);
                        text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0),
                            0.5em 0 0 rgba(0, 0, 0, 0);
                    }
                    40% {
                        color: white;
                        text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0),
                            0.5em 0 0 rgba(0, 0, 0, 0);
                    }
                    60% {
                        text-shadow: 0.25em 0 0 white,
                            0.5em 0 0 rgba(0, 0, 0, 0);
                    }
                    80%,
                    100% {
                        text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
                    }
                }
            `}</style>
        </>
    )
}

export default Loading