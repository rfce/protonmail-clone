const jwt = require("jsonwebtoken")

const Mailbox = require("../model/Mailbox")

const archiveMail = async (req, res) => {
    const { token, hash } = req.body

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

    const result = await Mailbox.findOneAndUpdate({ username, hash }, { location: "Archive" })

    res.json({
        status: "success",
        reason: "Item moved to archive."
    })
}

module.exports = archiveMail
