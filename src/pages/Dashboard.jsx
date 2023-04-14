import "./css/Dashboard.css"
import Logo from "../assets/Logo.png"
import { TbGridDots } from "react-icons/tb"
import { BiSearch } from "react-icons/bi"
import { BsChevronRight, BsPlusLg } from "react-icons/bs"
import SettingsIcon from "../assets/Settings.png"
import RefreshIcon from "../assets/Refresh.png"
import {UpgradeIcon} from "../assets/Icons"
import { useState } from "react"
import SearchPopup from "../components/SearchPopup"
import SettingsPopup from "../components/SettingsPopup"
import AccountsPopup from "../components/AccountsPopup"
import GridPopup from "../components/GridPopup"

const Dashboard = () => {
    const [popup, setPopup] = useState(false)
    const [activeSidebar, setActiveSidebar] = useState(0)
    
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
                        <div>
                            <BsChevronRight />
                            MORE
                        </div>
                        <div>
                            <BsChevronRight />
                            FOLDERS
                            <div className="lacteal-bay">
                                <BsPlusLg />
                                <img src={SettingsIcon} alt="" />
                            </div>
                        </div>
                        <div>
                            <BsChevronRight />
                            LABELS
                            <div className="lacteal-bay">
                                <BsPlusLg />
                                <img src={SettingsIcon} alt="" />
                            </div>
                        </div>
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
