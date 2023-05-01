const mongoose = require("mongoose")
const { Schema } = mongoose

const mailboxSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: String,
    subject: String,
    body: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "Inbox",
        enum: ["Inbox", "Drafts", "Sent", "Archive", "Trash"]
    },
    starred: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    },
    hash: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Mailbox", mailboxSchema)
