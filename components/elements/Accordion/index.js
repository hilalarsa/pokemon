import React, { useState } from 'react'
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'

const Accordion = ({ headerText, children, ownedAmount }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <div
                onClick={() => setExpanded(!expanded)}
                className="flex accordion-container"
            >
                <button
                    className="accordion-button"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? <AiOutlineUp /> : <AiOutlineDown />}
                </button>

                <div className="flex header-text pixeltext">
                    <div>{headerText}</div>
                    <div className="amount">{ownedAmount}</div>
                </div>
            </div>
            <div className="">{expanded && children}</div>
            <style jsx>{`
                .accordion-container{
                    padding: 6px;
                    cursor: pointer;
                    background-color: white;
                    border-radius: 2px;
                }
                .accordion-button{
                    background: transparent;
                    margin-right: 12px;
                    text-transform: uppercase;
                    border: medium none;
                }
                .header-text{
                    font-size: 12px;
                    color: black;
                    flex-grow: 1;
                    justify-content: space-between;
                    align-items: center;
                }
                .amount{
                    background-color: #FF9F1C;
                    border-radius: 25%;
                    padding: 6px;
                }
          .
          `}</style>
        </>
    )
}

export default Accordion
