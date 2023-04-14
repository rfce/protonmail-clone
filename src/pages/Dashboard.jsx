import "./css/Dashboard.css"
import Logo from "../assets/Logo.png"
import { TbGridDots } from "react-icons/tb"
import { BiSearch } from "react-icons/bi"
import { BsChevronRight, BsPlusLg } from "react-icons/bs"
import SettingsIcon from "../assets/Settings.png"
import RefreshIcon from "../assets/Refresh.png"
import ArchiveIcon from "../assets/Archive.png"
import SpamIcon from "../assets/Spam.png"
import TrashIcon from "../assets/Trash.png"
import MailIcon from "../assets/Mail.png"
import {UpgradeIcon} from "../assets/Icons"
import { useState } from "react"
import SearchPopup from "../components/SearchPopup"
import SettingsPopup from "../components/SettingsPopup"
import AccountsPopup from "../components/AccountsPopup"
import GridPopup from "../components/GridPopup"

const Dashboard = () => {
    const [popup, setPopup] = useState(false)
    const [activeSidebar, setActiveSidebar] = useState(0)
    const [accordian, setAccordian] = useState([])

    const username = "theresa"
    const sidebar = ["Inbox", "Drafts", "Sent", "Starred"]

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
                            className={activeSidebar === index ? "active" : undefined}
                            onClick={() => setActiveSidebar(index)}
                        >
                            <img src={require(`../assets/${activeSidebar === index ? item + "Active" : item}.png`)} alt="" />
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
                </div>
                <div className="inbox-container">

                </div>
                <div className="sidebar">

                </div>
            </div>
        </div>
    )
}

export default Dashboard
