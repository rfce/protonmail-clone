import "./css/AccountsPopup.css"
import { IoIosArrowForward } from "react-icons/io"
import ExternalLink from "../assets/External.png"
import { useNavigate } from "react-router-dom"

const AccountsPopup = ({username, setPopup}) => {
    const navigate = useNavigate()

    const handleSignout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("token")
        navigate("/account/sign-in")
    }

    return (
        <div 
            className="_0gvl"
            onClick={() => setPopup(false)}
        >
            <div className="container" onClick={e => e.stopPropagation()}>
                <div>
                    <span>{username}</span>
                    <span>{username}@proton.me</span>
                </div>
                <div className="recovery-dot">
                    <span>Set recovery phrase</span>
                    <div></div>
                </div>
                <div className="about">
                    <div>
                        Proton introduction
                    </div>
                    <div className="box">
                        Get help
                        <IoIosArrowForward />
                    </div>
                    <div className="box">
                        Proton shop
                        <img src={ExternalLink} alt="Proton shop external link" />
                    </div>
                </div>
                <div className="account-box">
                    <button>Switch or add account</button>
                    <button onClick={() => handleSignout()}>Sign out</button>
                </div>
            </div>
        </div>
    )
}

export default AccountsPopup
