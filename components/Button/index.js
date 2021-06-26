const Button = ({ text, handleClick, name, children }) => {
    return (
        <>
            <div className="button-container">
                <div className="button-shadow">
                    <button
                        onClick={(e) => {
                            if (handleClick !== undefined) handleClick(e)
                        }}
                        className="button"
                    >
                        {children}
                    </button>
                </div>
            </div>
            <style jsx>{`
                .button-container {
                }
                .button {
                    transition: all 0.2s ease 0s;
                    cursor: pointer;
                    justify-content: center;
                    border: medium none;
                    text-transform: uppercase;
                    outline: currentcolor none medium;
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 1.5;
                    padding: 5px 20px;
                    background: rgb(255, 242, 64) none repeat scroll 0% 0%;
                    transition: all 0.2s ease 0s;
                }
                .button:hover {
                }
                .button:active {
                    background-color: rgb(0, 0, 0);
                    color: rgb(255, 255, 255);
                }
            `}</style>
        </>
    )
}

export default Button
