
const express = require("express")
const router = express.Router()



router.get("/2222", (req, res) => {
    res.json( {
        message : "order get"
    })
})







module.exports = router