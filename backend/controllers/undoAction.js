const jwt = require("jsonwebtoken")

const Mailbox = require("../model/Mailbox")

// Undo delete or move to archive action
const undoAction = async (req, res) => {
    const { token, from, hash } = req.body

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

    const result = await Mailbox.findOneAndUpdate({ username, hash }, {
        location: from
    })

    res.json({
        status: "success",
        reason: `Item moved back to ${from}.`
    })
}

module.exports = undoAction
