const express = require("express")

const loginUser = require("../controllers/loginUser")
const registerUser = require("../controllers/registerUser")
const sendEmail = require("../controllers/sendEmail")
const getEmail = require("../controllers/getEmail")
const toggleReadStatus = require("../controllers/toggleReadStatus")
const toggleStarred = require("../controllers/toggleStarred")
const deleteMail = require("../controllers/deleteMail")

const router  = express.Router()

router.post('/sign-in', loginUser)
router.post('/register', registerUser)
router.post('/compose-box', sendEmail)
router.post('/fetch-mailbox', getEmail)
router.post('/toggle-read', toggleReadStatus)
router.post('/toggle-starred', toggleStarred)
router.post('/delete-message', deleteMail)

module.exports = router

