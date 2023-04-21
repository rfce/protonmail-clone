import "./css/Register.css"
import Logo from "../assets/Proton.png"
import GlobeIcon from "../assets/Globe.png"
import { RiArrowDownSFill } from "react-icons/ri"
import { FaRegEye } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Proton Mail — Sign up"
    }, [])

    return (
        <div className="_7mua">
            <div className="navigation">
                <img src={Logo} alt="" />
                <div>
                    <img src={GlobeIcon} alt="" />
                    <span>English</span>
                    <RiArrowDownSFill />
                </div>
            </div>
            <div className="container">
                <div className="whipped-bug">
                    <div className="header">
                        <h2>Create your Proton Account</h2>
                        <span>to continue to Proton Mail</span>
                    </div>
                    <div className="tabstop-ebbs">
                        <div>
                            <span>Username</span>
                            <input value={username} onChange={e => setUsername(e.target.value)} />
                            <div className="praised-yald">
                                @proton.me
                                <RiArrowDownSFill />
                            </div>
                        </div>
                        <div>
                            <span>Password</span>
                            <input value={password} onChange={e => setPassword(e.target.value)} />
                            <div className="praised-yald">
                                <FaRegEye />
                            </div>
                        </div>
                        <div>
                            <span>Repeat password</span>
                            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            <div className="praised-yald">
                                <FaRegEye />
                            </div>
                        </div>
                    </div>
                    <div className="kittened-web">
                        <button>Create account</button>
                        <div>
                            Already have an account? <span onClick={() => navigate("/account/sign-in")}>Sign in</span>
                        </div>
                    </div>
                    <div className="domes-pout">
                        <span>By creating a Proton account, you agree to our</span>
                        <span>terms and conditions</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
