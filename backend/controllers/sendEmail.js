const jwt = require("jsonwebtoken")
const { v4: uuid } = require("uuid")

const User = require("../model/User")
const Mailbox = require("../model/Mailbox")

const sendEmail = async (req, res) => {
    const {toaddress, subject, body, token} = req.body

    if (token === undefined) {
        return res.json({
            status: "fail",
            reason: "Please log in to access this page"
        })
    }

    if (subject === undefined || body === undefined) {
        return res.json({
            status: "fail",
            reason: "Missing fields – E-mail subject or body"
        })
    }

    if (toaddress.endsWith("@proton.me") === false) {
        return res.json({
            status: "fail",
            reason: "Please send e-mail to valid @proton.me address"
        })
    }

    let data

    try {
        data = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
    } catch (error) {
        return res.json({
            status: "fail",
            reason: "Invalid token. Please login again to get a new token."
        })
    }

    const username = data.username

    const to = toaddress.split("@")[0]

    if (to === username) {
        return res.json({
            status: "fail",
            reason: "Sender cannot be same as recepient."
        })
    }

    const recepient = await User.findOne({ username: to })

    if (recepient === null) {
        return res.json({
            status: "fail",
            reason: `User ${to}@proton.me doesn't exist.`
        })
    }

    // Sender's mailbox (sent)
    const sent = await Mailbox.create({
        username,
        from: username,
        to,
        subject,
        body,
        location: "Sent",
        hash: uuid()
    })

    // Recepient mailbox (inbox)
    const received = await Mailbox.create({
        username: to,
        from: username,
        to,
        subject,
        body,
        location: "Inbox",
        hash: uuid()
    })

    res.json({
        status: "success",
        reason: `Mail sent to ${toaddress}`
    })
}

module.exports = sendEmail
