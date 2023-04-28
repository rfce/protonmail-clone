import "./css/Register.css"
import Logo from "../assets/Proton.png"
import GlobeIcon from "../assets/Globe.png"
import Spinner from "../assets/Spinner.svg"
import { RiArrowDownSFill } from "react-icons/ri"
import { BsExclamationCircleFill } from "react-icons/bs"
import { FaRegEye } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import api from "../config/backend"

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({ 
        username: undefined, password: undefined, confirmPassword: undefined 
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // Sets document title
    // Checks if passwords are valid and match
    useEffect(() => {
        document.title = "Proton Mail — Sign up"

        if (password.length >= 8) {
            setErrors(prev => {
                return {...prev, password: undefined}
            })
        }

        if (confirmPassword.length >= 8 && password === confirmPassword) {
            setErrors(prev => {
                return {...prev, confirmPassword: undefined}
            })
        }
    }, [password, confirmPassword])

    useEffect(() => {
        if (username.length >= 4 && username.length <= 20) {
            setErrors(prev => {
                return {...prev, username: undefined}
            })
        }
    }, [username])

    // Validates passwords
    const checkPasswords = () => {
        if (password.length < 8) {
            setErrors(prev => {
                return {...prev, password: "Password must contain atleast 8 characters"}
            })
            return false
        }

        if (confirmPassword.length < 8) {
            setErrors(prev => {
                return {...prev, confirmPassword: "Password must contain atleast 8 characters"}
            })
            return false
        }

        if (password !== confirmPassword) {
            setErrors(prev => {
                return {...prev, confirmPassword: "Passwords do not match"}
            })
            return false
        }

        return true
    }

    const handleRegister = () => {
        const init = async () => {
            setLoading(true)
            const response = await axios.post(`${api}/register`, {
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
                localStorage.setItem("username", username)
                localStorage.setItem("token", data.token)
                navigate("/dashboard")
            }
        }

        const match = checkPasswords()

        if (match) { init() }
    }

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
                        <div className="spastics-foe">
                            <span>Username</span>
                            <input className={errors.username ? "error" : undefined} value={username} onChange={e => setUsername(e.target.value)} />
                            <div className="praised-yald">
                                @proton.me
                                <RiArrowDownSFill />
                            </div>
                            {errors.username ? (
                                <div className="sanitise-oxen">
                                    <BsExclamationCircleFill />
                                    {errors.username}
                                </div>
                            ) : undefined}
                        </div>
                        <div className="spastics-foe">
                            <span>Password</span>
                            <input className={errors.password ? "error" : undefined} value={password} onChange={e => setPassword(e.target.value)} />
                            <div className="praised-yald">
                                <FaRegEye />
                            </div>
                            {errors.password ? (
                                <div className="sanitise-oxen">
                                    <BsExclamationCircleFill />
                                    {errors.password}
                                </div>
                            ) : undefined}
                        </div>
                        <div className="spastics-foe">
                            <span>Repeat password</span>
                            <input className={errors.confirmPassword ? "error" : undefined} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            <div className="praised-yald">
                                <FaRegEye />
                            </div>
                            {errors.confirmPassword ? (
                                <div className="sanitise-oxen">
                                    <BsExclamationCircleFill />
                                    {errors.confirmPassword}
                                </div>
                        ) : undefined}
                        </div>
                    </div>
                    <div className={loading ? "kittened-web spinner" : "kittened-web"}>
                        <button onClick={() => handleRegister()}>
                            { loading ? <img src={Spinner} alt="" /> : "Create account"}
                        </button>
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
