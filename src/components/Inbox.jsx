import "./css/Inbox.css"
import { useState, useEffect } from "react"
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io"
import { BiChevronDown } from "react-icons/bi"
import { RiLockFill } from "react-icons/ri"
import { BsCheck2 } from "react-icons/bs"
import { MdOutlineMarkunread } from "react-icons/md"
import MessageIcon from "../assets/Header/Inbox.png"
import ConversationsIcon from "../assets/ConversationsIcon.png"
import ConversationImage from "../assets/ConversationImage.png"
import StarIcon from "../assets/StarIcon.png"
import StarFilled from "../assets/StarFilled.png"
import FireIcon from "../assets/Header/Spam.png"
import DeleteIcon from "../assets/Header/Trash.png"
import BucketIcon from "../assets/Header/Bucket.png"
import FolderIcon from "../assets/Header/Folder.png"
import LabelIcon from "../assets/Header/Label.png"
import ArrowIcon from "../assets/Arrow.png"
import MailboxHover from "../assets/Hover/Mailbox.png"
import SpamHover from "../assets/Hover/Fire.png"
import TrashHover from "../assets/Hover/Delete.png"
import BucketHover from "../assets/Hover/Bucket.png"
import LabelHover from "../assets/Hover/Label.png"
import FolderHover from "../assets/Hover/Folder.png"
import BucketBlue from "../assets/Blue/Archive.png"
import TrashBlue from "../assets/Blue/Trash.png"
import StarBlue from "../assets/Blue/Star.png"
import StarFilledBlue from "../assets/Blue/StarFilled.png"
import InvertedMailbox from "../assets/Blue/MailboxInverted.png"
import ReplyIcon from "../assets/ReplyIcon.png"
import ReplyAllIcon from "../assets/ReplyAllIcon.png"
import ForwardIcon from "../assets/ForwardIcon.png"
import axios from "axios"
import api from "../config/backend"

