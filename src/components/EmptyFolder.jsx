import "./css/EmptyFolder.css"
import { IoMdArrowDropdown } from "react-icons/io"
import ArrowIcon from "../assets/Arrow.png"
import OpenMailboxIcon from "../assets/OpenMailbox.png"
import SearchIcon from "../assets/SearchIcon.png"
import { useState } from "react"

const EmptyFolder = () => {
    const [active, setActive] = useState(0)

    const buttons = ["All", "Read", "Unread"]

    return (
        <div className="_5fhr">
            <div className="footing-ors">
                <div className="header">
                    <div className="checkbox"></div>
                    <IoMdArrowDropdown />
                </div>
                <div className="baaskaps-fled">
                    <div>
                        {buttons.map((item, index) => {
                            return <button 
                                    key={index}
                                    className={index === active ? "active" : undefined}
                                    onClick={() => setActive(index)}
                                >{item}</button>
                        })}
                    </div>
                    <div className="acers-hid">
                        Newest first
                        <img src={ArrowIcon} alt="" />
                    </div>
                </div>
                <div className="ropiness-ales">
                    <img src={active === 2 ? OpenMailboxIcon : SearchIcon} alt="" />
                    <h2>No messages found</h2>
                    <span>You do not have any messages here</span>
                </div>
            </div>
        </div>
    )
}

export default EmptyFolder
