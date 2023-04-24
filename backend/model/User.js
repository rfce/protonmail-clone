const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mailbox: [Schema.Types.ObjectId]
})

module.exports = mongoose.model("User", userSchema)
