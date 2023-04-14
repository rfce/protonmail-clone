import "./css/GridPopup.css"
import ProtonMail from "../assets/ProtonMail.png"
import ProtonCalendar from "../assets/ProtonCalendar.png"
import ProtonDrive from "../assets/ProtonDrive.png"
import ProtonVPN from "../assets/ProtonVPN.png"

const GridPopup = ({ setPopup }) => {
    return (
        <div className="_8cwq" onClick={() => setPopup(false)}>
            <div className="container">
                <div>
                    <img src={ProtonMail} alt="" />
                    Proton Mail
                </div>
                <div>
                    <img src={ProtonCalendar} alt="" />
                    Proton Calendar
                </div>
                <div>
                    <img src={ProtonDrive} alt="" />
                    Proton Drive
                </div>
                <div>
                    <img src={ProtonVPN} alt="" />
                    Proton VPN
                </div>
            </div>
        </div>
    )
}

export default GridPopup
