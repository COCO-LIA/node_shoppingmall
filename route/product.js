// 1
const express = require("express")
const router = express.Router()

// 3

// product 불러오는 API
router.get("/1111", (req, res) => {
    res.json({
        message : "ㅇㅏㅁㅜㄱㅓㄴㅏ"
    })
})


// product 등록해주는 API
router.post("/",(req, res) => {
    res.json({
        msg: "product 등록해주는 API"
    })
})

// product 수정하는 API
router.patch("/", (req, res) => {
    res.json( {
        msg:"product 수정주는 API"
    })
})

// product 삭제하는 API
router.delete("/", (req, res) => {
    res.json({
        msg :"product 삭제해주는 API"
    })
})



// 2
module.exports = router