import "./css/Dashboard.css"
import Logo from "../assets/Logo.png"
import { TbGridDots } from "react-icons/tb"
import { BiSearch } from "react-icons/bi"
import { BsChevronRight, BsPlusLg } from "react-icons/bs"
import SettingsIcon from "../assets/Settings.png"
import RefreshIcon from "../assets/Refresh.png"
import ContactsIcon from "../assets/Contacts.png"
import CalendarIcon from "../assets/Calendar.png"
import {UpgradeIcon} from "../assets/Icons"
import { useEffect, useState } from "react"
import SearchPopup from "../components/SearchPopup"
import SettingsPopup from "../components/SettingsPopup"
import AccountsPopup from "../components/AccountsPopup"
import GridPopup from "../components/GridPopup"
import Inbox from "../components/Inbox"
import EmptyFolder from "../components/EmptyFolder"
import NewMessage from "./NewMessage"

const Dashboard = () => {
    const [popup, setPopup] = useState(false)
    const [activeSidebar, setActiveSidebar] = useState(0)
    const [accordian, setAccordian] = useState([])
    const [hovered, setHovered] = useState(false)
    const [compose, setCompose] = useState(false)
    const [unread, setUnread] = useState(0)
    const [starred, setStarred] = useState(0)

    const username = "theresa"
    const sidebar = ["Inbox", "Drafts", "Sent", "Starred"]
    const secondarySidebar= ["Archive", "Spam", "Trash", "All mail"]

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

    useEffect(() => {
        document.title = `${sidebar[activeSidebar]} | theresa@proton.me | Proton Mail`
    }, [activeSidebar])

    return (
        <div className="_4esa">
            {compose === true ? <NewMessage username={username} setPopup={setCompose} /> : undefined}
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
                    <button onClick={() => setCompose(prev => !prev)}>New message</button>
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
                            {item === "Inbox" ? (
                                <span className={activeSidebar === 0 ? "rubied-jet" : "rubied-jet inactive" }>{unread}</span>
                            ) : undefined}
                            {item === "Starred" ? (
                                <span className={activeSidebar === 3 ? "griffins-bad" : "griffins-bad inactive"}>{starred}</span>
                            ) : undefined}
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
                                {secondarySidebar.map((item, index) => {
                                    return (
                                        <div
                                            className={activeSidebar === index + 4 ? "rebater-foe active" : "rebater-foe"}
                                            onClick={() => setActiveSidebar(index + 4)}
                                            onMouseEnter={() => setHovered(item.toLowerCase())}
                                            onMouseLeave={() => setHovered(false)}
                                        >
                                            <img src={imageLocation(item, index + 4)} alt="" />
                                            {item}
                                        </div>
                                    )
                                })}
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
                {(activeSidebar === 0 || (activeSidebar === 3 && starred > 0)) ? 
                        <Inbox 
                            username={username} 
                            setUnread={setUnread} 
                            setStarred={setStarred} 
                            sidebar={activeSidebar} 
                        /> : <EmptyFolder />}
                <div className="sidebar">
                    <img src={ContactsIcon} alt="" />
                    <img src={CalendarIcon} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
