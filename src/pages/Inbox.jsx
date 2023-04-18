import "./css/Inbox.css"
import { useState, useEffect } from "react"
import { IoMdArrowDropdown } from "react-icons/io"
import { BsCheck2 } from "react-icons/bs"
import MessageIcon from "../assets/Header/Inbox.png"
import ConversationsIcon from "../assets/ConversationsIcon.png"
import FireIcon from "../assets/Header/Spam.png"
import DeleteIcon from "../assets/Header/Trash.png"
import BucketIcon from "../assets/Header/Bucket.png"
import FolderIcon from "../assets/Header/Folder.png"
import LabelIcon from "../assets/Header/Label.png"
import ArrowIcon from "../assets/Arrow.png"
import MailboxHover from "../assets/Hover/Mailbox.png"
import SpamHover from "../assets/Hover/Spam.png"
import TrashHover from "../assets/Hover/Trash.png"
import BucketHover from "../assets/Hover/Bucket.png"
import LabelHover from "../assets/Hover/Label.png"
import FolderHover from "../assets/Hover/Folder.png"

const Inbox = ({ username }) => {
    const [checkbox, setCheckbox] = useState(false)
    const [activeRead, setActiveRead] = useState(0)
    const [messages, setMessages] = useState([])
    const [activeCheckbox, setActiveCheckbox] = useState(false)

    const messageSelector = ["All", "Read", "Unread"]
    const headerButtons = [MessageIcon, DeleteIcon, BucketIcon, FireIcon, FolderIcon, LabelIcon]
    const headerButtonsHovered = [MailboxHover, TrashHover, BucketHover, SpamHover, FolderHover, LabelHover]

    const database = [
        {
            id: 1,
            from: "Adguard",
            message: "Confirm e-mail to use adguard account",
            date: "Yesterday",
            read: "unread"
        },
        {
            id: 2,
            from: "Instagram",
            message: "Your email confirmation code",
            date: "Apr 14, 2023",
            read: "unread"
        },
        {
            id: 3,
            from: "Proton",
            message: "Improve your account security",
            date: "Apr 14, 2023",
            read: "read"
        },
        {
            id: 4,
            from: "Proton",
            message: "Get more out of your inbox",
            date: "Apr 12, 2023",
            read: "unread"
        }
    ]
    
    useEffect(() => {
        if (activeRead === 0) {
            setMessages(database)
        } else {
            setMessages(database.filter(message => {
                return message.read === messageSelector[activeRead].toLowerCase()
            }))
        }
    }, [activeRead])

    return (
        <div className="_7ohc">
            <div className="sacrum-pass">
                <div className="header">
                    <div className={checkbox ? "checkbox active" : "checkbox"}
                        onClick={() => setCheckbox(prev => !prev)}
                    >
                        {checkbox ? <BsCheck2 /> : undefined}
                    </div>
                    <IoMdArrowDropdown />
                    {checkbox ? (
                        <div className="highs-kit">
                            {headerButtons.map((item, index) => {
                                return (
                                    <div key={index}
                                        className={activeCheckbox === index ? "hovered" : undefined}
                                        onMouseEnter={() => setActiveCheckbox(index)}
                                        onMouseLeave={() => setActiveCheckbox(false)}
                                    >
                                        <img src={activeCheckbox === index ? headerButtonsHovered[activeCheckbox] : item} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    ) : undefined}
                </div>
                <div className="container">
                    <div>
                        <div className="pryers-seas">
                            <div>
                                {messageSelector.map((item, index) => {
                                    return <button 
                                            key={index}
                                            onClick={() => setActiveRead(index)} 
                                            className={activeRead === index ? "active" : undefined}
                                    >{item}
                                    </button>
                                })}
                            </div>
                            <div>
                                <button>
                                    Newest first
                                    <img src={ArrowIcon} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="message-container">
                            {messages.map(item => {
                                return (
                                    <div key={item.id} className={item.read === "unread" ? "toked-brin" : "across-wash toked-brin"}>
                                        <div className="voidness-bam">
                                            {checkbox === true ? (
                                                <div className="wangle-bit avatar">
                                                    <BsCheck2 />
                                                </div>
                                            ) : (
                                                <div className="avatar">
                                                    {item.from[0]}
                                                </div>
                                            )}
                                            <div className="appeared-hut">
                                                <h3>{item.from}</h3>
                                                <span>{item.message}</span>
                                            </div>
                                            <div className="subnode-ten">
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="canned-copy">
                        <div>
                            <h1>Welcome {username[0].toUpperCase()}{username.slice(1,)}</h1>
                            <span>You have <strong>3 unread conversations</strong> in your inbox.</span>
                            <img src={ConversationsIcon} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inbox
