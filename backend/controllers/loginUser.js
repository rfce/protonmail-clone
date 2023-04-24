const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../model/User')

const loginUser = async (req, res) => {
    const { username, password } = req.body

    if (username.includes("@") && !username.includes("@proton.me")) {
        return res.json({
            status: "fail",
            reason: "Please sign-in with a proton.me id"
        })
    }

    const data = {}

    data.username = username.includes("@") ? username.split("@")[0] : username

    const user = await User.findOne(data)

    if (user === null) {
        return res.json({
            status: "fail",
            reason: "The username you entered doesn't belong to an account. Please check your username and try again. "
        })
    }

    const hashed = user.password

    const match = await bcrypt.compare(password, hashed)

    // Incorrect password
    if (match === false) {
        return res.json({
            status: "fail",
            reason: "Sorry, your password was incorrect. Please double-check your password."
        })
    }

    const token = jwt.sign(
        { username },
        process.env.JWT_ACCESS_TOKEN
    )
    
    res.json({
        status: "success",
        reason: "Logged in as " + username,
        token
    })
}

module.exports = loginUser