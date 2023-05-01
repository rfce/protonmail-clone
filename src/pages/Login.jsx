import "./css/Login.css"
import Logo from "../assets/Proton.png"
import GlobeIcon from "../assets/Globe.png"
import Spinner from "../assets/Spinner.svg"
import { RiArrowDownSFill } from "react-icons/ri"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { BsCheck2 } from "react-icons/bs"
import { FaRegEye } from "react-icons/fa"
import { BsExclamationCircleFill } from "react-icons/bs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import api from "../config/backend"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [checkbox, setCheckbox] = useState(false)
    const [errors, setErrors] = useState({ username: undefined, password: undefined })
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()
    
    useEffect(() => {
        document.title = "Proton Mail — Sign in"

        const token = localStorage.getItem("token")

        if (token) { navigate("/dashboard") }
    }, [])

    useEffect(() => {
        if (username.length >= 4 && username.length <= 20) {
            setErrors(prev => {
                return {...prev, username: undefined}
            })
        }

        setErrors(prev => {
            return {...prev, password: undefined}
        })
    }, [username, password])

    const handleSignin = async () => {
        setLoading(true)

        const response = await axios.post(`${api}/sign-in`, {
            username, password
        })

        const data = response.data

        setLoading(false)

        if (data.status === "fail") {
            setErrors(prev => {
                const copy = {...prev}
                copy[data.errorin] = data.reason
                return copy
            })
        }

        if (data.status === "success") {
            if (username.includes("@")) {
                localStorage.setItem("username", username.split("@")[0])
            }
            else {
                localStorage.setItem("username", username)
            }
            localStorage.setItem("token", data.token)
            navigate("/dashboard")
        }   
    }

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
                        <div className="gumdrops-ace">
                            <span>Email or username</span>
                            <input className={errors.username ? "error" : undefined} value={username} onChange={e => setUsername(e.target.value)} />
                            {errors.username ? (
                                <div className="reemploy-pion">
                                    <BsExclamationCircleFill />
                                    {errors.username}
                                </div>
                            ) : undefined}
                        </div>
                        <div className="gumdrops-ace">
                            <span>Password</span>
                            <input className={errors.password ? "error" : undefined} value={password} onChange={e => setPassword(e.target.value)} />
                            <div className="praised-yald">
                                <FaRegEye />
                            </div>
                            {errors.password ? (
                                <div className="reemploy-pion">
                                    <BsExclamationCircleFill />
                                    {errors.password}
                                </div>
                            ) : undefined}
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
                        <button onClick={() => handleSignin()}>{loading ? <img src={Spinner} alt="" /> : "Sign in"}</button>
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
