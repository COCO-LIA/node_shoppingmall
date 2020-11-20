// 1
const express = require("express")
const router = express.Router()

// 3
router.get("/1111", (req, res) => {
    res.json({
        message : "ㅇㅏㅁㅜㄱㅓㄴㅏ"
    })
})





// 2
module.exports = router