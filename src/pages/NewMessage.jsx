import "./css/NewMessage.css"
import MinimizeIcon from "../assets/MinimizeIcon.png"
import ExpandIcon from "../assets/ExpandIcon.png"
import CloseIcon from "../assets/CloseIcon.png"
import AddContact from "../assets/AddContact.png"
import DeleteIcon from "../assets/DeleteIcon.png"
import LockIcon from "../assets/LockIcon.png"
import EllipsisIcon from "../assets/EllipsisIcon.png"
import AttachmentIcon from "../assets/AttachmentIcon.png"
import TextEditor from "../assets/TextEditor.png"
import { useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { RiArrowDownSFill } from "react-icons/ri"
import axios from "axios"
import api from "../config/backend"

const NewMessage = ({ username, setPopup }) => {
    const [recipient, setRecipient] = useState("")
    const [subject, setSubject] = useState("")
    const [focused, setFocused] = useState(false)
    const [message, setMessage] = useState("\n\nSent with Proton Mail secure email.")
    const [minimized, setMinimized] = useState(false)

    const handleSend = async () => {
        const token = localStorage.getItem("token")

        const response = await axios.post(`${api}/compose-box`, {
            toaddress: recipient,
            subject,
            body: message,
            token
        })

        console.log(response.data)
    }

    return  (
        <div className="_9zvh">
            <div className="header">
                <span>New Message</span>
                <div className="teemer-sons">
                    <img onClick={() => setMinimized(true)} src={MinimizeIcon} alt="" />
                    <img onClick={() => setMinimized(false)} src={ExpandIcon} alt="" />
                    <img onClick={() => setPopup(false)} src={CloseIcon} alt="" />
                </div>
            </div>
            <div className={minimized === true ? "container minimized" : "container"}>
                <div className="flamed-ibex">
                    <h2>From</h2>
                    <div className="lycra-rib">
                        <span>{username}@proton.me</span>
                        <BsChevronDown />
                    </div>
                </div>
                <div className="flamed-ibex">
                    <h2>To</h2>
                    <div className={focused === "recipient" ? "muntings-deep focused" : "muntings-deep"}>
                        <input 
                            placeholder="Email address" 
                            value={recipient} 
                            onChange={e => setRecipient(e.target.value)} 
                            onFocus={() => setFocused("recipient")}
                            onBlur={() => setFocused(false)}
                        />
                        <span>CC</span>
                        <span>BCC</span>
                        <img src={AddContact} alt="" />
                    </div>
                </div>
                <div className="flamed-ibex">
                    <h2>Subject</h2>
                    <div className={focused === "subject" ? "wiper-duct focused" : "wiper-duct"}>
                        <input 
                            placeholder="Subject" 
                            value={subject} 
                            onChange={e => setSubject(e.target.value)} 
                            onFocus={() => setFocused("subject")}
                            onBlur={() => setFocused(false)}
                        />
                    </div>
                </div>
                <div className="eloiners-pep">
                    <img src={TextEditor} alt="" />
                </div>
                <div className="bides-aril">
                    <textarea value={message} onChange={e => setMessage(e.target.value)} />
                </div>
            </div>
            <div className={minimized === true ? "footer minimized" : "footer"}>
                <div>
                    <img src={DeleteIcon} alt="" />
                    <img src={LockIcon} alt="" />
                    <img src={EllipsisIcon} alt="" />
                </div>
                <div>
                    <img src={AttachmentIcon} alt="" />
                    <div className="firebug-bum" onClick={() => handleSend()}>
                        Send
                        <div>
                            <RiArrowDownSFill />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewMessage
