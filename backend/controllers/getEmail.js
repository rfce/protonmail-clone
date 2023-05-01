const jwt = require("jsonwebtoken")

const Mailbox = require("../model/Mailbox")

const getEmail = async (req, res) => {
    const { token, location } = req.body

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

    const result = await Mailbox.find({
        username, location
    }).sort("-date").select("-_id -__v")

    res.json({
        status: "success",
        location,
        messages: result
    })
}

module.exports = getEmail