const Inbox = ({ username, unread, setUnread, setStarred, sidebar, database, setDatabase }) => {
    const [checkbox, setCheckbox] = useState(false)
    const [activeRead, setActiveRead] = useState(0)
    const [messages, setMessages] = useState([])
    const [activeCheckbox, setActiveCheckbox] = useState(false)
    const [activeMessage, setActiveMessage] = useState(false)
    const [token, setToken] = useState(undefined)
    const [notification, setNotification] = useState(undefined)
    const [undoAction, setUndoAction] = useState(undefined)
    const [openedEmail, setOpenedEmail] = useState(undefined)

    const messageSelector = ["All", "Read", "Unread"]
    const sidebarNames = ["Inbox", "Drafts", "Sent", "Starred", "Archive", "Spam", "Trash", "All mail"]
    const headerButtons = [MessageIcon, DeleteIcon, BucketIcon, FireIcon, FolderIcon, LabelIcon]
    const headerButtonsHovered = [MailboxHover, TrashHover, BucketHover, SpamHover, FolderHover, LabelHover]

    const selectedEmail = messages.find(item => item.hash === openedEmail)
    const selectedEmailTime = selectedEmail ? selectedEmail.date.split("T")[1].slice(0,5) : undefined
    const [timeHour, timeMinutes] = selectedEmailTime ? selectedEmailTime.split(":") : [undefined, undefined]
    const emailTimeFormatted  = Number(timeHour) > 12 ? Number(timeHour) - 12 + ":" + timeMinutes + " PM": selectedEmailTime + " AM"
    
    useEffect(() => {
        setToken(localStorage.getItem("token"))

        // Inbox
        if (sidebar === 0 && database.length) {
            // Ignores previous fetched databse of other location
            if (database[0].location === "Inbox") {
                // Set unread messages count
                const notread = database.filter(message => message.read === false)

                setUnread(notread.length)

                // Set starred count
                const starred = database.filter(message => message.starred === true)
                
                setStarred(starred.length)
            }
        }

        // Filter read or unread messages
        if (activeRead === 0) {
            setMessages(database)
        } else {
            setMessages(database.filter(message => {
                return activeRead === 1 ? message.read === true : message.read === false
            }))
        }
    }, [activeRead, database, sidebar])

    useEffect(() => {
        let timeout

        if (notification) {
            timeout = setTimeout(() => {
                setNotification(undefined)
            }, 5000)
        }

        return () => clearTimeout(timeout)
    }, [notification])

    // Mark as read
    useEffect(() => {
        if (openedEmail) {
            let isAlreadyRead = false

            setDatabase(prev => {
                const copy = [...prev]
                const match = copy.find(item => item.hash === openedEmail)
                isAlreadyRead = match.read === true ? true : false
                match.read = true
                return copy
            })

            const init = async () => {
                const response = await axios.post(`${api}/toggle-read`, {
                    token, 
                    hash: openedEmail, 
                    read: true
                })
            }

            if (isAlreadyRead === false) {
                init()
            }
        }
    }, [openedEmail])

    const options = { year: 'numeric', month: 'long', day: 'numeric' }

    const handleRead = async (index, hash, read) => {
        setDatabase(prev => {
            const copy = [...prev]
            copy[index].read = read
            return copy
        })

        const response = await axios.post(`${api}/toggle-read`, {token, hash, read})

        // Todo: add notification for success or failure
    }

    const handleStarred = async (index, hash, starred) => {
        setDatabase(prev => {
            const copy = [...prev]
            copy[index].starred = !starred
            return copy
        })

        await axios.post(`${api}/toggle-starred`, {token, hash, starred})
    }

    const handleDelete = async (hash, from) => {
        setDatabase(prev => prev.filter(item => item.hash !== hash))

        await axios.post(`${api}/delete-message`, {token, hash})

        setUndoAction({ from, hash })
        setNotification("Conversation moved to Trash.")
    }

    const handleArchive = async (hash, from) => {
        setDatabase(prev => prev.filter(item => item.hash !== hash))

        await axios.post(`${api}/archive-message`, {token, hash})

        setUndoAction({ from, hash })
        setNotification("Conversation moved to Archive.")
    }

    const handleUndo = async () => {
        // Undo
        await axios.post(`${api}/undo-action`, {
            token, 
            from: undoAction.from, 
            hash: undoAction.hash
        })

        // Remove notification
        setNotification(undefined)

        // Fetch data to reset messages rendered
        const response = await axios.post(`${api}/fetch-mailbox`, {
            token,
            location: sidebarNames[sidebar]
        })

        if (response.data.status === "success") {
            setDatabase(response.data.messages)
        }
    }

    return (
        <div className="_7ohc">
            {notification ? (
                <div className="tester-bet">
                    <div className="notification">
                        <span>{notification}</span>
                        <span onClick={() => handleUndo()}>Undo</span>
                        <IoMdClose />
                    </div>
                </div>
            ) : undefined}
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
                            {messages.map((item, index) => {
                                return (
                                    <div key={item.hash} className={item.read === false ? "toked-brin" : "across-wash toked-brin"}>
                                        <div 
                                            className={openedEmail === item.hash ? "voidness-bam active" : "voidness-bam"}
                                            onClick={() => setOpenedEmail(item.hash)}
                                            onMouseEnter={() => setActiveMessage(item.hash)}
                                            onMouseLeave={() => setActiveMessage(false)}
                                        >
                                            {checkbox === true ? (
                                                <div className="wangle-bit avatar">
                                                    <BsCheck2 />
                                                </div>
                                            ) : (
                                                <div className="avatar">
                                                    {item.from[0].toUpperCase()}
                                                </div>
                                            )}
                                            <div className="appeared-hut">
                                                <h3>{item.location === "Sent" ? `${item.to}@proton.me` : item.from[0].toUpperCase() + item.from.slice(1,)}</h3>
                                                <span>{item.subject.slice(0, 35)}</span>
                                            </div>
                                            <div className="subnode-ten">
                                                <span>
                                                    {new Date(item.date).toLocaleDateString("en-US", options)}
                                                </span>
                                                <div>
                                                    {item.starred === true ? <img src={StarFilled} alt="" /> : undefined}
                                                </div>
                                            </div>
                                            {activeMessage === item.hash ? (
                                                <div className="soothers-sac" onClick={e => e.stopPropagation()}>
                                                    <div className="crisis-sons">
                                                        {item.read === false ? 
                                                            <img 
                                                                onClick={() => handleRead(index, item.hash, true)}
                                                                className="psalmed-vast" 
                                                                src={openedEmail === item.hash ? InvertedMailbox : MessageIcon} 
                                                                alt="" 
                                                            /> : <MdOutlineMarkunread 
                                                                onClick={() => handleRead(index, item.hash, false)}
                                                            />}
                                                    </div>
                                                    <div className="crisis-sons" onClick={() => handleDelete(item.hash, item.location)}>
                                                        <img className="psalmed-vast" src={openedEmail === item.hash ? TrashBlue : DeleteIcon} alt="" />
                                                    </div>
                                                    <div className="crisis-sons" onClick={() => handleArchive(item.hash, item.location)}>
                                                        <img src={openedEmail === item.hash ? BucketBlue : BucketIcon} alt="" />
                                                    </div>
                                                    <div className="crisis-sons">
                                                        <img 
                                                            className={item.starred === true ? "execs-fine" : undefined}
                                                            onClick={() => handleStarred(index, item.hash, item.starred)}
                                                            src={item.starred === true ? (openedEmail === item.hash ? StarFilledBlue : StarFilled) : (openedEmail === item.hash ? StarBlue : StarIcon)} 
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>)
                                             : undefined}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {openedEmail ? (
                        <div className="tweedier-ids">
                            <div className="container">
                                <h4>{selectedEmail.subject}</h4>
                                <div className="box">
                                    <div className="chlorins-oats">
                                        <strong>From</strong>
                                        <div className="ketone-dial">
                                            <RiLockFill />
                                            <span>{selectedEmail.from}</span>
                                            <span>{`<${selectedEmail.from}@proton.me>`}</span>
                                        </div>
                                        <span className="keynote-dzos">{emailTimeFormatted}</span>
                                    </div>
                                    <div className="malty-cabs">
                                        <strong>To</strong>
                                        <span>{selectedEmail.to}@proton.me</span>
                                        <BiChevronDown className="vermis-etch" />
                                    </div>
                                    <div className="phenom-ore">
                                        <div>
                                            <img src={ReplyIcon} alt="" />
                                        </div>
                                        <div>
                                            <img src={ReplyAllIcon} alt="" />
                                        </div>
                                        <div>
                                            <img src={ForwardIcon} alt="" />
                                        </div>
                                    </div>
                                    <div className="kneecap-data">
                                        {selectedEmail.body}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="canned-copy">
                            <div>
                                {sidebar === 0 ? (
                                    <>  
                                        <h1>Welcome {username[0].toUpperCase()}{username.slice(1,)}</h1>
                                        <span>
                                            You have <strong>{unread} unread conversations</strong> in your inbox.
                                        </span>
                                        <img src={ConversationsIcon} alt="" />
                                    </>
                                ) : (
                                    <>
                                        <h1 className="tinning-him">{sidebarNames[sidebar]}</h1>
                                        <span className="recast-sard">
                                            You have <strong>{messages.length} messages</strong> stored in this folder
                                        </span>
                                        <img className="devoices-evil" src={ConversationImage} alt="" />
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Inbox
