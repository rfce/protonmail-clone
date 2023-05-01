const jwt = require("jsonwebtoken")

const Mailbox = require("../model/Mailbox")

const toggleReadStatus = async (req, res) => {
    const { token, hash, read } = req.body

    if (token === undefined) {
        return res.json({
            status: "fail",
            reason: "Please log in to access this page"
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

    const result = await Mailbox.findOneAndUpdate({username, hash}, { read })

    res.json({
        status: "success",
        reason: `Message marked as ${read === true ? "read" : "unread"}`
    })

}

module.exports = toggleReadStatus
