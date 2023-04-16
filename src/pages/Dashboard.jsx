import "./css/Dashboard.css"
import Logo from "../assets/Logo.png"
import { TbGridDots } from "react-icons/tb"
import { BiSearch } from "react-icons/bi"
import { BsChevronRight, BsPlusLg, BsCheck2 } from "react-icons/bs"
import { IoMdArrowDropdown } from "react-icons/io"
import ArrowIcon from "../assets/Arrow.png"
import SettingsIcon from "../assets/Settings.png"
import RefreshIcon from "../assets/Refresh.png"
import ArchiveIcon from "../assets/Archive.png"
import SpamIcon from "../assets/Spam.png"
import TrashIcon from "../assets/Trash.png"
import MailIcon from "../assets/Mail.png"
import ContactsIcon from "../assets/Contacts.png"
import CalendarIcon from "../assets/Calendar.png"
import ConversationsIcon from "../assets/ConversationsIcon.png"
import MessageIcon from "../assets/Header/Inbox.png"
import FireIcon from "../assets/Header/Spam.png"
import DeleteIcon from "../assets/Header/Trash.png"
import BucketIcon from "../assets/Header/Bucket.png"
import FolderIcon from "../assets/Header/Folder.png"
import LabelIcon from "../assets/Header/Label.png"
import {UpgradeIcon} from "../assets/Icons"
import { useEffect, useState } from "react"
import SearchPopup from "../components/SearchPopup"
import SettingsPopup from "../components/SettingsPopup"
import AccountsPopup from "../components/AccountsPopup"
import GridPopup from "../components/GridPopup"

