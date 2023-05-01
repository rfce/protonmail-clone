const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')

const User = require('../model/User')
const Mailbox = require("../model/Mailbox")

const registerUser = async (req, res) => {
    const { username, password } = req.body
    
    // Validate username format
    if (username) {
        if (username.length < 4 || username.length > 20) {
            return res.json({
                status: "fail",
                reason: "Username must be 4-20 characters long",
                errorin: "username"
            })
        }

        if (username.startsWith("-") || username.endsWith("-")) {
            return res.json({
                status: "fail",
                reason: "Username can't start or end with hyphen",
                errorin: "username"
            })
        }

        const match = username.match(/[~`\\!@#$%^'&*\(\)_+=\|{}\[\]":;<>,\?]/g)

        if (match !== null) {
            return res.json({
                status: "fail",
                reason: "Username can contain alphabets, numbers, hyphen and period",
                errorin: "username"
            })
        }
    } else {
        return res.json({
            status: "fail",
            reason: "Username is required",
            errorin: "username"
        })
    }

    // Validate password
    // Password must include capital, small alphabets, numbers and a symbol
    if (password) {
        //  Password should have atleast eight characters
        if (password.length < 8) {
            return res.json({
                status: "fail",
                reason: "Password should have atleast eight characters",
                errorin: "password"
            })
        }

        const small = password.match(/[a-z]+/g)
        const capital = password.match(/[A-Z]+/g)
        const number = password.match(/[0-9]+/g)
        const symbol = password.match(/[-+~`@#$%^&*()_={}\[\]\/:;"'<>,?\.]+/g)
        
        if (small === null || capital === null || symbol === null || number === null) {
            return res.json({
                status: "fail",
                reason: "Password must include capital, small alphabets, numbers and a symbol",
                errorin: "password"
            })
        }
    } else {
        return res.json({
            status: "fail",
            reason: "Password is required",
            errorin: "password"
        })
    }

    const hashed = await bcrypt.hash(password, 10)

    // Check for duplicate username,
    const duplicate = await User.findOne({ username })

    if (duplicate !== null) {
        return res.json({
            status: "fail",
            reason: "This username is not available",
            errorin: "username"
        })
    }

    // Save new user to database
    await User.create({ username, password: hashed })

    // Default welcome e-mail for new users
    await Mailbox.create({
        username,
        from: "proton",
        to: username,
        subject: "Welcome to the future of email",
        body: "Welcome to the Proton community",
        location: "Inbox",
        starred: true,
        hash: uuid()
    })

    const token = jwt.sign(
        { username },
        process.env.JWT_ACCESS_TOKEN
    )

    res.json({
        status: "success",
        reason: "User registered successfully",
        token
    })
}

module.exports = registerUser
