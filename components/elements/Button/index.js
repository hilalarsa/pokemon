const Button = ({ handleClick, children, disabled = false }) => {
    return (
        <>
            <button
                onClick={(e) => {
                    if (handleClick !== undefined && !disabled) handleClick(e)
                }}
                className="button normaltext zoomhover"
                disabled={disabled}
            >
                {children}
            </button>
            <style jsx>{`
                .button {
                    cursor: pointer;
                    justify-content: center;
                    border: medium none;
                    text-transform: uppercase;
                    outline: currentcolor none medium;
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 1.5;
                    padding: 5px 20px;
                    background-color: rgb(255, 242, 64);
                    transition: all 0.2s ease 0s;
                    border-radius: 2%;
                }
            `}</style>
        </>
    )
}

export default Button