const Dashboard = () => {
    const [popup, setPopup] = useState(false)
    const [activeSidebar, setActiveSidebar] = useState(0)
    const [accordian, setAccordian] = useState([])
    const [hovered, setHovered] = useState(false)
    const [checkbox, setCheckbox] = useState(false)
    const [activeRead, setActiveRead] = useState(0)
    const [messages, setMessages] = useState([])

    const username = "theresa"
    const sidebar = ["Inbox", "Drafts", "Sent", "Starred"]
    const messageSelector = ["All", "Read", "Unread"]

    // List of e-mails
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

    // Filter read, unread e-mails
    useEffect(() => {
        if (activeRead === 0) {
            setMessages(database)
        } else {
            setMessages(database.filter(message => {
                return message.read === messageSelector[activeRead].toLowerCase()
            }))
        }
    }, [activeRead])

    const Popup = () => {
        if (popup) {
            if (popup === "search") {
                return <SearchPopup setPopup={setPopup} />
            }
            if (popup === "settings") {
                return <SettingsPopup setPopup={setPopup} />
            }
            if (popup === "accounts") {
                return <AccountsPopup username={username} setPopup={setPopup} />
            }
            if (popup === "grid") {
                return <GridPopup setPopup={setPopup} />
            }
        }
        
        return undefined
    }

    const expand = (box) => {
        setAccordian(prev => prev.includes(box) ? prev.filter(item => item !== box) : [...prev, box])
    }

    const imageLocation = (imageName, index) => {
        if (activeSidebar === index) {
            return require("../assets/" + imageName + "Active.png")
        }

        if (hovered === imageName.toLowerCase()) {
            return require("../assets/Hover/" + imageName + ".png")
        }

        return require("../assets/" + imageName + ".png")
    }

    return (
        <div className="_4esa">
            <div className="navbar">
                <div className="logo-caret">
                    <img src={Logo} alt="" />
                    <TbGridDots 
                        className={popup === "grid" ? "highlighted" : undefined}
                        onClick={() => setPopup("grid")} 
                    />
                </div>
                <div className="upgrade-container">
                    <Popup />
                    <div className="search-box" onClick={() => setPopup("search")}>
                        <BiSearch />
                        <span>Search messages</span>
                    </div>
                    <div>
                        <button>
                            <UpgradeIcon />
                            <span>Upgrade</span>
                        </button>
                        <img 
                            src={SettingsIcon} 
                            alt="Settings icon" 
                            onClick={() => setPopup("settings")}
                        />
                    </div>
                </div>
                <div 
                    className="accounts"
                    onClick={() => setPopup("accounts")}
                >
                    <div>
                        <span>{username}</span>
                        <span>{username}@proton.me</span>
                    </div>
                    <div className={popup === "accounts" ? "accounts-icon highlighted" : "accounts-icon"}>
                        v
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="crash-doe">
                    <button>New message</button>
                    {sidebar.map((item, index) => (
                        <div key={index} 
                            className={activeSidebar === index ? "recode-hang active" : "recode-hang"}
                            onClick={() => setActiveSidebar(index)}
                            onMouseEnter={() => setHovered(item.toLowerCase())}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <img src={imageLocation(item, index)} alt="" />
                            {item}
                            {activeSidebar === index ? <img className="iambic-het" src={RefreshIcon} alt="" /> : undefined}
                        </div>
                    ))}
                    <div className="slurry-crib">
                        <div className={accordian.includes("more") ? "active" : undefined} >
                            <div 
                                className={accordian.includes("more") ? "goaded-nus active" : "goaded-nus"} 
                                onClick={() => expand("more")}
                            >
                                <BsChevronRight />
                                {accordian.includes("more") ? "LESS" : "MORE"}
                            </div>
                        </div>
                        {accordian.includes("more") ? (
                            <div className="taskers-ten">
                                <div>
                                    <img src={ArchiveIcon} alt="" />
                                    Archive
                                </div>
                                <div>
                                    <img src={SpamIcon} alt="" />
                                    Spam
                                </div>
                                <div>
                                    <img src={TrashIcon} alt="" />
                                    Trash
                                </div>
                                <div>
                                    <img src={MailIcon} alt="" />
                                    All mail
                                </div>
                            </div>
                        ) : undefined}
                        <div
                            className={accordian.includes("folders") ? "sieve-care active" : "sieve-care"} 
                            onClick={() => expand("folders")}
                        >
                            <div>
                                <BsChevronRight />
                                FOLDERS
                            </div>
                            <div className="lacteal-bay">
                                <BsPlusLg />
                                <img src={SettingsIcon} alt="" />
                            </div>
                        </div>
                        {accordian.includes("folders") ? <div className="snaky-ooze">No folders</div> : undefined}
                        <div
                            className={accordian.includes("labels") ? "sieve-care active" : "sieve-care"} 
                            style={{ borderBottomColor: "transparent" }}
                            onClick={() => expand("labels")}
                        >
                            <div>
                                <BsChevronRight />
                                LABELS
                            </div>
                            <div className="lacteal-bay">
                                <BsPlusLg />
                                <img src={SettingsIcon} alt="" />
                            </div>
                        </div>
                        {accordian.includes("labels") ? <div className="snaky-ooze no-border">No labels</div> : undefined}
                    </div>
                    <div className="meter-container">
                        <div className="meter">
                            <div className="range"></div>
                        </div>
                        <div className="tubers-eat">
                            <div>
                                <strong>9.19 MB</strong> / 500.00 MB
                            </div>
                            <span>5.0.20.10</span>
                        </div>
                    </div>
                </div>
                <div className="inbox-container">
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
                                    <div>
                                        <img src={MessageIcon} alt="" />
                                    </div>
                                    <div>
                                        <img src={DeleteIcon} alt="" />
                                        <img src={BucketIcon} alt="" />
                                        <img src={FireIcon} alt="" />
                                    </div>
                                    <div>
                                        <img src={FolderIcon} alt="" />
                                        <img src={LabelIcon} alt="" />
                                    </div>
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
                                        console.log(item.read)
                                        return (
                                            <div key={item.id} className={item.read === "unread" ? undefined : "across-wash"}>
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
                <div className="sidebar">
                    <img src={ContactsIcon} alt="" />
                    <img src={CalendarIcon} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
