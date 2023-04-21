import "./css/Login.css"
import Logo from "../assets/Proton.png"
import GlobeIcon from "../assets/Globe.png"
import { RiArrowDownSFill } from "react-icons/ri"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { BsCheck2 } from "react-icons/bs"
import { FaRegEye } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [checkbox, setCheckbox] = useState(false)

    const navigate = useNavigate()
    
    useEffect(() => {
        document.title = "Proton Mail — Sign in"
    }, [])

    return (
        <div className="_5ayn">
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
                        <h2>Sign in</h2>
                        <span>to continue to Proton Mail</span>
                    </div>
                    <div className="tabstop-ebbs">
                        <div>
                            <span>Email or username</span>
                            <input value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <span>Password</span>
                            <input value={password} onChange={e => setPassword(e.target.value)} />
                            <div className="praised-yald">
                                <FaRegEye />
                            </div>
                        </div>
                    </div>
                    <div className="realise-rid">
                        <div onClick={() => setCheckbox(prev => !prev)}>
                            <div className={checkbox === true ? "checkbox active" : "checkbox"}>
                                {checkbox === true ? <BsCheck2 className="uprootal-lug" /> : undefined}
                            </div>
                            <span>Keep me signed in</span>
                            <AiOutlineInfoCircle />
                        </div>
                        <div className="prankish-sod">
                            <span>Not your device? Use a private browsing window to</span> 
                            <span>
                                sign in and close it when done. <span className="marrows-chew">Learn more</span>
                            </span>
                        </div>
                    </div>
                    <div className="kittened-web">
                        <button>Sign in</button>
                        <div>
                            New to Proton? <span onClick={() => navigate("/account/sign-up")}>Create account</span>
                        </div>
                    </div>
                    <div className="domes-pout">
                        <span>Trouble signing in?</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
